package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /classprob/:id
func GetClassProb(c *gin.Context) {
	var classprob entity.ClassProb
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM class_probs WHERE id = ?", id).Scan(&classprob).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classprob})
}

// GET /classprobs
func ListClassProb(c *gin.Context) {
	var classprobs []entity.ClassProb
	if err := entity.DB().Raw("SELECT * FROM class_probs").Scan(&classprobs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classprobs})
}
