package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// List all Vital sign
// GET /vitalsigns
func ListVitalSignsRecord(c *gin.Context) {
	var vitalsigns []entity.VitalSignsRecord
	if err := entity.DB().Preload("Employee").Preload("Patient").Preload("Status").Raw("SELECT * FROM vital_signs_records").Find(&vitalsigns).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": vitalsigns,
	})
}

// Get Once Vital sign
// GET /vitalsign/:id
func GetVitalSignsRecord(c *gin.Context) {
	var vitalsign entity.VitalSignsRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&vitalsign); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vitalsign not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": vitalsign})
}

// Create Vital sign
// POST /vitalsign
func CreateVitalSignsRecord(c *gin.Context) {
	//main
	var vitalsign entity.VitalSignsRecord
	//relation
	var status entity.Status
	var employee entity.Employee
	var patient entity.Patient

	if err := c.ShouldBindJSON(&vitalsign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	if _, err := govalidator.ValidateStruct(vitalsign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// get patient from database
	if tx := entity.DB().Where("id = ?", vitalsign.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	// get status from database
	if tx := entity.DB().Where("id = ?", vitalsign.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "status is not found",
		})
		return
	}

	// get employee from database
	if tx := entity.DB().Where("id = ?", vitalsign.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "employee is not found",
		})
		return
	}

	vtr := entity.VitalSignsRecord{
		Status:            status,                      // โยงความสัมพันธ์กับ Entity Status
		Employee:          employee,                    // โยงความสัมพันธ์กับ Entity Employee
		Patient:           patient,                     // โยงความสัมพันธ์กับ Entity Patient
		CheckDate:         vitalsign.CheckDate,         // ตั้งค่าฟิลด์ vitalsignsrecord.CheckDate
		BloodPressureHigh: vitalsign.BloodPressureHigh, // ตั้งค่าฟิลด์ BloodPressureHigh
		BloodPressureLow:  vitalsign.BloodPressureLow,  // ตั้งค่าฟิลด์ BloodPressureLow
		PulseRate:         vitalsign.PulseRate,         // ตั้งค่าฟิลด์ PulseRate
		RespirationRate:   vitalsign.RespirationRate,   // ตั้งค่าฟิลด์ RespirationRate
		BodyTemperature:   vitalsign.BodyTemperature,   // ตั้งค่าฟิลด์ BodyTemperature
	}

	if err := entity.DB().Create(&vtr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create Vital sign Record Success",
		"data":   vtr,
	})
}

// Update Vital Sign
// PATCH /vitalsign
func UpdateVitalSignsRecord(c *gin.Context) {

	//main
	var vitalsign entity.VitalSignsRecord
	var oldvitalsign entity.VitalSignsRecord
	//relation
	var status entity.Status
	var employee entity.Employee
	var patient entity.Patient

	// Bind Json to var vtr
	if err := c.ShouldBindJSON(&vitalsign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check vtr is haved ?
	if tx := entity.DB().Where("id = ?", vitalsign.ID).First(&oldvitalsign); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("VitalSignsRecord id = %d not found", vitalsign.ID)})
		c.Abort()
		return
	}

	if vitalsign.BloodPressureHigh == 0 {
		vitalsign.BloodPressureHigh = oldvitalsign.BloodPressureHigh
	}
	if vitalsign.BloodPressureLow == 0 {
		vitalsign.BloodPressureLow = oldvitalsign.BloodPressureLow
	}
	if vitalsign.PulseRate == 0 {
		vitalsign.PulseRate = oldvitalsign.PulseRate
	}
	if vitalsign.RespirationRate == 0 {
		vitalsign.RespirationRate = oldvitalsign.RespirationRate
	}
	if vitalsign.BodyTemperature == 0 {
		vitalsign.BodyTemperature = oldvitalsign.BodyTemperature
	}
	if vitalsign.CheckDate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		vitalsign.CheckDate = oldvitalsign.CheckDate
	}

	// if new have status id
	if vitalsign.StatusID != nil {
		if tx := entity.DB().Where("id = ?", vitalsign.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		fmt.Print("NOT NULL")
		vitalsign.Status = status
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsign.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		fmt.Print("NULL")
		vitalsign.Status = status
	}

	// if new have Patient id
	if vitalsign.PatientID != nil {
		if tx := entity.DB().Where("id = ?", vitalsign.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		vitalsign.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsign.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		vitalsign.Patient = patient
	}

	//if new have Employee id
	if vitalsign.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", vitalsign.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		vitalsign.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsign.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		vitalsign.Employee = employee
	}

	if _, err := govalidator.ValidateStruct(vitalsign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Update vtr in database
	if err := entity.DB().Save(&vitalsign).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   vitalsign,
	})

}

// Delete Vital Sign
// DELETE /vitalsign/:id
func DeleteVitalSignsRecord(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM vital_signs_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vitalsignsrecord is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
