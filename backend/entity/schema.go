package entity

import (
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
}
type Department struct {
	gorm.Model
	Type      string
	Employees []Employee `gorm:"foreignKey:DepartmentID"`
}

//=========================================================================================================================================================
