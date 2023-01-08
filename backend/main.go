package main

import (
	"github.com/aamjazrk/team12/controller"
	"github.com/aamjazrk/team12/entity"

	//"github.com/aamjazrk/team12/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	//api := r.Group("")
	//{
	//protected := api.Use(middlewares.Authorizes())
	//{

	// ----------------- Employee ----------------------------
	// List
	r.GET("/employees", controller.ListEmployee)
	// Get by id
	r.GET("/employee/:id", controller.GetEmployee)
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
	r.POST("/roles", controller.CreateRole)
	r.PATCH("/roles", controller.UpdateRole)
	r.DELETE("/roles/:id", controller.DeleteRole)

	//}
	//}

	// Authentication Routes
	//r.POST("/login", controller.Login)

	// Run the server
	r.Run()
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
