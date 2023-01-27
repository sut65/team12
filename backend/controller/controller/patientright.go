package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

func GetPatientRight(c *gin.Context) {
	var patientright entity.PatientRight
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patientright); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient_right not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientright})
}

func ListPatientRight(c *gin.Context) {
	var patientright []entity.PatientRight
	if err := entity.DB().Raw("SELECT * FROM patient_rights").Scan(&patientright).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientright})
}
