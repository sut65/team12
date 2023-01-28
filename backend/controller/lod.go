package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /lod/:id
func GetLoD(c *gin.Context) {
	var lod entity.LoD
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&lod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lod not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": lod})
}

// GET /lods
func ListLoD(c *gin.Context) {
	var lods []entity.LoD
	if err := entity.DB().Raw("SELECT * FROM lo_ds").Scan(&lods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": lods})
}

//
