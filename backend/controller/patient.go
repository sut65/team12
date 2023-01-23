package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /patient
func Patient(c *gin.Context) {
	var patientright entity.PatientRight
	var patienttype entity.PatientType
	var gender entity.Gender
	var employee entity.Employee
	var patient entity.Patient

	// ขั้นตอนที่ 8 ถูก build เข้า Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ขั้นตอนที่ 9 ค้นหา gender ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ขั้นตอนที่ 10 ค้นหา PatientType ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.PatientTypeID).First(&patienttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patienttype not found"})
		return
	}

	// ขั้นตอนที่ 11 ค้นหา Patientright ด้วย id // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.PatientRightID).First(&patientright); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientright not found"})
		return
	}

	// ขั้นตอนที่ 3 ค้นหา employee ด้วย id ตอน login // First หาเจออันแรกแล้วก็หยุดหาต่อเลย
	if tx := entity.DB().Where("id = ?", patient.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ขั้นตอนที่ 12 สร้าง entity patient
	p1 := entity.Patient{
		Civ:          patient.Civ,
		FirstName:    patient.FirstName,
		LastName:     patient.LastName,
		PatientType:  patient.PatientType,
		PatientRight: patient.PatientRight,
		Employee:     patient.Employee,
		Gender:       patient.Gender,
		Age:          patient.Age,
		Weight:       patient.Weight,
		Underlying:   patient.Underlying,
		Brithdate:    patient.Brithdate,
		PatientTime:  patient.PatientTime,
	}

	// ขั้นตอนที่ 13 บันทึก
	if err := entity.DB().Create(&p1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p1})

}

// Get Patient
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// List Patient
func ListPatient(c *gin.Context) {
	var patients []entity.Patient
	if err := entity.DB().Preload("Gender").Preload("PatientRight").Preload("PatientType").Preload("Employee").Raw("SELECT * FROM patients").Find(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

// Delete Patient
func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update Patient
func UpdatePatient(c *gin.Context) {
	var patient entity.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if err := entity.DB().Save(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}
