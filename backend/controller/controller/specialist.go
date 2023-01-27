package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /specialist/:id
func GetSpecialist(c *gin.Context) {
	var specialist entity.Specialist
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&specialist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Specialist not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specialist})
}

// GET /specialists
func ListSpecialist(c *gin.Context) {
	var specialists []entity.Specialist
	if err := entity.DB().Raw("SELECT * FROM specialists").Scan(&specialists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": specialists})
}
