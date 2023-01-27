package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /numplace/:id
func GetNumPlace(c *gin.Context) {
	var numplace entity.NumPlace
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM num_places WHERE id = ?", id).Scan(&numplace).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": numplace})
}

// GET /numplaces
func ListNumPlace(c *gin.Context) {
	var numplaces []entity.NumPlace
	if err := entity.DB().Raw("SELECT * FROM num_places").Scan(&numplaces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": numplaces})
}
