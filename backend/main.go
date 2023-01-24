package main

import (
	"github.com/aamjazrk/team12/controller"
	"github.com/aamjazrk/team12/entity"

	//"github.com/aamjazrk/team12/middlewares"

	//"github.com/aamjazrk/team12/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// router := r.Group("/")

	// {
	// 	router.Use(middlewares.Authorizes())
	// 	{
	//router.GET("/bills", controller.ListPatient)
	//router.GET("/bill/:id", controller.GetPatient)
	//router.POST("/createbills", controller.UpdatePatient)

	// Get by id
	r.GET("/employee/:id", controller.GetEmployee)
	// List
	r.GET("/employees", controller.ListEmployee)
	// Create
	r.POST("/employee", controller.CreateEmployee)
	// UPDATE
	r.PATCH("/employee", controller.UpdateEmployee)
	// DELETE
	r.DELETE("/employee/:id", controller.DeleteEmployee)
	// ----------------- Employee ----------------------------
	// Role Routes
	r.GET("/roles", controller.ListRole)
	r.GET("/role/:id", controller.GetRole)
	// router.POST("/roles", controller.CreateRole)
	// router.PATCH("/roles", controller.UpdateRole)
	// router.DELETE("/roles/:id", controller.DeleteRole)
	// Gender
	r.GET("/genders", controller.ListGender)
	r.GET("/gender/:id", controller.GetGender)
	// Department
	r.GET("/departments", controller.ListDepartment)
	r.GET("/department/:id", controller.GetDepartment)
	r.GET("/departmentbyrole/:id", controller.ListDepartmentByRole)
	// Lab X ray

	// ----------------- ManageBed ----------------------------
	// Bed Routes
	r.GET("/beds", controller.ListBed)
	r.GET("/bed/:id", controller.GetBed)

	// BedStatus Routes
	r.GET("/bedstatuses", controller.ListBedStatus)
	r.GET("/bedstatus/:id", controller.GetBedStatus)

	// ManageBed Routes
	r.GET("/managebeds", controller.ManageBed)
	r.GET("/managebed/:id", controller.GetManageBed)
	r.POST("/managebeds", controller.CreateManageBed)
	r.PATCH("/managebeds", controller.UpdateManageBed)
	r.DELETE("/managebeds/:id", controller.DeleteManageBed)

	// 	}
	// }
	// // Signup User Route
	r.POST("/signup", controller.CreateLoginUser)
	// // login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	//r.Run("localhost: " + PORT)
	r.Run("0.0.0.0:8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
