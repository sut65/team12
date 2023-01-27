package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /hospital/:id
func GetHospital(c *gin.Context) {
	var hospital entity.Hospital
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&hospital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hospital not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospital})
}

// GET /hospitals
func ListHospital(c *gin.Context) {
	var hospitals []entity.Hospital
	if err := entity.DB().Raw("SELECT * FROM hospitals").Scan(&hospitals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": hospitals})
}
