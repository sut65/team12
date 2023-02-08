package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /ORrecord
func CreateORrecord(c *gin.Context) {
	var ORrecord entity.ORrecord
	var Employee entity.Employee
	var Patient entity.Patient
	var Specialist entity.Specialist
	var SurgeryState entity.SurgeryState
	var SurgeryType entity.SurgeryType
	var OperatingRoom entity.OperatingRoom

	if err := c.ShouldBindJSON(&ORrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.UserID).First(&Employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.PatientID).First(&Patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.SpecialistID).First(&Specialist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Specialist not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.SurgeryStateID).First(&SurgeryState); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SurgeryState not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.SurgeryTypeID).First(&SurgeryType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SurgeryType not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ORrecord.OperatingRoomID).First(&OperatingRoom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OperatingRoom not found"})
		return
	}
	// VALIDATE CHECKKKKKKK
	if _, err := govalidator.ValidateStruct(ORrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// ขั้นตอนที่ สร้าง entity ORrecord
	p1 := entity.ORrecord{
		User:          Employee,
		Doctor:        Employee,
		StaffReciving: Employee,
		StaffReturing: Employee,
		Patient:       Patient,
		OperatingRoom: OperatingRoom,
		SurgeryType:   SurgeryType,
		SurgeryState:  SurgeryState,
		Specialist:    Specialist,

		SurgeryStart:    ORrecord.SurgeryStart,
		SurgeryEnd:      ORrecord.SurgeryEnd,
		OperatingResult: ORrecord.OperatingResult,
		Note:            ORrecord.Note,
	}

	// ขั้นตอนที่ บันทึก
	if err := entity.DB().Create(&p1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p1})

}

// Get ORrecord
func GetORrecord(c *gin.Context) {
	var ORrecord entity.ORrecord
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM o_rrecords WHERE id = ?", id).Scan(&ORrecord).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ORrecord})
}

// List ORrecord
func ListORrecord(c *gin.Context) {
	var ORrecords []entity.ORrecord
	if err := entity.DB().Preload("User").Preload("OperatingRoom").Preload("Patient").Preload("Doctor").Preload("Specialist").Preload("SurgeryType").Preload("SurgeryState").Preload("StaffReciving").Preload("StaffReturing").Raw("SELECT * FROM o_rrecords").Find(&ORrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ORrecords})
}

// Update ORrecord
func UpdateORrecord(c *gin.Context) {

	//main
	var ORrecord entity.ORrecord
	var oldORrecord entity.ORrecord
	//relation
	var user entity.Employee
	var patient entity.Patient
	var specialist entity.Specialist
	var doctor entity.Employee
	var operatingroom entity.OperatingRoom
	var surgerytype entity.SurgeryType
	var surgerystate entity.SurgeryState
	var staffreciving entity.Employee
	var staffreturing entity.Employee

	// Bind Json to var ORrecord
	if err := c.ShouldBindJSON(&ORrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check ORrecord is haved ?
	if tx := entity.DB().Where("id = ?", ORrecord.ID).First(&oldORrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("ORrecord id = %d not found", ORrecord.ID)})
		c.Abort()
		return
	}

	if ORrecord.OperatingResult == "" {
		ORrecord.OperatingResult = oldORrecord.OperatingResult
	}
	if ORrecord.Note == "" {
		ORrecord.Note = oldORrecord.Note
	}
	if ORrecord.SurgeryStart.String() == "0001-01-01 00:00:00 +0000 UTC" {
		ORrecord.SurgeryStart = oldORrecord.SurgeryStart
	}
	if ORrecord.SurgeryEnd.String() == "0001-01-01 00:00:00 +0000 UTC" {
		ORrecord.SurgeryEnd = oldORrecord.SurgeryEnd
	}

	// if new have ORrecord id
	if ORrecord.UserID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NOT NULL")
		ORrecord.User = user
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NULL")
		ORrecord.User = user
	}

	// if new have patient id
	if ORrecord.PatientID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		ORrecord.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		ORrecord.Patient = patient
	}

	//if new have specialist id
	if ORrecord.SpecialistID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.SpecialistID).First(&specialist); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found specialist"})
			return
		}
		ORrecord.Specialist = specialist
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.SpecialistID).First(&specialist); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found specialist"})
			return
		}
		ORrecord.Specialist = specialist
	}

	//if new have doctor id
	if ORrecord.DoctorID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.Doctor = doctor
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.Doctor = doctor
	}

	//if new have operatingroom id
	if ORrecord.OperatingRoomID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.OperatingRoomID).First(&operatingroom); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found operatingroom"})
			return
		}
		ORrecord.OperatingRoom = operatingroom
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.OperatingRoomID).First(&operatingroom); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found operatingroom"})
			return
		}
		ORrecord.OperatingRoom = operatingroom
	}
	//if new have surgerytype id
	if ORrecord.SurgeryTypeID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.SurgeryTypeID).First(&surgerytype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found type"})
			return
		}
		ORrecord.SurgeryType = surgerytype
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.SurgeryTypeID).First(&surgerytype); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found type"})
			return
		}
		ORrecord.SurgeryType = surgerytype
	}
	//if new have surgerystate id
	if ORrecord.SurgeryStateID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.SurgeryStateID).First(&surgerystate); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found state"})
			return
		}
		ORrecord.SurgeryState = surgerystate
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.OperatingRoomID).First(&surgerystate); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found state"})
			return
		}
		ORrecord.SurgeryState = surgerystate
	}
	//if new have staffreciving id

	if ORrecord.StaffRecivingID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.StaffRecivingID).First(&staffreciving); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.StaffReciving = staffreciving
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.StaffRecivingID).First(&staffreciving); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.StaffReciving = staffreciving
	}
	//if new have staffreturing id
	if ORrecord.StaffReturingID != nil {
		if tx := entity.DB().Where("id = ?", ORrecord.StaffReturingID).First(&staffreturing); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.StaffReturing = staffreturing
	} else {
		if tx := entity.DB().Where("id = ?", oldORrecord.StaffReturingID).First(&staffreturing); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ORrecord.StaffReturing = staffreturing
	}
	// VALIDATE CHECKKKKKKK
	if _, err := govalidator.ValidateStruct(ORrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Update emp in database
	if err := entity.DB().Save(&ORrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   ORrecord,
	})
}

// Delete ORrecord
func DeleteORrecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM o_rrecords WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ORrecord not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
