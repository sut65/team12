package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /toe/:id
func GetToE(c *gin.Context) {
	var toe entity.ToE
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&toe); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "toe not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": toe})
}

// GET /toes
func ListToE(c *gin.Context) {
	var toes []entity.ToE
	if err := entity.DB().Raw("SELECT * FROM to_es").Scan(&toes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": toes})
}
