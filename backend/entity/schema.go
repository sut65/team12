package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// ====================================================Employee part=============================================================
type Employee struct {
	gorm.Model
	FirstName string `valid:"required~FirstName cannot be blank,thai_eng_char_vowel~FirstName must have only character"`
	LastName  string `valid:"required~LastName cannot be blank,thai_eng_char_vowel~LastName must have only character"`
	Civ       string `gorm:"uniqueIndex" valid:"matches(^([0-9]{13})$)~Identification Number must have only number and lenght is 13,required~Identification Number cannot be blank"`
	Phone     string `gorm:"uniqueIndex" valid:"matches(^(0)([0-9]{9})$)~Phone must have only number And Start with 0 and lenght is 10,,required~Phone cannot be blank"`
	Email     string `gorm:"uniqueIndex" valid:"email~Email is not valid,required~Email cannot be blank"`
	Password  string `valid:"minstringlength(8)~Password length have to be at least 8,required~Password cannot be blank,matches([A-Z])~Password need at least 1 uppercase,matches([0-9])~Password need at least 1 number"`
	Address   string `valid:"required~Address cannot be blank"`
	//save Role ID in FK
	RoleID *uint `valid:"-"`
	//to easier for adding FK
	Role Role `gorm:"references:id" valid:"-"`
	//save Gender ID in FK
	GenderID *uint `valid:"-"`
	//to easier for adding FK
	Gender Gender `gorm:"references:id" valid:"-"`
	//save Department ID in FK
	DepartmentID *uint `valid:"-"`
	//to easier for adding FK
	Department Department `gorm:"references:id" valid:"-"`

	Patient           []Patient      `gorm:"foreignKey:EmployeeID"`
	LabXrays          []LabXray      `gorm:"foreignKey:DoctorID"`
	Prescription      []Prescription `gorm:"foreignKey:EmployeeID"`
	PrescriptionOrder []Prescription `gorm:"foreignKey:OrderID"`
	userORrecord      []ORrecord     `gorm:"foreignKey:UserID"`
	drORrecord        []ORrecord     `gorm:"foreignKey:DoctorID"`
	rcORrecord        []ORrecord     `gorm:"foreignKey:StaffRecivingID"`
	rtORrecord        []ORrecord     `gorm:"foreignKey:StaffReturingID"`
	ManageBeds        []ManageBed    `gorm:"foreignKey:EmployeeID"`
	SFTs              []SFT          `gorm:"foreignKey:DoctorID"`
	MedicalSlips      []MedicalSlip  `gorm:"foreignKey:EmployeeID"`
	MSTs              []MST          `gorm:"foreignKey:NurseID"`
	sMSTs             []MST          `gorm:"foreignKey:DoctorID"`
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
	Description string `valid:"required~Description cannot be blank,maxstringlength(300)~Description length is too long,thai_eng_char_vowel_number~Description must have only character and number"`
	//Description string `valid:"required~Description cannot be blank"`
	Date time.Time
	Pic  string `valid:"required~Picture cannot be blank"`
	//save LabType ID in FK
	LabTypeID *uint `valid:"-"`
	//to easier for adding FK
	LabType LabType `gorm:"references:id" valid:"-"`
	//save Doctor ID in FK
	DoctorID *uint `valid:"-"`
	//to easier for adding FK
	Doctor Employee `gorm:"references:id" valid:"-"`
	//save Patient ID in FK
	PatientID *uint `valid:"-"`
	//to easier for adding FK
	Patient Patient `gorm:"references:id" valid:"-"`

	MedicalSlips []MedicalSlip `gorm:"foreignKey:LabXrayID"`
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
	Civ         string `gorm:"uniqueIndex" valid:"matches(^([0-9]{13})$)~Identification Number must have only number and lenght is 13,required~Identification Number cannot be blank"`
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
	SFTs         []SFT          `gorm:"foreignKey:PatientID"`
	ManageBeds   []ManageBed    `gorm:"foreignKey:PatientID"`
	MSTs         []MST          `gorm:"foreignKey:PatientID"`

	MedicalSlips       []MedicalSlip        `gorm:"foreignKey:PatientID"`
	PrincipalDiagnosis []PrincipalDiagnosis `gorm:"foreignKey:PatientID"`
	ErRecord           []ErRecord           `gorm:"foreignKey:PatientID`
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

	MedicalSlips []MedicalSlip `gorm:"foreignKey:PrescriptionID"`
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
	Note       string    `valid:"required~Note not be blank, matches([a-zA-Z0-9ก-๙]$)~Note must have only character and number"`
	Hn         int       `valid:"minstringlength(8)~Hn length have to be at least 8,required~Hn not be blank, PositiveInt~Hn must be positive number,"`
	ManageDate time.Time `valid:"DateNotPast~ManageDateNotPast"`

	//FK
	PatientID *uint   `valid:"-"`
	Patient   Patient `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	EmployeeID *uint    `valid:"-"`
	Employee   Employee `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	BedID *uint `valid:"-"`
	Bed   Bed   `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	BedStatusID *uint     `valid:"-"`
	BedStatus   BedStatus `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation
}

// =====================================================Vital Signs====================================================
// Vital Sings Record
type VitalSignsRecord struct {
	gorm.Model
	CheckDate         time.Time
	BloodPressureHigh int     `valid:"range(140|179)~BloodPressureHigh must be between 140 - 179,required~BloodPressureHigh not blank,"`
	BloodPressureLow  int     `valid:"range(0|90)~BloodPressureLow must be between 0 - 90,required~BloodPressureLow not blank,"`
	PulseRate         int     `valid:"required~PulseRate not blank"`
	RespirationRate   int     `valid:"required~RespirationRate not blank"`
	BodyTemperature   float32 `valid:"required~BodyTemperature not blank,PositiveFloat~BodyTemperature must be positive number,"`

	EmployeeID *uint    `valid:"-"`                      //FK
	Employee   Employee `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	PatientID *uint   `valid:"-"`
	Patient   Patient `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	StatusID *uint  `valid:"-"`
	Status   Status `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation
}

// Status
type Status struct {
	gorm.Model
	Status string
	//Statuses []VitalSignsRecord `gorm:"foreignKey:StatusID"`
}

// ===========================================Requisition Subplies and Equipment===============================
// Equipment
type Equipment struct {
	gorm.Model
	Name string
}

// DepartmentForEquipment
type DepartmentForEquipment struct {
	gorm.Model
	Type string
}

// RequisitionRecord ตารางหลัก
type RequisitionRecord struct {
	gorm.Model
	RequisitionDate time.Time
	Quantity        int `valid:"range(0|10000)~Quantity must be between 1 - 10000,required~Quantity not blank,PositiveInt~Quantity must be positive number,"`

	EmployeeID *uint    `valid:"-"`                      //FK
	Employee   Employee `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	EquipmentID *uint     `valid:"-"`
	Equipment   Equipment `gorm:"references:id" valid:"-"` //join

	DepartmentForEquipmentID *uint                  `valid:"-"`
	DepartmentForEquipment   DepartmentForEquipment `gorm:"references:id" valid:"-"`
}

// ============================PrincipalDiagnosis======================================

type PrincipalDiagnosis struct {
	gorm.Model
	//Note string
	Note string `valid:"required~Note not blank, maxstringlength(150)~Note must to be max 150 characters"`
	Date time.Time

	//save in FK
	EmployeeID *uint `valid:"required~Please select Employee`
	PatientID  *uint `valid:"required~Please select Patient"`
	LoDID      *uint `valid:"required~Please select LoD"`

	//JOIN
	Employee Employee `valid:"-" gorm:"references:id"`
	Patient  Patient  `valid:"-" gorm:"references:id"`
	LoD      LoD      `valid:"-" gorm:"references:id"`
}

type LoD struct {
	gorm.Model
	Disease            string
	PrincipalDiagnosis []PrincipalDiagnosis `gorm:"foreignKey:LoDID"`
	SFTs               []SFT                `gorm:"foreignKey:PrincipalDiagnosisID"`
}

//======================================ExclusiveRoom==================================

type ErRecord struct {
	gorm.Model
	// Price float32
	Date        time.Time //`valid:"Date isn't plesent~Date isn't plesent"`
	Description string    `valid:"required~Description not blank, maxstringlength(50)~Description must to be max 50 characters, matches([a-zA-Z0-9ก-๙]$)~Description must have only character and number"`

	//save in FK
	EmployeeID *uint
	PatientID  *uint
	ToEID      *uint
	RoomID     *uint
	// PriceID    *uint

	//JOIN
	Employee Employee `valid:"-" gorm:"references:id"`
	Patient  Patient  `valid:"-" gorm:"references:id"`
	ToE      ToE      `valid:"-" gorm:"references:id"`
	Room     Room     `valid:"-" gorm:"references:id"`
	// Price    Room     `gorm:"references:id"`
}

type ToE struct {
	gorm.Model
	Roomtype string
	ErRecord []ErRecord `gorm:"foreignKey:ToEID`
	Room     []Room     `gorm:"foreignKey:ToEID`
}

type Room struct {
	gorm.Model
	Roomname string
	// Price    float32

	//save in FK
	ToEID *uint

	//JOIN
	ToE ToE `gorm:"references:id"`

	ErRecord []ErRecord `gorm:"foreignKey:RoomID`
	// ErRecordprice []ErRecord `gorm:"foreignKey:PriceID`
}

/***************** OperatingRoom ***********************/
type Specialist struct {
	gorm.Model
	SpclistName string
	//
	ORrecord []ORrecord `gorm:"foreignKey:SpecialistID"`
}
type SurgeryType struct {
	gorm.Model
	TypeName string
	//
	OperatingRoom []OperatingRoom `gorm:"foreignKey:ORtypeID"`
	ORrecord      []ORrecord      `gorm:"foreignKey:SurgeryTypeID"`
}
type SurgeryState struct {
	gorm.Model
	StateName string
	//*
	ORrecord []ORrecord `gorm:"foreignKey:SurgeryStateID"`
}
type OperatingRoom struct {
	gorm.Model
	ORname string
	//FK
	ORtypeID *uint
	//JOIN
	ORtype SurgeryType `gorm:"references:id"`
	//
	ORrecord []ORrecord `gorm:"foreignKey:OperatingRoomID"`
}
type ORrecord struct {
	gorm.Model
	//FK
	UserID          *uint
	OperatingRoomID *uint
	PatientID       *uint
	DoctorID        *uint
	SpecialistID    *uint
	SurgeryTypeID   *uint
	SurgeryStateID  *uint
	StaffRecivingID *uint
	StaffReturingID *uint

	SurgeryStart    time.Time `valid:"past~SurgeryStart cannot be Future"`
	SurgeryEnd      time.Time `valid:"past~SurgeryEnd cannot be Future"`
	OperatingResult string    `valid:"required~OperatingResult cannot be blank,matches([a-zA-Z0-9ก-๙]$)~OperatingResult must have only character and number"`
	Note            string
	//JOIN
	User          Employee      `gorm:"references:id" valid:"-"`
	OperatingRoom OperatingRoom `gorm:"references:id" valid:"-"`
	Patient       Patient       `gorm:"references:id" valid:"-"`
	Doctor        Employee      `gorm:"references:id" valid:"-"`
	Specialist    Specialist    `gorm:"references:id" valid:"-"`
	SurgeryType   SurgeryType   `gorm:"references:id" valid:"-"`
	SurgeryState  SurgeryState  `gorm:"references:id" valid:"-"`
	StaffReciving Employee      `gorm:"references:id" valid:"-"`
	StaffReturing Employee      `gorm:"references:id" valid:"-"`

	MedicalSlips []MedicalSlip `gorm:"foreignKey:ORrecordID"`
}

/***************** Problem Report ***********************/
type ClassProb struct {
	gorm.Model
	ClassProbType string
	//
	ProblemReport []ProblemReport `gorm:"foreignKey:ClassProbID"`
}
type Problem struct {
	gorm.Model
	ProblemName string
	//
	ProblemReport []ProblemReport `gorm:"foreignKey:ClassProbID"`
}
type NumPlace struct {
	gorm.Model
	Name string
	//FK
	ClassProbID *uint
	ClassProb   ClassProb `gorm:"references:id"`
	//
	ProblemReport []ProblemReport `gorm:"foreignKey:NumPlaceID"`
}
type ProblemReport struct {
	gorm.Model
	//FK
	UserID      *uint
	ClassProbID *uint
	NumPlaceID  *uint
	ProblemID   *uint
	Date        time.Time `valid:"past~Date cannot be Future"`
	Comment     string    `valid:"required~Comment cannot be blank,matches([a-zA-Z0-9ก-๙]$)~Comment must have only character and number"`
	//JOIN
	User      Employee  `gorm:"references:id" valid:"-"`
	ClassProb ClassProb `gorm:"references:id" valid:"-"`
	NumPlace  NumPlace  `gorm:"references:id" valid:"-"`
	Problem   Problem   `gorm:"references:id" valid:"-"`
}

//======================================MadicalSlip==================================

type MedicalSlip struct {
	gorm.Model
	Total       float64   `valid:"required~Total not be blank,PositiveFloat64~Total must be positive number,"`
	Note        string    `valid:"required~Notes not be blank, matches([a-zA-Z0-9ก-๙]$)~Notes must have only character and number"`
	MedicalDate time.Time `valid:"DateNotPast~MedicalDateNotPast"`

	//FK
	PatientID *uint   `valid:"-"`
	Patient   Patient `gorm:"references:id" valid:"-"`

	EmployeeID *uint    `valid:"-"`
	Employee   Employee `gorm:"references:id" valid:"-"`

	LabXrayID *uint   `valid:"-"`
	LabXray   LabXray `gorm:"references:id" valid:"-"`

	ORrecordID *uint    `valid:"-"`
	ORrecord   ORrecord `gorm:"references:id" valid:"-"`

	PrescriptionID *uint        `valid:"-"`
	Prescription   Prescription `gorm:"references:id" valid:"-"`
}

//==================================================== xxxSpecifyFoodType ==========================================================================================//

type SFT struct {
	gorm.Model

	//FK
	PatientID *uint
	Patient   Patient `gorm:"references:id"`

	PrincipalDiagnosisID *uint
	PrincipalDiagnosis   PrincipalDiagnosis `gorm:"references:id"`

	FoodTypeID *uint
	FoodType   FoodType `gorm:"references:id"`

	DoctorID *uint
	Doctor   Employee `gorm:"references:id"`

	Date time.Time
}

type FoodType struct {
	gorm.Model
	FoodType string
	SFTs     []SFT `gorm:"foreignKey:FoodTypeID"`
}

//==================================================== xxSpecifyFoodType ==========================================================================================//
//==================================================== xxxMST ==========================================================================================//

type MST struct {
	gorm.Model

	//FK
	PatientID *uint
	Patient   Patient `gorm:"references:id"`

	RegDateTime time.Time
	MSTDateTime time.Time

	NurseID *uint
	Nurse   Employee `gorm:"references:id"`

	DoctorID *uint
	Doctor   Employee `gorm:"references:id"`

	HospitalID *uint
	Hospital   Hospital
}

type Hospital struct {
	gorm.Model
	Pin       int
	Name      string
	Type      string
	Address   string
	Postcode  string
	sdistrict string
	District  string
	Province  string
	Quantity  int

	MSTs []MST `gorm:"foreignKey:HospitalID"`
}

//==================================================== xxMST ==========================================================================================//

func init() {
	govalidator.CustomTypeTagMap.Set("PositiveFloat", func(i interface{}, context interface{}) bool {
		return i.(float32) >= 0
	})

	govalidator.CustomTypeTagMap.Set("PositiveFloat64", func(i interface{}, context interface{}) bool {
		return i.(float64) >= 0
	})

	govalidator.CustomTypeTagMap.Set("PositiveInt", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) > 0
	})

	govalidator.CustomTypeTagMap.Set("DateNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
	})
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("thai_eng_char_vowel", func(i interface{}, context interface{}) bool {
		s, ok := i.(string)
		if !ok {
			return false
		}

		for _, c := range s {
			if !(('ก' <= c && c <= 'ฮ') || ('ะ' <= c && c <= 'ู') || ('เ' <= c && c <= '์') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z')) {
				return false
			}
		}
		return true
	})

	govalidator.CustomTypeTagMap.Set("thai_eng_char_vowel_number", func(i interface{}, context interface{}) bool {
		s, ok := i.(string)
		if !ok {
			return false
		}

		for _, c := range s {
			if !(('ก' <= c && c <= 'ฮ') || ('ะ' <= c && c <= 'ู') || ('เ' <= c && c <= '์') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || ('0' <= c && c <= '9') || ('๐' <= c && c <= '๙') || (' ' == c)) {
				return false
			}
		}
		return true
	})

}
