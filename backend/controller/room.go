package controller

import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /room/:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms
func ListRoom(c *gin.Context) {
	var rooms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rooms})
}

func ListRoomByToE(c *gin.Context) {
	var rooms []entity.Room
	id := c.Param("id")
	if id == "1" {
		id = "1"
	}
	if id == "2" {
		id = "2"
	}
	if err := entity.DB().Preload("ToE").Raw("SELECT * FROM rooms where to_e_id = ?", id).Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rooms})
}
