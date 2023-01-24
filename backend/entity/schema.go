package entity

import (
	"time"

	"gorm.io/gorm"
)

// ====================================================Employee part=============================================================
type Employee struct {
	gorm.Model
	FirstName string
	LastName  string
	Civ       string `gorm:"uniqueIndex"`
	Phone     string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Address   string
	//save Role ID in FK
	RoleID *uint
	//to easier for adding FK
	Role Role `gorm:"references:id"`
	//save Gender ID in FK
	GenderID *uint
	//to easier for adding FK
	Gender Gender `gorm:"references:id"`
	//save Department ID in FK
	DepartmentID *uint
	//to easier for adding FK
	Department        Department     `gorm:"references:id"`
	Patient           []Patient      `gorm:"foreignKey:EmployeeID"`
	LabXrays          []LabXray      `gorm:"foreignKey:DoctorID"`
	Prescription      []Prescription `gorm:"foreignKey:EmployeeID"`
	PrescriptionOrder []Prescription `gorm:"foreignKey:OrderID"`

	ManageBeds []ManageBed `gorm:"foreignKey:EmployeeID"`
}
type Role struct {
	gorm.Model
	Name        string
	Employees   []Employee   `gorm:"foreignKey:RoleID"`
	Departments []Department `gorm:"foreignKey:RoleID"`
}
type Gender struct {
	gorm.Model
	Name      string
	Employees []Employee `gorm:"foreignKey:GenderID"`
	Patient   []Patient  `gorm:"foreignKey:GenderID"`
}
type Department struct {
	gorm.Model
	Type      string
	Employees []Employee `gorm:"foreignKey:DepartmentID"`
	//save Role ID in FK
	RoleID *uint
	//to easier for adding FK
	Role Role `gorm:"references:id"`
}

// ============================================LabXray=========================================================
type LabXray struct {
	gorm.Model
	Description string
	Date        time.Time
	Pic         string
	//save LabType ID in FK
	LabTypeID *uint
	//to easier for adding FK
	LabType LabType `gorm:"references:id"`
	//save Doctor ID in FK
	DoctorID *uint
	//to easier for adding FK
	Doctor Employee `gorm:"references:id"`
	//save Patient ID in FK
	PatientID *uint
	//to easier for adding FK
	Patient Patient `gorm:"references:id"`
}

type LabType struct {
	gorm.Model
	Name  string
	Price int

	LabXrays []LabXray `gorm:"foreignKey:LabTypeID"`
}

// =========================================================================================================================================================
type PatientType struct {
	gorm.Model
	Type    string
	Patient []Patient `gorm:"foreignKey:PatientTypeID"`
}

type PatientRight struct {
	gorm.Model
	Type    string
	Patient []Patient `gorm:"foreignKey:PatientRightID"`
}

type Patient struct {
	gorm.Model
	Civ         string `gorm:"uniqueIndex"`
	FirstName   string
	LastName    string
	Age         int
	Weight      float32
	Underlying  string
	Brithdate   time.Time
	PatientTime time.Time

	//FK
	PatientTypeID  *uint
	EmployeeID     *uint
	PatientRightID *uint
	GenderID       *uint

	//JOIN
	PatientType  PatientType  `gorm:"references:id"`
	Employee     Employee     `gorm:"references:id"`
	PatientRight PatientRight `gorm:"references:id"`
	Gender       Gender       `gorm:"references:id"`

	LabXrays     []LabXray      `gorm:"foreignKey:PatientID"`
	Prescription []Prescription `gorm:"foreignKey:PatientID"`

	ManageBeds []ManageBed `gorm:"foreignKey:PatientID"`
}

// =========================================================================================================================================================
type Medicine struct {
	gorm.Model
	Drug         string
	Cost         float32
	Prescription []Prescription `gorm:"foreignKey:MedicineID"`
}

type Prescription struct {
	gorm.Model
	Annotation string
	ScriptTime time.Time

	//FK
	PatientID  *uint
	MedicineID *uint
	EmployeeID *uint
	OrderID    *uint

	//JOIN
	Patient  Patient  `gorm:"references:id"`
	Medicine Medicine `gorm:"references:id"`
	Employee Employee `gorm:"references:id"`
	Order    Employee `gorm:"references:id"`
}

// =========================================================================================================================================================

// ============================================ManageBed=========================================================
type BedStatus struct {
	gorm.Model
	Name       string
	ManageBeds []ManageBed `gorm:"foreignKey:BedStatusID"`
}

type Bed struct {
	gorm.Model
	Number      string
	ClassProbID int
	ManageBeds  []ManageBed `gorm:"foreignKey:BedID"`
}

type ManageBed struct {
	gorm.Model
	Note       string
	Hn         int
	ManageDate time.Time

	//FK
	PatientID *uint
	Patient   Patient

	EmployeeID *uint
	Employee   Employee

	BedID *uint
	Bed   Bed

	BedStatusID *uint
	BedStatus   BedStatus
}

// =====================================================Vital Signs====================================================
// Vital Sings Record
type VitalSignsRecord struct {
	gorm.Model
	CheckDate         time.Time
	BloodPressureHigh int
	BloodPressureLow  int
	PulseRate         int
	RespirationRate   int
	BodyTemperature   float32

	EmployeeID *uint    //FK
	Employee   Employee `gorm:"references:id"` //JOIN

	PatientID *uint   //FK
	Patient   Patient `gorm:"references:id"`

	StatusID *uint  //FK
	Status   Status `gorm:"references:id"`
}

// Status
type Status struct {
	gorm.Model
	Status string
	//Statuses []VitalSignsRecord `gorm:"foreignKey:StatusID"`
}

// ============================PrincipalDiagnosis======================================

type PrincipalDiagnosis struct {
	gorm.Model
	Note string
	Date time.Time

	//save in FK
	EmployeeID *uint
	PatientID  *uint
	LoDID      *uint

	//JOIN
	Employee Employee `gorm:"references:id"`
	Patient  Patient  `gorm:"references:id"`
	LoD      LoD      `gorm:"references:id"`
}

type LoD struct {
	gorm.Model
	Disease            string
	PrincipalDiagnosis []PrincipalDiagnosis `gorm:"foreignKey:LoDID"`
}
