package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /problem/:id
func GetProblem(c *gin.Context) {
	var problem entity.Problem
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM problems WHERE id = ?", id).Scan(&problem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": problem})
}

// GET /problems
func ListProblem(c *gin.Context) {
	var problems []entity.Problem
	if err := entity.DB().Raw("SELECT * FROM problems").Scan(&problems).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": problems})
}
