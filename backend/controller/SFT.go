package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// ---------------- SFT ---------------

// List all SFT
// GET /sfts
func ListSFT(c *gin.Context) {
	var sfts []entity.SFT
	if err := entity.DB().Preload("Patient").Preload("PrincipalDiagnosis").Preload("FoodType").Preload("Doctor").Raw("SELECT * FROM sfts").Find(&sfts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": sfts,
	})
}

// Get Once SFT
// GET /sft/:id
func GetSFT(c *gin.Context) {
	var sft entity.SFT
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&sft); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sft not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sft})
}

// Create SFT
// POST /sft
func CreateSFT(c *gin.Context) {
	//main
	var sft entity.SFT
	var doctor entity.Employee
	var principaldiagnosis entity.PrincipalDiagnosis
	var patient entity.Patient
	var foodtype entity.FoodType

	if err := c.ShouldBindJSON(&sft); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// get principaldiagnosis from database
	if tx := entity.DB().Where("id = ?", sft.PrincipalDiagnosisID).First(&principaldiagnosis); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "principaldiagnosis is not found",
		})
		return
	}

	// get patient from database
	if tx := entity.DB().Where("id = ?", sft.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	// get doctor from database
	if tx := entity.DB().Where("id = ?", sft.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "doctor is not found",
		})
		return
	}

	// get foodtype from database
	if tx := entity.DB().Where("id = ?", sft.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "foodtype is not found",
		})
		return
	}
	timelocal := sft.Date.Local()
	emp := entity.SFT{
		Patient:    		patient,
		PrincipalDiagnosis: principaldiagnosis,
		FoodType:    		foodtype,
		Doctor:     		doctor,
		Date: 				timelocal,
	}

	if err := entity.DB().Create(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create SFT Success",
		"data":   emp,
	})
}

// Update SFT
// PATCH /sft
func UpdateSFT(c *gin.Context) {

	//main
	var sft entity.SFT
	var oldsft entity.SFT
	//relation
	var patient entity.Patient
	var principaldiagnosis entity.PrincipalDiagnosis
	var foodtype entity.FoodType
	var doctor entity.Employee

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&sft); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check sft is haved ?
	if tx := entity.DB().Where("id = ?", sft.ID).First(&oldsft); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("SFT id = %d not found", sft.ID)})
		c.Abort()
		return
	}
	// if new have patient id
	if sft.PatientID != nil {
		if tx := entity.DB().Where("id = ?", sft.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		sft.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldsft.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		sft.Patient = patient
	}
	// if new have PrincipalDiagnosis id
	if sft.PrincipalDiagnosisID != nil {
		if tx := entity.DB().Where("id = ?", sft.PrincipalDiagnosisID).First(&principaldiagnosis); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found PrincipalDiagnosis"})
			return
		}
		sft.PrincipalDiagnosis = principaldiagnosis
	} else {
		if tx := entity.DB().Where("id = ?", oldsft.PrincipalDiagnosisID).First(&principaldiagnosis); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found PrincipalDiagnosis"})
			return
		}
		sft.PrincipalDiagnosis = principaldiagnosis
	}

	// if new have foodtype id
	if sft.FoodTypeID != nil {
		if tx := entity.DB().Where("id = ?", sft.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found foodtype"})
			return
		}
		fmt.Print("NOT NULL")
		sft.FoodType = foodtype
	} else {
		if tx := entity.DB().Where("id = ?", oldsft.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found foodtype"})
			return
		}
		fmt.Print("NULL")
		sft.FoodType = foodtype
	}
	// if new have doctor id
	if sft.DoctorID != nil {
		if tx := entity.DB().Where("id = ?", sft.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NOT NULL")
		sft.Doctor = doctor
	} else {
		if tx := entity.DB().Where("id = ?", oldsft.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NULL")
		sft.Doctor = doctor
	}
	if sft.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		sft.Date = oldsft.Date
	}

	// Update sft in database
	if err := entity.DB().Save(&sft).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   sft,
	})

}

// Delete SFT
// DELETE /sft/:id
func DeleteSFT(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM sfts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sft is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
