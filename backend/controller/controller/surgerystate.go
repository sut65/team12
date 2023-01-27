package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /surgerystate/:id
func GetSurgeryState(c *gin.Context) {
	var surgerystate entity.SurgeryState
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&surgerystate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SurgeryState not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": surgerystate})
}

// GET /surgerystates
func ListSurgeryState(c *gin.Context) {
	var surgerystates []entity.SurgeryState
	if err := entity.DB().Raw("SELECT * FROM surgery_states").Scan(&surgerystates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": surgerystates})
}
