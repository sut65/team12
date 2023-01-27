package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

func GetMedicine(c *gin.Context) {
	var medicine entity.Medicine
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicine})
}

func ListMedicine(c *gin.Context) {
	var medicine []entity.Medicine
	if err := entity.DB().Raw("SELECT * FROM medicines").Scan(&medicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicine})
}
