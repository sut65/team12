package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)



// GET /bed/:id
func GetFoodType(c *gin.Context) {
	var foodtype entity.FoodType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM food_types WHERE id = ?", id).Scan(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}

// GET /foodtypes
func ListFoodType(c *gin.Context) {
	var foodtypes []entity.FoodType
	if err := entity.DB().Raw("SELECT * FROM food_types").Scan(&foodtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodtypes})
}



