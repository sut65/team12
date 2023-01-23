package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/aamjazrk/team12/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse token response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
	Email string `json:"email"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var em entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา employee ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM employees WHERE email = ?", payload.Email).Scan(&em).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(em.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(em.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    em.ID,
		Role:  GetRoleName(em.ID),
		Email: em.Email,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

func GetRoleName(id uint) string {
	rn := entity.Employee{}
	tx := entity.DB().Preload("Role").First(&rn, id)
	if tx.Error != nil {
		return "Role not found"
	} else if rn.Role.Name == "Doctor(แพทย์)" {
		return "Doctor"
	} else if rn.Role.Name == "Nurse(พยาบาล)" {
		return "Nurse"
	} else if rn.Role.Name == "Human Resourse(ฝ่ายบุคคล)" {
		return "HumanResourse"
	} else if rn.Role.Name == "Accounting(ฝ่ายการเงิน)" {
		return "Accounting"
	} else if rn.Role.Name == "Pharmacist(เภสัชกร)" {
		return "Pharmacist"
	}

	return "err"
}

// POST /create
func CreateLoginUser(c *gin.Context) {
	var payload SignUpPayload
	var us entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	us.FirstName = payload.Name
	us.Email = payload.Email
	us.Password = string(hashPassword)

	if err := entity.DB().Create(&us).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": us})
}
