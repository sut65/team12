package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /operatingroom/:id
func GetOperatingRoom(c *gin.Context) {
	var operatingroom entity.OperatingRoom
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&operatingroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OperatingRoom not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": operatingroom})
}

// GET /operatingrooms
func ListOperatingRoom(c *gin.Context) {
	var operatingrooms []entity.OperatingRoom
	if err := entity.DB().Raw("SELECT * FROM operating_rooms").Scan(&operatingrooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": operatingrooms})
}
