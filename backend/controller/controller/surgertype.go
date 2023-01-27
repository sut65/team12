package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /surgerytype/:id
func GetSurgeryType(c *gin.Context) {
	var surgerytype entity.SurgeryType
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&surgerytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "surgery type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": surgerytype})
}

// GET /surgerytypes
func ListSurgeryType(c *gin.Context) {
	var surgerytypes []entity.SurgeryType
	if err := entity.DB().Raw("SELECT * FROM surgery_types").Scan(&surgerytypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": surgerytypes})
}
