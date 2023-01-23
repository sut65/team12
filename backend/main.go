package main

import (
	"github.com/aamjazrk/team12/controller"
	"github.com/aamjazrk/team12/entity"
	"github.com/aamjazrk/team12/middlewares"

	//"github.com/aamjazrk/team12/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")

	{
		router.Use(middlewares.Authorizes())
		{
			//router.GET("/bills", controller.ListPatient)
			//router.GET("/bill/:id", controller.GetPatient)
			//router.POST("/createbills", controller.UpdatePatient)

			// Get by id
			router.GET("/employee/:id", controller.GetEmployee)
			// List
			router.GET("/employees", controller.ListEmployee)
			// Create
			router.POST("/employee", controller.CreateEmployee)
			// UPDATE
			router.PATCH("/employee", controller.UpdateEmployee)
			// DELETE
			router.DELETE("/employee/:id", controller.DeleteEmployee)
			// ----------------- Employee ----------------------------
			// Role Routes
			router.GET("/roles", controller.ListRole)
			router.GET("/role/:id", controller.GetRole)
			// router.POST("/roles", controller.CreateRole)
			// router.PATCH("/roles", controller.UpdateRole)
			// router.DELETE("/roles/:id", controller.DeleteRole)
			// Gender
			router.GET("/genders", controller.ListGender)
			router.GET("/gender/:id", controller.GetGender)
			// Department
			router.GET("/departments", controller.ListDepartment)
			router.GET("/department/:id", controller.GetDepartment)
			router.GET("/departmentbyrole/:id", controller.ListDepartmentByRole)
		}
	}
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
