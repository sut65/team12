package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /department/:id
func GetDepartment(c *gin.Context) {
	var department entity.Department
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM departments WHERE id = ?", id).Scan(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments
func ListDepartment(c *gin.Context) {
	var departments []entity.Department
	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departments})
}
func ListDepartmentByRole(c *gin.Context) {
	var departments []entity.Department
	id := c.Param("role_id")
	if err := entity.DB().Raw("SELECT * FROM departments where role_id = ?", id).Scan(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departments})
}
