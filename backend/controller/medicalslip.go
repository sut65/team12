package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /medicalslips
func CreateMedicalSlip(c *gin.Context) {

	var medicalslip entity.MedicalSlip
	var lab entity.LabXray
	var orecord entity.ORrecord
	var prescription entity.Prescription
	var employee entity.Employee
	var patient entity.Patient

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร medicalslip
	if err := c.ShouldBindJSON(&medicalslip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", medicalslip.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 10: ค้นหา patient ด้วย id

	if tx := entity.DB().Where("id = ?", medicalslip.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// 11: ค้นหา labxray ด้วย id
	if tx := entity.DB().Where("id = ?", medicalslip.LabXrayID).First(&lab); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "labxray not found"})
		return
	}

	// 12: ค้นหา orecord ด้วย id
	if tx := entity.DB().Where("id = ?", medicalslip.ORrecordID).First(&orecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "orecord not found"})
		return
	}

	// 13: ค้นหา prescription ด้วย id
	if tx := entity.DB().Where("id = ?", medicalslip.PrescriptionID).First(&prescription); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prescription not found"})
		return
	}

	// 14: สร้าง managebed
	sl := entity.MedicalSlip{

		Employee:     employee,     // โยงความสัมพันธ์กับ Entity Employee
		Patient:      patient,      // โยงความสัมพันธ์กับ Entity Patient
		LabXray:      lab,          // โยงความสัมพันธ์กับ Entity LabCray
		ORrecord:     orecord,      // โยงความสัมพันธ์กับ Entity ORecord
		Prescription: prescription, // โยงความสัมพันธ์กับ Entity Prescription

		Total:       medicalslip.Total,       // ตั้งค่าฟิลด์ Total
		Note:        medicalslip.Note,        // ตั้งค่าฟิลด์ Note
		MedicalDate: medicalslip.MedicalDate, // ตั้งค่าฟิลด์ date

	}

	// 13: บันทึก
	if err := entity.DB().Create(&sl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sl})
}

// GET /medicalslip/:id
func GetMedicalSlip(c *gin.Context) {
	var medicalslip entity.MedicalSlip
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&medicalslip); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicalslips not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicalslip})
}

// GET /medicalslips
func ListMedicalSlip(c *gin.Context) {
	var medicalslip []entity.MedicalSlip
	if err := entity.DB().Preload("LabXray").Preload("ORrecord").Preload("Prescription").Preload("Employee").Preload("Patient").Raw("SELECT * FROM medical_slips").Find(&medicalslip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicalslip})
}

// DELETE /medicalslips/:id
func DeleteMedicalSlip(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM medical_slips WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicalslip not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /medicalslip
func UpdateMedicalSlip(c *gin.Context) {

	//main
	var medicalslip entity.MedicalSlip
	var oldmedicalslip entity.MedicalSlip
	//relation
	var labxray entity.LabXray
	var orecord entity.ORrecord
	var prescription entity.Prescription
	var employee entity.Employee
	var patient entity.Patient

	// Bind Json to var medicalslip
	if err := c.ShouldBindJSON(&medicalslip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check medicalslip is haved ?
	if tx := entity.DB().Where("id = ?", medicalslip.ID).First(&oldmedicalslip); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("MedicalSlip id = %d not found", medicalslip.ID)})
		c.Abort()
		return
	}

	if medicalslip.Note == "" {
		medicalslip.Note = oldmedicalslip.Note
	}

	if medicalslip.Total == 0.0 {
		medicalslip.Total = oldmedicalslip.Total
	}

	if medicalslip.MedicalDate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		medicalslip.MedicalDate = oldmedicalslip.MedicalDate
	}

	// if new have labxray id
	if medicalslip.LabXrayID != nil {
		if tx := entity.DB().Where("id = ?", medicalslip.LabXrayID).First(&labxray); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found labxray"})
			return
		}
		fmt.Print("NOT NULL")
		medicalslip.LabXray = labxray
	} else {
		if tx := entity.DB().Where("id = ?", oldmedicalslip.LabXrayID).First(&labxray); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found bed"})
			return
		}
		fmt.Print("NULL")
		medicalslip.LabXray = labxray
	}

	// if new have orecord id
	if medicalslip.ORrecordID != nil {
		if tx := entity.DB().Where("id = ?", medicalslip.ORrecordID).First(&orecord); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found orecord"})
			return
		}
		medicalslip.ORrecord = orecord
	} else {
		if tx := entity.DB().Where("id = ?", oldmedicalslip.ORrecord).First(&orecord); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found orecord"})
			return
		}
		medicalslip.ORrecord = orecord
	}

	// if new have prescription id
	if medicalslip.PrescriptionID != nil {
		if tx := entity.DB().Where("id = ?", medicalslip.PrescriptionID).First(&prescription); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found prescription"})
			return
		}
		medicalslip.Prescription = prescription
	} else {
		if tx := entity.DB().Where("id = ?", oldmedicalslip.ORrecord).First(&prescription); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found prescription"})
			return
		}
		medicalslip.Prescription = prescription
	}

	//if new have patient id
	if medicalslip.PatientID != nil {
		if tx := entity.DB().Where("id = ?", medicalslip.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		medicalslip.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldmedicalslip.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		medicalslip.Patient = patient
	}

	//if new have employee id
	if medicalslip.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", medicalslip.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		medicalslip.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldmedicalslip.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		medicalslip.Employee = employee
	}

	// Update emp in database
	if err := entity.DB().Save(&medicalslip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   medicalslip,
	})

}
