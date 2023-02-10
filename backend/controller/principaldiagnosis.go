package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// ---------------- PrincipalDiagnosis ---------------

// Create PrincipalDiagnosis
// POST /principaldiagnosis
func CreatePrincipalDiagnosis(c *gin.Context) {
	//main
	var principaldiagnosis entity.PrincipalDiagnosis
	//relation
	var employee entity.Employee
	var patient entity.Patient
	var lod entity.LoD

	if err := c.ShouldBindJSON(&principaldiagnosis); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	///////////////////////////////////////////////////Validate/////////////////////////////
	if _, err := govalidator.ValidateStruct(principaldiagnosis); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//////////////////////////////////////////////////////////////////////////

	// get employee from database
	if tx := entity.DB().Where("id = ?", principaldiagnosis.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Please select Employee",
		})
		return
	}

	// get patient from database
	if tx := entity.DB().Where("id = ?", principaldiagnosis.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	// get toe from database
	if tx := entity.DB().Where("id = ?", principaldiagnosis.LoDID).First(&lod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "lod is not found",
		})
		return
	}

	pd := entity.PrincipalDiagnosis{

		Employee: employee,
		Patient:  patient,
		LoD:      lod,
		Note:     principaldiagnosis.Note,
		// Price:     price,
		Date: principaldiagnosis.Date,
	}

	if err := entity.DB().Create(&pd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create PrincipalDiagnosis Success",
		"data":   pd,
	})
}

// Get Once PrincipalDiagnosis
// GET /principaldiagnosis/:id
func GetPrincipalDiagnosis(c *gin.Context) {
	var principaldiagnosis entity.PrincipalDiagnosis
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&principaldiagnosis); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "principaldiagnosis not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": principaldiagnosis})
}

// List all PrincipalDiagnosis
// GET /principaldiagnosiss
func ListPrincipalDiagnosis(c *gin.Context) {
	var principaldiagnosiss []entity.PrincipalDiagnosis
	if err := entity.DB().Preload("Employee").Preload("Patient").Preload("LoD").Raw("SELECT * FROM principal_diagnoses").Find(&principaldiagnosiss).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": principaldiagnosiss,
	})
}

// Update PrincipalDiagnosis
// PATCH /principaldiagnosis
func UpdatePrincipalDiagnosis(c *gin.Context) {

	//main
	var principaldiagnosis entity.PrincipalDiagnosis
	var oldprincipaldiagnosis entity.PrincipalDiagnosis
	//relation
	var employee entity.Employee
	var patient entity.Patient
	var lod entity.LoD

	// Bind Json to var pd
	if err := c.ShouldBindJSON(&principaldiagnosis); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	///////////////////////////////////////////////////Validate/////////////////////////////
	if _, err := govalidator.ValidateStruct(principaldiagnosis); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//////////////////////////////////////////////////////////////////////////

	// Check pd is haved ?
	if tx := entity.DB().Where("id = ?", principaldiagnosis.ID).First(&oldprincipaldiagnosis); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("PrincipalDiagnosis id = %d not found", principaldiagnosis.ID)})
		c.Abort()
		return
	}

	if principaldiagnosis.Note == "" {
		principaldiagnosis.Note = oldprincipaldiagnosis.Note
	}

	if principaldiagnosis.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		principaldiagnosis.Date = oldprincipaldiagnosis.Date
	}

	// if new have employee id
	if principaldiagnosis.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", principaldiagnosis.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NOT NULL")
		principaldiagnosis.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldprincipaldiagnosis.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldyee"})
			return
		}
		fmt.Print("NULL")
		principaldiagnosis.Employee = employee
	}

	// if new have patient id
	if principaldiagnosis.PatientID != nil {
		if tx := entity.DB().Where("id = ?", principaldiagnosis.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		principaldiagnosis.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldprincipaldiagnosis.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldpatient"})
			return
		}
		principaldiagnosis.Patient = patient
	}

	//if new have lod id
	if principaldiagnosis.LoDID != nil {
		if tx := entity.DB().Where("id = ?", principaldiagnosis.LoDID).First(&lod); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found LoD"})
			return
		}
		principaldiagnosis.LoD = lod
	} else {
		if tx := entity.DB().Where("id = ?", oldprincipaldiagnosis.LoDID).First(&lod); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldLoD"})
			return
		}
		principaldiagnosis.LoD = lod
	}

	// Update principaldiagnosis in database
	if err := entity.DB().Save(&principaldiagnosis).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   principaldiagnosis,
	})

}

// Delete PrincipalDiagnosis
// DELETE /principaldiagnosis/:id
func DeletePrincipalDiagnosis(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM principal_diagnoses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "principaldiagnosis is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
