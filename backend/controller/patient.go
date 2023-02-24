package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /patient
func CreatePatient(c *gin.Context) {
	var patientright entity.PatientRight
	var patienttype entity.PatientType
	var gender entity.Gender
	var employee entity.Employee
	var patient entity.Patient

	// ขั้นตอนที่ 8 ถูก build เข้า Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ขั้นตอนที่ 9 ค้นหา gender ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ขั้นตอนที่ 10 ค้นหา PatientType ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.PatientTypeID).First(&patienttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patienttype not found"})
		return
	}

	// ขั้นตอนที่ 11 ค้นหา Patientright ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.PatientRightID).First(&patientright); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
		return
	}

	// ขั้นตอนที่ 3 ค้นหา employee ด้วย id ตอน login // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ขั้นตอนที่ 12 สร้าง entity patient
	p1 := entity.Patient{
		Civ:          patient.Civ,
		FirstName:    patient.FirstName,
		LastName:     patient.LastName,
		PatientType:  patienttype,
		PatientRight: patientright,
		Employee:     employee,
		Gender:       gender,
		Age:          patient.Age,
		Weight:       patient.Weight,
		Underlying:   patient.Underlying,
		Brithdate:    patient.Brithdate,
		PatientTime:  patient.PatientTime,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(p1); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ขั้นตอนที่ 13 บันทึก
	if err := entity.DB().Create(&p1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "create Patient Success",
		"data":   p1,
	})

}

// Get Patient
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// List Patient
func ListPatient(c *gin.Context) {
	var patients []entity.Patient
	if err := entity.DB().Preload("Gender").Preload("PatientRight").Preload("PatientType").Preload("Employee").Raw("SELECT * FROM patients").Find(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

// Delete Patient
func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update Patient
func UpdatePatient(c *gin.Context) {
	//main
	var newpatient entity.Patient
	var oldpatient entity.Patient
	//relation
	var patienttype entity.PatientType
	var patientright entity.PatientRight
	var employee entity.Employee
	var gender entity.Gender

	// Bind Json to var patient
	if err := c.ShouldBindJSON(&newpatient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check patient is haved ?
	if tx := entity.DB().Where("id = ?", newpatient.ID).First(&oldpatient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Patient id = %d not found", newpatient.ID)})
		c.Abort()
		return
	}

	if newpatient.Civ == "" {
		newpatient.Civ = oldpatient.Civ
	}

	if newpatient.FirstName == "" {
		newpatient.FirstName = oldpatient.FirstName
	}

	if newpatient.LastName == "" {
		newpatient.LastName = oldpatient.LastName
	}

	if newpatient.Age == 0 {
		newpatient.Age = oldpatient.Age
	}

	if newpatient.Weight == 0 {
		newpatient.Weight = oldpatient.Weight
	}

	if newpatient.Underlying == "" {
		newpatient.Underlying = oldpatient.Underlying
	}

	if newpatient.PatientTime.String() == "0001-01-01 00:00:00 +0000 UTC" {
		newpatient.PatientTime = oldpatient.PatientTime
	}

	if newpatient.Brithdate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		newpatient.Brithdate = oldpatient.Brithdate
	}

	// if new have patienttype id
	if newpatient.PatientTypeID != nil {
		if tx := entity.DB().Where("id = ?", newpatient.PatientTypeID).First(&patienttype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "patienttype not found"})
			return
		}
		fmt.Print("NOT NULL")
		newpatient.PatientType = patienttype
	} else {
		if tx := entity.DB().Where("id = ?", oldpatient.PatientTypeID).First(&patienttype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "patienttype not found"})
			return
		}
		fmt.Print("NULL")
		newpatient.PatientType = patienttype
	}

	// if new have patientright id
	if newpatient.PatientRightID != nil {
		if tx := entity.DB().Where("id = ?", newpatient.PatientRightID).First(&patientright); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
			return
		}
		newpatient.PatientRight = patientright
	} else {
		if tx := entity.DB().Where("id = ?", oldpatient.PatientRightID).First(&patientright); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
			return
		}
		newpatient.PatientRight = patientright
	}

	//if new have gender id
	if newpatient.GenderID != nil {
		if tx := entity.DB().Where("id = ?", newpatient.GenderID).First(&gender); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
			return
		}
		newpatient.Gender = gender
	} else {
		if tx := entity.DB().Where("id = ?", oldpatient.Gender).First(&gender); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
			return
		}
		newpatient.Gender = gender
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(newpatient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update patient in database
	if err := entity.DB().Save(&newpatient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	//ข้อมูลชื่อพยาบาลที่ login
	newpatient.Employee = employee

	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   newpatient,
	})
}
