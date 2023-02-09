package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /managebed
func CreateManageBed(c *gin.Context) {

	var managebed entity.ManageBed
	var bed entity.Bed
	var bedstatus entity.BedStatus
	var employee entity.Employee
	var patient entity.Patient

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร managebed
	if err := c.ShouldBindJSON(&managebed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา bed ด้วย id
	if tx := entity.DB().Where("id = ?", managebed.BedID).First(&bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bed not found"})
		return
	}

	// 10: ค้นหา bed_status ด้วย id
	if tx := entity.DB().Where("id = ?", managebed.BedStatusID).First(&bedstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bed_status not found"})
		return
	}

	// 11: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", managebed.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", managebed.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return

	}

	if _, err := govalidator.ValidateStruct(managebed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	// 12: สร้าง managebed
	sl := entity.ManageBed{
		Bed:       bed,       // โยงความสัมพันธ์กับ Entity Bed
		BedStatus: bedstatus, // โยงความสัมพันธ์กับ Entity BedStatus
		Employee:  employee,  // โยงความสัมพันธ์กับ Entity Employee
		Patient:   patient,   // โยงความสัมพันธ์กับ Entity Patient

		Note:       managebed.Note,       // ตั้งค่าฟิลด์ Note
		ManageDate: managebed.ManageDate, // ตั้งค่าฟิลด์ date
		Hn:         managebed.Hn,         // ตั้งค่าฟิลด์ HN

	}

	// 13: บันทึก
	if err := entity.DB().Create(&sl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sl})
}

// GET /managebed/:id
func GetManageBed(c *gin.Context) {
	var managebed entity.ManageBed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM manage_beds WHERE id = ?", id).Scan(&managebed).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": managebed})
}

// GET /managebeds
func ManageBed(c *gin.Context) {
	var managebed []entity.ManageBed
	if err := entity.DB().Preload("Bed").Preload("BedStatus").Preload("Employee").Preload("Patient").Raw("SELECT * FROM manage_beds").Find(&managebed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": managebed})
}

// DELETE /managebeds/:id
func DeleteManageBed(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM manage_beds WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "managebed not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /managebed
func UpdateManageBed(c *gin.Context) {

	//main
	var managebed entity.ManageBed
	var oldmanagebed entity.ManageBed
	//relation
	var bed entity.Bed
	var bedstatus entity.BedStatus
	var employee entity.Employee
	var patient entity.Patient

	// Bind Json to var managebed
	if err := c.ShouldBindJSON(&managebed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	if _, err := govalidator.ValidateStruct(managebed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Check managebed is haved ?
	if tx := entity.DB().Where("id = ?", managebed.ID).First(&oldmanagebed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Managebed id = %d not found", managebed.ID)})
		c.Abort()
		return
	}

	if managebed.Note == "" {
		managebed.Note = oldmanagebed.Note
	}

	if managebed.Hn == 0 {
		managebed.Hn = oldmanagebed.Hn
	}

	if managebed.ManageDate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		managebed.ManageDate = oldmanagebed.ManageDate
	}

	// if new have Bed id
	if managebed.BedID != nil {
		if tx := entity.DB().Where("id = ?", managebed.BedID).First(&bed); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found bed"})
			return
		}
		fmt.Print("NOT NULL")
		managebed.Bed = bed
	} else {
		if tx := entity.DB().Where("id = ?", oldmanagebed.BedID).First(&bed); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found bed"})
			return
		}
		fmt.Print("NULL")
		managebed.Bed = bed
	}

	// if new have bedstatus id
	if managebed.BedStatusID != nil {
		if tx := entity.DB().Where("id = ?", managebed.BedStatusID).First(&bedstatus); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found bedstatus"})
			return
		}
		managebed.BedStatus = bedstatus
	} else {
		if tx := entity.DB().Where("id = ?", oldmanagebed.BedStatusID).First(&bedstatus); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found bedstatus"})
			return
		}
		managebed.BedStatus = bedstatus
	}

	//if new have patient id
	if managebed.PatientID != nil {
		if tx := entity.DB().Where("id = ?", managebed.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		managebed.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldmanagebed.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		managebed.Patient = patient
	}

	//if new have employee id
	if managebed.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", managebed.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		managebed.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldmanagebed.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		managebed.Employee = employee
	}

	// Update emp in database
	if err := entity.DB().Save(&managebed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   managebed,
	})

}
