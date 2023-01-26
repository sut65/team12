package controller

import (
	//"fmt"
	"net/http"
	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// ---------------- SpecifyFoodType ---------------

//-------------------------------------------------------------------------------------------------
func ListSpecifyFoodType(c *gin.Context) {
	var specifyfoodtypes []entity.SpecifyFoodType
	if err := entity.DB().Preload("Patient").Preload("PrincipalDiagnosis").Preload("FoodType").Preload("Doctor").Raw("SELECT * FROM specify_food_types").Find(&specifyfoodtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": specifyfoodtypes,
	})
}

// Get Once Employee
// GET /employee/:id
func GetSpecifyFoodType(c *gin.Context) {
	var specifyfoodtype entity.SpecifyFoodType
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&specifyfoodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "specifyfoodtype not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": specifyfoodtype})
}


func CreateSpecifyFoodType(c *gin.Context) {
	var SpecifyFoodType entity.SpecifyFoodType
	var doctor entity.Employee
	var PrincipalDiagnosis entity.PrincipalDiagnosis
	var Patient entity.Patient
	var FoodType entity.FoodType

	//ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร SpecifyFoodType
	if err := c.ShouldBindJSON(&SpecifyFoodType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Patient ด้วย id
	if tx := entity.DB().Where("id = ?", SpecifyFoodType.PatientID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not  found"})
		return
	}
	// ค้นหา PrincipalDiagnosis ด้วย id
	if tx := entity.DB().Where("id = ?", SpecifyFoodType.PrincipalDiagnosisID).First(&PrincipalDiagnosis); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PrincipalDiagnosis not  found"})
		return
	}
	
	
	// ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", SpecifyFoodType.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not  found"})
		return
	}
	// ค้นหา FoodType ด้วย id
	if tx := entity.DB().Where("id = ?", SpecifyFoodType.FoodTypeID).First(&FoodType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FoodType not  found"})
		
		return
	}
	if tx := entity.DB().Where("id = ?", SpecifyFoodType.PatientID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}
	// สร้าง SpecifyFoodType
	cb := entity.SpecifyFoodType{
		    
		Patient:  		Patient,          
		PrincipalDiagnosis:  	PrincipalDiagnosis,
		FoodType:		FoodType, 
		Doctor:		    doctor,       
		DateTime: 		SpecifyFoodType.DateTime, 
	}
	
	// 14: บันทึก
	if err := entity.DB().Create(&cb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cb})
}

/*// GET /SpecifyFoodTypes /:id
func GetSpecifyFoodTypes(c *gin.Context) {
	var SpecifyFoodType entity.SpecifyFoodType
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("Employee").Preload("FoodType").Raw("SELECT * FROM specifyfoodtypes WHERE id = ?", id).Find(&SpecifyFoodType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": SpecifyFoodType})

}*/

// PATCH /Borrows
func UpdateSpecifyFoodType(c *gin.Context) {
	var SpecifyFoodType entity.SpecifyFoodType
	if err := c.ShouldBindJSON(&SpecifyFoodType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", SpecifyFoodType.ID).First(&SpecifyFoodType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SpecifyFoodType not found"})
		return
	}

	if err := entity.DB().Save(&SpecifyFoodType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": SpecifyFoodType})
}

