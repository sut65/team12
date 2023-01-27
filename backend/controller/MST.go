package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// ---------------- MST ---------------

// List all MST
// GET /msts
func ListMST(c *gin.Context) {
	var msts []entity.MST
	if err := entity.DB().Preload("Patient").Preload("Nurse").Preload("Doctor").Preload("Hospital").Raw("SELECT * FROM msts").Find(&msts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": msts,
	})
}

// Get Once MST
// GET /mst/:id
func GetMST(c *gin.Context) {
	var mst entity.MST
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&mst); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mst not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mst})
}

// Create MST
// POST /mst
func CreateMST(c *gin.Context) {
	//main
	var mst entity.MST
	var patient entity.Patient
	var nurse entity.Employee
	var doctor entity.Employee
	var hospital entity.Hospital

	if err := c.ShouldBindJSON(&mst); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// get patient from database
	if tx := entity.DB().Where("id = ?", mst.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	// get nurse from database
	if tx := entity.DB().Where("id = ?", mst.NurseID).First(&nurse); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "nurse is not found",
		})
		return
	}

	// get doctor from database
	if tx := entity.DB().Where("id = ?", mst.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "doctor is not found",
		})
		return
	}

	// get hospital from database
	if tx := entity.DB().Where("id = ?", mst.HospitalID).First(&hospital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "hospital is not found",
		})
		return
	}

	hp := entity.MST{
		Patient:    	patient,
		RegDateTime: 	mst.RegDateTime,
		MSTDateTime: 	mst.MSTDateTime,
		Nurse:      	nurse,
		Doctor:     	doctor,
		Hospital:   	hospital,
	}

	if err := entity.DB().Create(&hp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create MST Success",
		"data":   hp,
	})
}

// Update MST
// PATCH /mst
func UpdateMST(c *gin.Context) {

	//main
	var mst entity.MST
	var oldmst entity.MST
	//relation
	var patient entity.Patient
	var nurse entity.Employee
	var doctor entity.Employee
	var hospital entity.Hospital

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&mst); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check emp is haved ?
	if tx := entity.DB().Where("id = ?", mst.ID).First(&oldmst); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("MST id = %d not found", mst.ID)})
		c.Abort()
		return
	}

	if mst.RegDateTime.String() == "0001-01-01 00:00:00 +0000 UTC" {
		mst.RegDateTime = oldmst.RegDateTime
	}
	if mst.MSTDateTime.String() == "0001-01-01 00:00:00 +0000 UTC" {
		mst.MSTDateTime = oldmst.MSTDateTime
	}

	// if new have patient id
	if mst.PatientID != nil {
		if tx := entity.DB().Where("id = ?", mst.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		mst.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldmst.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		mst.Patient = patient
	}

	// if new have nurse id
	if mst.NurseID != nil {
		if tx := entity.DB().Where("id = ?", mst.NurseID).First(&nurse); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found nurse"})
			return
		}
		fmt.Print("NOT NULL")
		mst.Nurse = nurse
	} else {
		if tx := entity.DB().Where("id = ?", oldmst.NurseID).First(&nurse); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found nurse"})
			return
		}
		fmt.Print("NULL")
		mst.Nurse = nurse
	}
	// if new have doctor id
	if mst.DoctorID != nil {
		if tx := entity.DB().Where("id = ?", mst.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NOT NULL")
		mst.Doctor = doctor
	} else {
		if tx := entity.DB().Where("id = ?", oldmst.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found doctor"})
			return
		}
		fmt.Print("NULL")
		mst.Doctor = doctor
	}

	

	//if new have hospital id
	if mst.HospitalID != nil {
		if tx := entity.DB().Where("id = ?", mst.HospitalID).First(&hospital); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found hospital"})
			return
		}
		mst.Hospital = hospital
	} else {
		if tx := entity.DB().Where("id = ?", mst.HospitalID).First(&hospital); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found hospital"})
			return
		}
		mst.Hospital = hospital
	}

	// Update mst in database
	if err := entity.DB().Save(&mst).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   mst,
	})

}

// Delete MST
// DELETE /msy/:id
func DeleteMST(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM msts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mst is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

