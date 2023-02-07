package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// ---------------- LabXray ---------------

// List all LabXray
// GET /labxrays
func ListLabXray(c *gin.Context) {
	var labxrays []entity.LabXray
	if err := entity.DB().Preload("LabType").Preload("Patient").Preload("Doctor").Raw("SELECT * FROM lab_xrays").Find(&labxrays).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": labxrays,
	})
}

// Get Once LabXray
// GET /labxray/:id
func GetLabXray(c *gin.Context) {
	var labxray entity.LabXray
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&labxray); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "labxray not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": labxray})
}

// Create Employee
// POST /labxray
func CreateLabXray(c *gin.Context) {
	//main
	var labxray entity.LabXray
	//relation
	var labtype entity.LabType
	var patient entity.Patient
	var doctor entity.Employee

	if err := c.ShouldBindJSON(&labxray); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	if _, err := govalidator.ValidateStruct(labxray); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// get doctor from database
	if tx := entity.DB().Where("id = ?", labxray.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "doctor is not found",
		})
		return
	}

	// get labtype from database
	if tx := entity.DB().Where("id = ?", labxray.LabTypeID).First(&labtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "labtype is not found",
		})
		return
	}

	// get department from database
	if tx := entity.DB().Where("id = ?", labxray.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	lab := entity.LabXray{
		Description: labxray.Description,
		Date:        labxray.Date,
		Pic:         labxray.Pic,
		Doctor:      doctor,
		Patient:     patient,
		LabType:     labtype,
	}

	if err := entity.DB().Create(&lab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create LabXray Success",
		"data":   lab,
	})
}

// Update LabXray
// PATCH /labxray
func UpdateLabXray(c *gin.Context) {

	//main
	var labxray entity.LabXray
	var oldlabxray entity.LabXray
	//relation
	var labtype entity.LabType
	var patient entity.Patient
	var doctor entity.Employee

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&labxray); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check emp is haved ?
	if tx := entity.DB().Where("id = ?", labxray.ID).First(&oldlabxray); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("LabXray id = %d not found", labxray.ID)})
		c.Abort()
		return
	}

	if labxray.Description == "" {
		labxray.Description = oldlabxray.Description
	}

	if labxray.Pic == "" {
		labxray.Pic = oldlabxray.Pic
	}

	if labxray.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		labxray.Date = oldlabxray.Date
	}
	// if new have doctor id
	if labxray.DoctorID != nil {
		if tx := entity.DB().Where("id = ?", labxray.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NOT NULL")
		labxray.Doctor = doctor
	} else {
		if tx := entity.DB().Where("id = ?", oldlabxray.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NULL")
		labxray.Doctor = doctor
	}

	// if new have patient id
	if labxray.PatientID != nil {
		if tx := entity.DB().Where("id = ?", labxray.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		labxray.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldlabxray.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		labxray.Patient = patient
	}

	//if new have labtype id
	if labxray.LabTypeID != nil {
		if tx := entity.DB().Where("id = ?", labxray.LabTypeID).First(&labtype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found labtype"})
			return
		}
		labxray.LabType = labtype
	} else {
		if tx := entity.DB().Where("id = ?", labxray.LabTypeID).First(&labtype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found labtype"})
			return
		}
		labxray.LabType = labtype
	}

	if _, err := govalidator.ValidateStruct(labxray); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Update labxray in database
	if err := entity.DB().Save(&labxray).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   labxray,
	})

}

// Delete Employee
// DELETE /employee/:id
func DeleteLabXray(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM lab_xrays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "labxray is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
