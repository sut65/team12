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
			router.GET("/employee/get/:id", controller.GetEmployee)
			// List
			router.GET("/employees/list", controller.ListEmployee)
			// Create
			router.POST("/employee/create", controller.CreateEmployee)
			// UPDATE
			router.PATCH("/employee/update", controller.UpdateEmployee)
			// DELETE
			router.DELETE("/employees/delete/:id", controller.DeleteEmployee)
			// ----------------- Employee ----------------------------
			// Role Routes
			router.GET("/roles/list", controller.ListRole)
			router.GET("/role/get/:id", controller.GetRole)
			// router.POST("/roles", controller.CreateRole)
			// router.PATCH("/roles", controller.UpdateRole)
			// router.DELETE("/roles/:id", controller.DeleteRole)
			// Gender
			router.GET("/genders/list", controller.ListGender)
			router.GET("/gender/get/:id", controller.GetGender)
			// Department
			router.GET("/departments/list", controller.ListDepartment)
			router.GET("/department/get/:id", controller.GetDepartment)
			router.GET("/departmentbyrole/get/:id", controller.ListDepartmentByRole)

			// ------------------ Lab X ray ------------------------------
			// labtype Routes
			router.GET("/labtypes/list", controller.ListLabType)
			router.GET("/labtype/get/:id", controller.GetLabType)
			// labxray Routes
			// Get by id
			router.GET("/labxray/get/:id", controller.GetLabXray)
			// List
			router.GET("/labxrays/list", controller.ListLabXray)
			// Create
			router.POST("/labxray/create", controller.CreateLabXray)
			// UPDATE
			router.PATCH("/labxray/update", controller.UpdateLabXray)
			// DELETE
			router.DELETE("/labxrays/delete/:id", controller.DeleteLabXray)

			// ----------------- Patient -----------------------------
			//ข้อมูล path ผู้ป่วย//
			router.GET("/patient/get/:id", controller.GetPatient)
			router.GET("/patients/list", controller.ListPatient)
			router.POST("/patient/create", controller.CreatePatient)
			router.PATCH("/patient/edit", controller.UpdatePatient)
			router.DELETE("/patient/delet/:id", controller.DeletePatient)
			router.GET("/employee/doctor/list", controller.ListEmployeeDoctor)
			//ข้อมูล path patient_type//
			router.GET("/patient/type/:id", controller.GetPatientType)
			router.GET("/patient/types/list", controller.ListPatientType)
			//ข้อมูล path patient_right//
			router.GET("/patient/right/:id", controller.GetPatientRight)
			router.GET("/patient/rights/list", controller.ListPatientRight)

			// ----------------- Prescription -----------------------------
			//ข้อมูล path ใบสั่งยา//
			router.GET("/prescription/get/:id", controller.GetPrescription)
			router.GET("/prescriptions/list", controller.ListPrescription)
			router.POST("/prescription/create", controller.CreatePrescription)
			router.PATCH("/prescription/edit", controller.UpdatePrescription)
			router.DELETE("/prescription/delet/:id", controller.DeletePrescription)
			//ข้อมูล path ข้อมูลยา//
			router.GET("/medicine/:id", controller.GetMedicine)
			router.GET("/medicine/list", controller.ListMedicine)

			// ----------------- ManageBed ----------------------------
			// Bed Routes
			router.GET("/beds", controller.ListBed)
			router.GET("/bed/:id", controller.GetBed)

			// BedStatus Routes
			router.GET("/bedstatuses", controller.ListBedStatus)
			router.GET("/bedstatus/:id", controller.GetBedStatus)

			// ManageBed Routes
			router.GET("/managebeds", controller.ManageBed)
			router.GET("/managebed/:id", controller.GetManageBed)
			router.POST("/managebeds", controller.CreateManageBed)
			router.PATCH("/managebeds", controller.UpdateManageBed)
			router.DELETE("/managebeds/:id", controller.DeleteManageBed)

			// ----------------- MedicalSlip ----------------------------
			// MedicalSlip Routes
			router.GET("/medicalslips", controller.ListMedicalSlip)
			router.GET("/medicalslip/:id", controller.GetMedicalSlip)
			router.POST("/medicalslips", controller.CreateMedicalSlip)
			router.PATCH("/medicalslips", controller.UpdateMedicalSlip)
			router.DELETE("/medicalslips/:id", controller.DeleteMedicalSlip)

			// ------------------ MST ------------------------------
			// hospital Routes
			router.GET("/hospitals/list", controller.ListHospital)
			router.GET("/hospital/get/:id", controller.GetHospital)
			// MST Routes
			router.GET("/mst/get/:id", controller.GetMST)           // Get by id
			router.GET("/msts/list", controller.ListMST)            // List
			router.POST("/mst/create", controller.CreateMST)        // Create
			router.PATCH("/mst/update", controller.UpdateMST)       // UPDATE
			router.DELETE("/msts/delete/:id", controller.DeleteMST) // DELETE
			// ------------------ SFT ------------------------------
			// foodtype Routes
			router.GET("/foodtypes/list", controller.ListFoodType)
			router.GET("/foodtype/get/:id", controller.GetFoodType)
			// SFT Routes
			router.GET("/sft/get/:id", controller.GetSFT)           // Get by id
			router.GET("/sfts/list", controller.ListSFT)            // List
			router.POST("/sft/create", controller.CreateSFT)        // Create
			router.PATCH("/sft/update", controller.UpdateSFT)       // UPDATE
			router.DELETE("/sfts/delete/:id", controller.DeleteSFT) // DELETE

			// ----------------- Kool ผ่าตัด ----------------------------
			// Routes OperatingRoom
			router.GET("/ListOperatingRoom", controller.ListOperatingRoom)
			router.GET("/GetOperatingRoom/:id", controller.GetOperatingRoom)
			// Routes Specialist
			router.GET("/ListSpecialist", controller.ListSpecialist)
			router.GET("/GetSpecialist/:id", controller.GetSpecialist)
			// Routes SurgeryState
			router.GET("/ListSurgeryState", controller.ListSurgeryState)
			router.GET("/GetSurgeryState/:id", controller.GetSurgeryState)
			// Routes SurgeryType
			router.GET("/ListSurgeryType", controller.ListSurgeryType)
			router.GET("/GetSurgeryType/:id", controller.GetSurgeryType)
			// Routes ORrecord
			router.GET("/GetORrecord/get/:id", controller.GetORrecord)
			router.GET("/ListORrecord/list", controller.ListORrecord)
			router.POST("/CreateORrecord/create", controller.CreateORrecord)
			router.PATCH("/UpdateORrecord/update", controller.UpdateORrecord)
			router.DELETE("/DeleteORrecord/delete/:id", controller.DeleteORrecord)

			// ----------------- Kool แจ้งบำรุง ----------------------------
			// Routes ClassProb
			router.GET("/ListClassProb", controller.ListClassProb)
			router.GET("/GetClassProb/:id", controller.GetClassProb)
			// Routes NumPlace
			router.GET("/ListNumPlace", controller.ListNumPlace)
			router.GET("/GetNumPlace/:id", controller.GetNumPlace)
			// Routes Problem
			router.GET("/ListProblem", controller.ListProblem)
			router.GET("/GetProblem/:id", controller.GetProblem)
			// Routes ProblemReport
			router.GET("/ListProblemReport", controller.ListProblemReport)
			router.GET("/GetProblemReport/:id", controller.GetProblemReport)
			router.POST("/CreateProblemReport/create", controller.CreateProblemReport)
			router.PATCH("/UpdateProblemReport/update", controller.UpdateProblemReport)
			router.DELETE("/DeleteProblemReport/delete/:id", controller.DeleteProblemReport)

			//===================Vital Signs Record==================
			//Status Routes
			router.GET("/statuses/list", controller.ListStatus)
			router.GET("/status/get/:id", controller.GetStatus)

			//Vital Signs Routes
			router.GET("/vitalsigns/list", controller.ListVitalSignsRecord)
			router.GET("/vitalsign/get/:id", controller.GetVitalSignsRecord)
			router.POST("/vitalsign/create", controller.CreateVitalSignsRecord)
			router.PATCH("/vitalsign/update", controller.UpdateVitalSignsRecord)
			router.DELETE("/vitalsigns/delete/:id", controller.DeleteVitalSignsRecord)

			//====================Requisition Record=============
			//Equipment
			router.GET("/equipments/list", controller.ListEquipment)
			router.GET("/equipment/get/:id", controller.GetEquipment)

			//DepartmentForEquipment
			router.GET("/departmentforequipments/list", controller.ListDepartmentForEquipment)
			router.GET("/departmentforequipment/get/:id", controller.GetDepartmentForEquipment)

			//RequisitionRecord
			router.GET("/requisitionrecords/list", controller.ListRequisitionRecord)
			router.GET("/requisitionrecord/get/:id", controller.GetRequisitionRecord)
			router.POST("/requisitionrecord/create", controller.CreateRequisitionRecord)
			router.PATCH("/requisitionrecord/update", controller.UpdateRequisitionRecord)
			router.DELETE("/requisitionrecords/delete/:id", controller.DeleteRequisitionRecord)

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
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
