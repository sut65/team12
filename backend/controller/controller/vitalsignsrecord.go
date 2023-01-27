package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /vitalsignsrecords
func CreateVitalSignsRecord(c *gin.Context) {

	var vitalsignsrecord entity.VitalSignsRecord
	var status entity.Status
	var employee entity.Employee
	var patient entity.Patient

	//bind เข้าตัวแปร vitalsignsrecord
	//รับค่ามาจาก body ก่อน
	if err := c.ShouldBindJSON(&vitalsignsrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา status ด้วย id
	//if กำหนดค่าตัวแปร tx ก่อนจะทำการเช็คเงื่อนไขที่ tx.RowsAffected												// returns found records count, equals `len(users)`
	if tx := entity.DB().Where("id = ?", vitalsignsrecord.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	//ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", vitalsignsrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", vitalsignsrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	//สร้าง vitalsignsrecord
	VSR := entity.VitalSignsRecord{
		Status:            status,                             // โยงความสัมพันธ์กับ Entity Status
		Employee:          employee,                           // โยงความสัมพันธ์กับ Entity Employee
		Patient:           patient,                            // โยงความสัมพันธ์กับ Entity Patient
		CheckDate:         vitalsignsrecord.CheckDate,         // ตั้งค่าฟิลด์ vitalsignsrecord.CheckDate
		BloodPressureHigh: vitalsignsrecord.BloodPressureHigh, // ตั้งค่าฟิลด์ BloodPressureHigh
		BloodPressureLow:  vitalsignsrecord.BloodPressureLow,  // ตั้งค่าฟิลด์ BloodPressureLow
		PulseRate:         vitalsignsrecord.PulseRate,         // ตั้งค่าฟิลด์ PulseRate
		RespirationRate:   vitalsignsrecord.RespirationRate,   // ตั้งค่าฟิลด์ RespirationRate
		BodyTemperature:   vitalsignsrecord.BodyTemperature,   // ตั้งค่าฟิลด์ BodyTemperature
	}

	//บันทึกตารางหลัก(vitalsignsrecord)
	if err := entity.DB().Create(&VSR).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": VSR})
}

// GET /vitalsignsrecord/:id
func GetVitalSignsRecord(c *gin.Context) {
	var vitalsignsrecord entity.VitalSignsRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&vitalsignsrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vitalsignsrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": vitalsignsrecord})
}

// .Find Get all records
// GET /vitalsignsrecords
func ListVitalSignsRecord(c *gin.Context) {
	var vitalsignsrecords []entity.VitalSignsRecord
	if err := entity.DB().Preload("Status").Preload("Employee").Preload("Patient").Raw("SELECT * FROM vital_signs_records").Find(&vitalsignsrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": vitalsignsrecords})
}

// DELETE /vitalsignsrecords/:id
func DeleteVitalSignsRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM vital_signs_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vitalsignsrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /vitalsignsrecords
func UpdateVitalSignsRecord(c *gin.Context) {

	//main
	var vitalsignsrecord entity.VitalSignsRecord
	var oldvitalsignsrecord entity.VitalSignsRecord

	//relation
	var status entity.Status
	var employee entity.Employee
	var patient entity.Patient

	// Bind Json to var vitalsignsrecord
	if err := c.ShouldBindJSON(&vitalsignsrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check vitalsignsrecord is haved ?
	if tx := entity.DB().Where("id = ?", vitalsignsrecord.ID).First(&oldvitalsignsrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Managebed id = %d not found", vitalsignsrecord.ID)})
		c.Abort()
		return
	}

	if vitalsignsrecord.BloodPressureHigh == 0 {
		vitalsignsrecord.BloodPressureHigh = oldvitalsignsrecord.BloodPressureHigh
	}
	if vitalsignsrecord.BloodPressureLow == 0 {
		vitalsignsrecord.BloodPressureLow = oldvitalsignsrecord.BloodPressureLow
	}
	if vitalsignsrecord.PulseRate == 0 {
		vitalsignsrecord.PulseRate = oldvitalsignsrecord.PulseRate
	}
	if vitalsignsrecord.RespirationRate == 0 {
		vitalsignsrecord.RespirationRate = oldvitalsignsrecord.RespirationRate
	}
	if vitalsignsrecord.BodyTemperature == 0 {
		vitalsignsrecord.BodyTemperature = oldvitalsignsrecord.BodyTemperature
	}
	if vitalsignsrecord.CheckDate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		vitalsignsrecord.CheckDate = oldvitalsignsrecord.CheckDate
	}

	// if new have status id
	if vitalsignsrecord.StatusID != nil {
		if tx := entity.DB().Where("id = ?", vitalsignsrecord.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		fmt.Print("NOT NULL")
		vitalsignsrecord.Status = status
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsignsrecord.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		fmt.Print("NULL")
		vitalsignsrecord.Status = status
	}

	// if new have employee id
	if vitalsignsrecord.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", vitalsignsrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NOT NULL")
		vitalsignsrecord.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsignsrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NULL")
		vitalsignsrecord.Employee = employee
	}

	// if new have patient id
	if vitalsignsrecord.PatientID != nil {
		if tx := entity.DB().Where("id = ?", vitalsignsrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		fmt.Print("NOT NULL")
		vitalsignsrecord.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldvitalsignsrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		fmt.Print("NULL")
		vitalsignsrecord.Patient = patient
	}

	// Update vitalsignsrecord in database
	if err := entity.DB().Save(&vitalsignsrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   vitalsignsrecord,
	})

}
