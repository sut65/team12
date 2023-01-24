package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /bedstatus/:id
func GetBedStatus(c *gin.Context) {
	var bedstatus entity.BedStatus
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bed_statuses WHERE id = ?", id).Scan(&bedstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bedstatus})
}

// GET /bedstatuses
func ListBedStatus(c *gin.Context) {
	var bedstatuses []entity.BedStatus
	if err := entity.DB().Raw("SELECT * FROM bed_statuses").Scan(&bedstatuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bedstatuses})
}




