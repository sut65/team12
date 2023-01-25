package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

func GetPatientType(c *gin.Context) {
	var patienttype entity.PatientType
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patienttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient_type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patienttype})
}

func ListPatientType(c *gin.Context) {
	var patienttype []entity.PatientType
	if err := entity.DB().Raw("SELECT * FROM patient_types").Scan(&patienttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patienttype})
}
