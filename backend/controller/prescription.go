package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /patient
func CreatePrescription(c *gin.Context) {
	var medicine entity.Medicine
	var employee entity.Employee
	var patient entity.Patient
	var prescription entity.Prescription
	var order entity.Employee

	// ขั้นตอนที่ 8 ถูก build เข้า Patient
	if err := c.ShouldBindJSON(&prescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ขั้นตอนที่ 9 ค้นหา patient ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", prescription.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// ขั้นตอนที่ 10 ค้นหา medicine ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", prescription.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine not found"})
		return
	}

	// ขั้นตอนที่ 11 ค้นหา order_by ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", prescription.OrderID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order_by not found"})
		return
	}

	// ขั้นตอนที่ 3 ค้นหา employee ด้วย id ตอน login // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", prescription.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ขั้นตอนที่ 12 สร้าง entity patient
	s1 := entity.Prescription{
		Patient:    patient,
		Medicine:   medicine,
		Employee:   employee,
		Order:      order,
		Annotation: prescription.Annotation,
		ScriptTime: prescription.ScriptTime,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(s1); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ขั้นตอนที่ 13 บันทึก
	if err := entity.DB().Create(&s1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "create Prescription Success",
		"data":   s1,
	})

}

// Get Patient
func GetPrescription(c *gin.Context) {
	var prescription entity.Prescription
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&prescription); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "get prescription not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prescription})
}

// List Patient
func ListPrescription(c *gin.Context) {
	var prescription []entity.Prescription
	if err := entity.DB().Preload("Patient").Preload("Medicine").Preload("Employee").Preload("Order").Raw("SELECT * FROM prescriptions").Find(&prescription).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prescription})
}

// List Employee
func ListEmployeeDoctor(c *gin.Context) {
	var doctor []entity.Employee
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("Department").Raw("SELECT * FROM employees WHERE role_id = 1").Find(&doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": doctor})
}

// Delete Patient
func DeletePrescription(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prescriptions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delete prescription not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update Prescription
func UpdatePrescription(c *gin.Context) {
	//main
	var newprescription entity.Prescription
	var oldprescription entity.Prescription
	//relation
	var patient entity.Patient
	var medicine entity.Medicine
	var order entity.Employee
	var employee entity.Employee

	// Bind Json to var prescription
	if err := c.ShouldBindJSON(&newprescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check prescription is haved ?
	if tx := entity.DB().Where("id = ?", newprescription.ID).First(&oldprescription); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Prescription id = %d not found", newprescription.ID)})
		c.Abort()
		return
	}

	if newprescription.Annotation == "" {
		newprescription.Annotation = oldprescription.Annotation
	}

	if newprescription.ScriptTime.String() == "0001-01-01 00:00:00 +0000 UTC" {
		newprescription.ScriptTime = oldprescription.ScriptTime
	}

	// if new have patient id
	if newprescription.PatientID != nil {
		if tx := entity.DB().Where("id = ?", newprescription.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		fmt.Print("NOT NULL")
		newprescription.Patient = patient
	} else {
		if tx := entity.DB().Where("id = ?", oldprescription.PatientID).First(&patient); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found patient"})
			return
		}
		fmt.Print("NULL")
		newprescription.Patient = patient
	}

	// if new have Medicine id
	if newprescription.MedicineID != nil {
		if tx := entity.DB().Where("id = ?", newprescription.MedicineID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found medicine"})
			return
		}
		newprescription.Medicine = medicine
	} else {
		if tx := entity.DB().Where("id = ?", oldprescription.MedicineID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found medicine"})
			return
		}
		newprescription.Medicine = medicine
	}

	//if new have order id
	if newprescription.OrderID != nil {
		if tx := entity.DB().Where("id = ?", newprescription.OrderID).First(&order); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found order_by"})
			return
		}
		newprescription.Order = order
	} else {
		if tx := entity.DB().Where("id = ?", oldprescription.OrderID).First(&order); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found order_by"})
			return
		}
		newprescription.Order = order
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(newprescription); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update emp in database
	if err := entity.DB().Save(&newprescription).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	//ข้อมูลชื่อหมอที่ login
	newprescription.Employee = employee

	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   newprescription,
	})
}
