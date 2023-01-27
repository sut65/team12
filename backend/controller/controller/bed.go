package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)



// GET /bed/:id
func GetBed(c *gin.Context) {
	var bed entity.Bed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM beds WHERE id = ?", id).Scan(&bed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bed})
}

// GET /beds
func ListBed(c *gin.Context) {
	var beds []entity.Bed
	if err := entity.DB().Raw("SELECT * FROM beds").Scan(&beds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": beds})
}



