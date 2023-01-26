package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /equipment/:id
func GetEquipment(c *gin.Context) {
	var equipment entity.Equipment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM equipment WHERE id = ?", id).Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipment})
}

// GET /equipments
func ListEquipment(c *gin.Context) {
	var equipments []entity.Equipment
	if err := entity.DB().Raw("SELECT * FROM equipment").Scan(&equipments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipments})
}
