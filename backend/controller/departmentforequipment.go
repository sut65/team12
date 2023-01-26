package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /departmentforequipment/:id
func GetDepartmentForEquipment(c *gin.Context) {
	var departmentforequipment entity.DepartmentForEquipment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM department_for_equipments WHERE id = ?", id).Scan(&departmentforequipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departmentforequipment})
}

// GET /departmentforequipments
func ListDepartmentForEquipment(c *gin.Context) {
	var departmentforequipments []entity.DepartmentForEquipment
	if err := entity.DB().Raw("SELECT * FROM department_for_equipments").Scan(&departmentforequipments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": departmentforequipments})
}
