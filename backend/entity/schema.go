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
	Department Department `gorm:"references:id"`
	Patient    []Patient  `gorm:"foreignKey:EmployeeID"`
}
type Role struct {
	gorm.Model
	Name      string
	Employees []Employee `gorm:"foreignKey:RoleID"`
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
}

// =========================================================================================================================================================
