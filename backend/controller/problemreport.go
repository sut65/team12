package controller

import (
	"fmt"
	"net/http"

	"github.com/aamjazrk/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /problemreport
func CreateProblemReport(c *gin.Context) {
	var Employee entity.Employee
	var ClassProb entity.ClassProb
	var NumPlace entity.NumPlace
	var Problem entity.Problem
	var ProblemReport entity.ProblemReport

	if err := c.ShouldBindJSON(&ProblemReport); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", ProblemReport.UserID).First(&Employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ProblemReport.ClassProbID).First(&ClassProb); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ClassProb not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ProblemReport.NumPlaceID).First(&NumPlace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NumPlace not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ProblemReport.ProblemID).First(&Problem); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Problem not found"})
		return
	}

	// ขั้นตอนที่ 12 สร้าง entity problemreport
	p1 := entity.ProblemReport{
		User:      Employee,
		ClassProb: ClassProb,
		NumPlace:  NumPlace,
		Problem:   Problem,
		Date:      ProblemReport.Date,
		Comment:   ProblemReport.Comment,
	}

	// ขั้นตอนที่ 13 บันทึก
	if err := entity.DB().Create(&p1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": p1})
}

// Get problemreport
func GetProblemReport(c *gin.Context) {
	var ProblemReport entity.ProblemReport
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM problem_reports WHERE id = ?", id).Scan(&ProblemReport).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ProblemReport})
}

// List problemreport
func ListProblemReport(c *gin.Context) {
	var ProblemReports []entity.ProblemReport
	if err := entity.DB().Preload("User").Preload("ClassProb").Preload("NumPlace").Preload("Problem").Raw("SELECT * FROM problem_reports").Find(&ProblemReports).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ProblemReports})
}

// Update problemreport
func UpdateProblemReport(c *gin.Context) {
	//main
	var problemreport entity.ProblemReport
	var oldproblemreport entity.ProblemReport
	//relation
	var classprob entity.ClassProb
	var numplace entity.NumPlace
	var problem entity.Problem
	var user entity.Employee

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&problemreport); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check emp is haved ?
	if tx := entity.DB().Where("id = ?", problemreport.ID).First(&oldproblemreport); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("problemreport id = %d not found", problemreport.ID)})
		c.Abort()
		return
	}

	if problemreport.Comment == "" {
		problemreport.Comment = oldproblemreport.Comment
	}

	if problemreport.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		problemreport.Date = oldproblemreport.Date
	}

	// if new have classprob id
	if problemreport.ClassProbID != nil {
		if tx := entity.DB().Where("id = ?", problemreport.ClassProbID).First(&classprob); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found CLASS"})
			return
		}
		fmt.Print("NOT NULL")
		problemreport.ClassProb = classprob
	} else {
		if tx := entity.DB().Where("id = ?", oldproblemreport.ClassProbID).First(&classprob); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found CLASS"})
			return
		}
		fmt.Print("NULL")
		problemreport.ClassProb = classprob
	}
	// if new have numplace id
	if problemreport.NumPlaceID != nil {
		if tx := entity.DB().Where("id = ?", problemreport.NumPlaceID).First(&numplace); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found Place"})
			return
		}
		fmt.Print("NOT NULL")
		problemreport.NumPlace = numplace
	} else {
		if tx := entity.DB().Where("id = ?", oldproblemreport.NumPlaceID).First(&numplace); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found Place"})
			return
		}
		fmt.Print("NULL")
		problemreport.NumPlace = numplace
	}
	// if new have Employee id
	if problemreport.UserID != nil {
		if tx := entity.DB().Where("id = ?", problemreport.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NOT NULL")
		problemreport.User = user
	} else {
		if tx := entity.DB().Where("id = ?", oldproblemreport.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NULL")
		problemreport.User = user
	}
	// if new have problem id
	if problemreport.ProblemID != nil {
		if tx := entity.DB().Where("id = ?", problemreport.ProblemID).First(&problem); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found problem"})
			return
		}
		fmt.Print("NOT NULL")
		problemreport.Problem = problem
	} else {
		if tx := entity.DB().Where("id = ?", oldproblemreport.ProblemID).First(&problem); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found problem"})
			return
		}
		fmt.Print("NULL")
		problemreport.Problem = problem
	}

	// Update emp in database
	if err := entity.DB().Save(&problemreport).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   problemreport,
	})

}

// Delete problemreport
func DeleteProblemReport(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM problem_reports WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problemreport not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
