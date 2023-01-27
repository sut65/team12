package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /requisitionrecords
func CreateRequisitionRecord(c *gin.Context) {

	var requisitionrecord entity.RequisitionRecord
	var employee entity.Employee
	var equipment entity.Equipment
	var departmentforequipment entity.DepartmentForEquipment

	//bind เข้าตัวแปร requisitionrecord
	//รับค่ามาจาก body ก่อน
	if err := c.ShouldBindJSON(&requisitionrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา employee ด้วย id
	//if กำหนดค่าตัวแปร tx ก่อนจะทำการเช็คเงื่อนไขที่ tx.RowsAffected												// returns found records count, equals `len(users)`
	if tx := entity.DB().Where("id = ?", requisitionrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", requisitionrecord.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment not found"})
		return
	}

	// ค้นหา departmentforequipment ด้วย id
	if tx := entity.DB().Where("id = ?", requisitionrecord.DepartmentForEquipmentID).First(&departmentforequipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "departmentforequipment not found"})
		return
	}

	// สร้าง requisitionrecord
	RR := entity.RequisitionRecord{
		Employee:               employee,                          // โยงความสัมพันธ์กับ Entity Employee
		Equipment:              equipment,                         // โยงความสัมพันธ์กับ Entity Equipment
		DepartmentForEquipment: departmentforequipment,            // โยงความสัมพันธ์กับ Entity DepartmentForEquipment
		RequisitionDate:        requisitionrecord.RequisitionDate, // ตั้งค่าฟิลด์ vitalsignsrecord.RequisitionDate
		Quantity:               requisitionrecord.Quantity,        //ตั้งค่าฟิลล์ Quantity
	}

	// บันทึกตารางหลัก(RequisitionRecord)
	if err := entity.DB().Create(&RR).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RR})
}

// GET /requisitionrecord/:id
func GetRequisitionRecord(c *gin.Context) {
	var requisitionrecord entity.RequisitionRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&requisitionrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requisitionrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requisitionrecord})
}

// .Find Get all records
// GET /requisitionrecords
func ListRequisitionRecord(c *gin.Context) {
	var requisitionrecords []entity.RequisitionRecord
	if err := entity.DB().Preload("Employee").Preload("Equipment").Preload("DepartmentForEquipment").Raw("SELECT * FROM requisition_records").Find(&requisitionrecords).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requisitionrecords})
}

// DELETE /requisitionrecords/:id
func DeleteRequisitionRecord(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM requisition_records WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requisitionrecord not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /requisitionrecords
func UpdateRequisitionRecord(c *gin.Context) {

	//main
	var requisitionrecord entity.RequisitionRecord
	var oldrequisitionrecord entity.RequisitionRecord

	//relation
	var employee entity.Employee
	var equipment entity.Equipment
	var departmentforequipment entity.DepartmentForEquipment

	// Bind Json to var requisitionrecord
	if err := c.ShouldBindJSON(&requisitionrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check requisitionrecord is haved ?
	if tx := entity.DB().Where("id = ?", requisitionrecord.ID).First(&oldrequisitionrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("requisitionrecord id = %d not found", requisitionrecord.ID)})
		c.Abort()
		return
	}

	if requisitionrecord.Quantity == 0 {
		requisitionrecord.Quantity = oldrequisitionrecord.Quantity
	}
	if requisitionrecord.RequisitionDate.String() == "0001-01-01 00:00:00 +0000 UTC" {
		requisitionrecord.RequisitionDate = oldrequisitionrecord.RequisitionDate
	}

	// if new have equipment id
	if requisitionrecord.EquipmentID != nil {
		if tx := entity.DB().Where("id = ?", requisitionrecord.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found equipment"})
			return
		}
		fmt.Print("NOT NULL")
		requisitionrecord.Equipment = equipment
	} else {
		if tx := entity.DB().Where("id = ?", oldrequisitionrecord.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found equipment"})
			return
		}
		fmt.Print("NULL")
		requisitionrecord.Equipment = equipment
	}

	// if new have departmentforequipment id
	if requisitionrecord.DepartmentForEquipmentID != nil {
		if tx := entity.DB().Where("id = ?", requisitionrecord.DepartmentForEquipmentID).First(&departmentforequipment); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found departmentforequipment"})
			return
		}
		fmt.Print("NOT NULL")
		requisitionrecord.DepartmentForEquipment = departmentforequipment
	} else {
		if tx := entity.DB().Where("id = ?", oldrequisitionrecord.DepartmentForEquipmentID).First(&departmentforequipment); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found departmentforequipment"})
			return
		}
		fmt.Print("NULL")
		requisitionrecord.DepartmentForEquipment = departmentforequipment
	}

	//if new have employee id
	if requisitionrecord.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", requisitionrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		requisitionrecord.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", oldrequisitionrecord.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		requisitionrecord.Employee = employee
	}

	// Update requisitionrecord in database
	if err := entity.DB().Save(&requisitionrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   requisitionrecord,
	})

}
