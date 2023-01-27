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
	r.GET("/employee/get/:id", controller.GetEmployee)
	// List
	r.GET("/employees/list", controller.ListEmployee)
	// Create
	r.POST("/employee/create", controller.CreateEmployee)
	// UPDATE
	r.PATCH("/employee/update", controller.UpdateEmployee)
	// DELETE
	r.DELETE("/employees/delete/:id", controller.DeleteEmployee)
	// ----------------- Employee ----------------------------
	// Role Routes
	r.GET("/roles/list", controller.ListRole)
	r.GET("/role/get/:id", controller.GetRole)
	// router.POST("/roles", controller.CreateRole)
	// router.PATCH("/roles", controller.UpdateRole)
	// router.DELETE("/roles/:id", controller.DeleteRole)
	// Gender
	r.GET("/genders/list", controller.ListGender)
	r.GET("/gender/get/:id", controller.GetGender)
	// Department
	r.GET("/departments/list", controller.ListDepartment)
	r.GET("/department/get/:id", controller.GetDepartment)
	r.GET("/departmentbyrole/get/:id", controller.ListDepartmentByRole)

	// ------------------ Lab X ray ------------------------------
	// labtype Routes
	r.GET("/labtypes/list", controller.ListLabType)
	r.GET("/labtype/get/:id", controller.GetLabType)
	// labxray Routes
	// Get by id
	r.GET("/labxray/get/:id", controller.GetLabXray)
	// List
	r.GET("/labxrays/list", controller.ListLabXray)
	// Create
	r.POST("/labxray/create", controller.CreateLabXray)
	// UPDATE
	r.PATCH("/labxray/update", controller.UpdateLabXray)
	// DELETE
	r.DELETE("/labxrays/delete/:id", controller.DeleteLabXray)

	// ----------------- Patient -----------------------------

	// Patient Routes
	r.GET("/patients/list", controller.ListPatient)

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

	// ----------------- MedicalSlip ----------------------------
	// MedicalSlip Routes
	r.GET("/medicalslips", controller.ListMedicalSlip)
	r.GET("/medicalslip/:id", controller.GetMedicalSlip)
	r.POST("/medicalslips", controller.CreateMedicalSlip)
	r.PATCH("/medicalslips", controller.UpdateMedicalSlip)
	r.DELETE("/medicalslips/:id", controller.DeleteMedicalSlip)

	// ------------------ MST ------------------------------
	// hospital Routes
	r.GET("/hospitals/list", controller.ListHospital)
	r.GET("/hospital/get/:id", controller.GetHospital)
	// MST Routes
	r.GET("/mst/get/:id", controller.GetMST)             // Get by id
	r.GET("/msts/list", controller.ListMST)  			 // List
	r.POST("/mst/create", controller.CreateMST) 		 // Create
	r.PATCH("/mst/update", controller.UpdateMST)		 // UPDATE
	r.DELETE("/msts/delete/:id", controller.DeleteMST) 	 // DELETE

	
	// ----------------- Kool ผ่าตัด ----------------------------
	// Routes OperatingRoom
	r.GET("/ListOperatingRoom", controller.ListOperatingRoom)
	r.GET("/GetOperatingRoom/:id", controller.GetOperatingRoom)
	// Routes Specialist
	r.GET("/ListSpecialist", controller.ListSpecialist)
	r.GET("/GetSpecialist/:id", controller.GetSpecialist)
	// Routes SurgeryState
	r.GET("/ListSurgeryState", controller.ListSurgeryState)
	r.GET("/GetSurgeryState/:id", controller.GetSurgeryState)
	// Routes SurgeryType
	r.GET("/ListSurgeryType", controller.ListSurgeryType)
	r.GET("/GetSurgeryType/:id", controller.GetSurgeryType)
	// Routes ORrecord
	r.GET("/GetORrecord/get/:id", controller.GetORrecord)
	r.GET("/ListORrecord/list", controller.ListORrecord)
	r.POST("/CreateORrecord/create", controller.CreateORrecord)
	r.PATCH("/UpdateORrecord/update", controller.UpdateORrecord)
	r.DELETE("/DeleteORrecord/delete/:id", controller.DeleteORrecord)

	// ----------------- Kool แจ้งบำรุง ----------------------------
	// Routes ClassProb
	r.GET("/ListClassProb", controller.ListClassProb)
	r.GET("/GetClassProb/:id", controller.GetClassProb)
	// Routes NumPlace
	r.GET("/ListNumPlace", controller.ListNumPlace)
	r.GET("/GetNumPlace/:id", controller.GetNumPlace)
	// Routes Problem
	r.GET("/ListProblem", controller.ListProblem)
	r.GET("/GetProblem/:id", controller.GetProblem)
	// Routes ProblemReport
	r.GET("/ListProblemReport", controller.ListProblemReport)
	r.GET("/GetProblemReport/:id", controller.GetProblemReport)
	r.POST("/CreateProblemReport/create", controller.CreateProblemReport)
	r.PATCH("/UpdateProblemReport/update", controller.UpdateProblemReport)
	r.DELETE("/DeleteProblemReport/delete/:id", controller.DeleteProblemReport)

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
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
