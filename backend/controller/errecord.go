package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// ---------------- ErRecord ---------------

// Create ErRecord
// POST /errecord
func CreateErRecord(c *gin.Context) {
	//main
	var errecord entity.ErRecord
	//relation
	var employee entity.Employee
	var patient entity.Patient
	var toe entity.ToE
	var room entity.Room

	if err := c.ShouldBindJSON(&errecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	///////////////////////////////////////////////////Validate/////////////////////////////
	if _, err := govalidator.ValidateStruct(errecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//////////////////////////////////////////////////////////////////////////

	// get employee from database
	if tx := entity.DB().Where("id = ?", errecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Please select Employee",
		})
		return
	}

	// get patient from database
	if tx := entity.DB().Where("id = ?", errecord.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "patient is not found",
		})
		return
	}

	// get toe from database
	if tx := entity.DB().Where("id = ?", errecord.ToEID).First(&toe); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "toe is not found",
		})
		return
	}

	// get room from database
	if tx := entity.DB().Where("id = ?", errecord.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "room is not found",
		})
		return
	}

	errec := entity.ErRecord{

		Employee:    employee,
		Patient:     patient,
		ToE:         toe,
		Description: errecord.Description,
		// Price:     price,
		Room: room,
		Date: errecord.Date,
	}

	if err := entity.DB().Create(&errec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create ErRecord Success",
		"data":   errec,
	})
}

// Get Once ErRecord
// GET /errecord/:id
func GetErRecord(c *gin.Context) {
	var errecord entity.ErRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&errecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "errecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": errecord})
}

// List all ErRecord
// GET /errecords
func ListErRecord(c *gin.Context) {
	var errecords []entity.ErRecord
	if err := entity.DB().Preload("Employee").Preload("Patient").Preload("ToE").Preload("Room").Raw("SELECT * FROM er_records").Find(&errecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": errecords,
	})
}

// Update Employee
// PATCH /employee
func UpdateErRecord(c *gin.Context) {

	//main
	var errecord entity.ErRecord
	var olderrecord entity.ErRecord
	//relation
	var employee entity.Employee
	var patient entity.Patient
	var toe entity.ToE
	var room entity.Room

	// Bind Json to var errec
	if err := c.ShouldBindJSON(&errecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	///////////////////////////////////////////////////Validate/////////////////////////////
	if _, err := govalidator.ValidateStruct(errecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//////////////////////////////////////////////////////////////////////////

	// Check errec is haved ?
	if tx := entity.DB().Where("id = ?", errecord.ID).First(&olderrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("ErRecord id = %d not found", errecord.ID)})
		c.Abort()
		return
	}

	if errecord.Description == "" {
		errecord.Description = olderrecord.Description
	}

	if errecord.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		errecord.Date = olderrecord.Date
	}

	// if new have employee id
	if errecord.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", errecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NOT NULL")
		errecord.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", olderrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldyee"})
			return
		}
		fmt.Print("NULL")
		errecord.Employee = employee
	}

	// if new have patient id
	if errecord.PatientID != nil {
		if tx := entity.DB().Where("id = ?", errecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		errecord.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", olderrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldpatient"})
			return
		}
		errecord.Patient = patient
	}

	//if new have toe id
	if errecord.ToEID != nil {
		if tx := entity.DB().Where("id = ?", errecord.ToEID).First(&toe); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ToE"})
			return
		}
		errecord.ToE = toe
	} else {
		if tx := entity.DB().Where("id = ?", olderrecord.ToEID).First(&toe); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldToE"})
			return
		}
		errecord.ToE = toe
	}

	//if new have room id
	if errecord.RoomID != nil {
		if tx := entity.DB().Where("id = ?", errecord.RoomID).First(&room); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found Room"})
			return
		}
		errecord.Room = room
	} else {
		if tx := entity.DB().Where("id = ?", olderrecord.RoomID).First(&room); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found oldRoom"})
			return
		}
		errecord.Room = room
	}

	// Update errecord in database
	if err := entity.DB().Save(&errecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   errecord,
	})

}

// Delete ErRecord
// DELETE /errecord/:id
func DeleteErRecord(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM er_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "errecord is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
