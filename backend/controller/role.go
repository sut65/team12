package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /role/:id
func GetRole(c *gin.Context) {
	var role entity.Role
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}

// GET /roles
func ListRole(c *gin.Context) {
	var roles []entity.Role
	if err := entity.DB().Raw("SELECT * FROM roles").Scan(&roles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roles})
}




