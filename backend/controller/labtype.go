package controller
import (
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /role/:id
func GetLabType(c *gin.Context) {
	var labtype entity.LabType
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&labtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "labtype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": labtype})
}

// GET /roles
func ListLabType(c *gin.Context) {
	var labtypes []entity.LabType
	if err := entity.DB().Raw("SELECT * FROM lab_types").Scan(&labtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": labtypes})
}
