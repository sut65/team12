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
	if tx := entity.DB().Where("id = ?", id).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /departments
func ListDepartment(c *gin.Context) {
	var departments []entity.Department
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM departments").Scan(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departments})
}
func ListDepartmentByRole(c *gin.Context) {
	var departments []entity.Department
	id := c.Param("id")
	if(id == "1"){
		id = "2"
	}
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM departments where role_id = ?", id).Scan(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departments})
}
