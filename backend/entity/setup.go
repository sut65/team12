package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("impatient.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		// Employee
		&Department{},
		&Role{},
		&Employee{},
		&Gender{},
	)

	db = database

	// ทำการเพิ่ม Dummy Role ผู้ดูแลระบบ
	admin1 := Role{
		Name: "Doctor(แพทย์)",
	}
	db.Model(&Role{}).Create(&admin1)

	admin2 := Role{
		Name: "Nurse(พยาบาล)",
	}
	db.Model(&Role{}).Create(&admin2)

	admin3 := Role{
		Name: "Human Resourse(ฝ่ายบุคคล)",
	}
	db.Model(&Role{}).Create(&admin3)

	admin4 := Role{
		Name: "accounting(ฝ่ายการเงิน)",
	}
	db.Model(&Role{}).Create(&admin4)

	admin5 := Role{
		Name: "pharmacist(เภสัชกร)",
	}
	db.Model(&Role{}).Create(&admin5)

	// ทำการเพิ่ม Dummy gender ผู้ดูแลระบบ
	gender1 := Gender{
		Name: "Men(ชาย)",
	}
	db.Model(&Gender{}).Create(&gender1)

	gender2 := Gender{
		Name: "Women(หญิง)",
	}
	db.Model(&Gender{}).Create(&gender2)

	// ทำการเพิ่ม Dummy department ผู้ดูแลระบบ
	dep1 := Department{
		Type: "Emergency Room (แผนกฉุกเฉินและอุบัติเหตุ)",
	}
	db.Model(&Department{}).Create(&dep1)

	dep2 := Department{
		Type: "Radiology Department (แผนกรังสีกรรม)",
	}
	db.Model(&Department{}).Create(&dep2)

	dep3 := Department{
		Type: "Surgical Department (แผนกศัลยกรรม)",
	}
	db.Model(&Department{}).Create(&dep3)

	dep4 := Department{
		Type: "Department of Anaesthesia (แผนกวิสัญญี)",
	}
	db.Model(&Department{}).Create(&dep4)

	dep5 := Department{
		Type: "Pediatrics Department (แผนกกุมารเวชกรรม)",
	}
	db.Model(&Department{}).Create(&dep5)

	dep6 := Department{
		Type: "Obstretic (แผนกสูตินรีเวชกรรม)",
	}
	db.Model(&Department{}).Create(&dep6)

	dep7 := Department{
		Type: "Physical Therapy Department (แผนกเวชศาสตร์ฟื้นฟู)",
	}
	db.Model(&Department{}).Create(&dep7)

	dep8 := Department{
		Type: "Medicine Department (แผนกอายุรกรรม)",
	}
	db.Model(&Department{}).Create(&dep8)

	dep9 := Department{
		Type: "Ophthalmology Department (แผนกจักษุ)",
	}
	db.Model(&Department{}).Create(&dep9)

	dep10 := Department{
		Type: "Ear nose and throat Department (แผนกหู คอ จมูก)",
	}
	db.Model(&Department{}).Create(&dep10)

	dep11 := Department{
		Type: "Phamarceutical Department (แผนกเภสัชกรรม)",
	}
	db.Model(&Department{}).Create(&dep11)

	dep12 := Department{
		Type: "Psychology Department (แผนกจิตเวช)",
	}
	db.Model(&Department{}).Create(&dep12)

	dep13 := Department{
		Type: "Human and Resourse (แผนกฝ่ายบุคคล)",
	}
	db.Model(&Department{}).Create(&dep13)

	dep14 := Department{
		Type: "Finance Department (แผนกฝ่ายการเงิน)",
	}
	db.Model(&Department{}).Create(&dep14)

	// ทำการเพิ่ม Dummy ข้อมูล ผู้ดูแลระบบ
	emp1 := Employee{
		FirstName:  "preechapat",
		LastName:   "anpanit",
		Civ:        "1250008896345",
		Phone:      "0811111111",
		Email:      "preechapat@mail.com",
		Password:   "123456",
		Address:    "45 บ้านฟ้าปิยรมณ์ ต.บึงคำพร้อย อ.ลำลูกกาจ.ปทุมธานี 11350",
		Role:       admin1,
		Department: dep3,
		Gender:     gender2,
	}
	db.Model(&Employee{}).Create(&emp1)

	emp2 := Employee{
		FirstName:  "aam",
		LastName:   "love",
		Civ:        "1234567890124",
		Phone:      "0899999999",
		Email:      "kawin@mail.com",
		Password:   "123456",
		Address:    "37/123 บ้านหนองพิลุม ต.บ้านท่า อ.เมือง จ.ปราจีนบุรี 12150",
		Role:       admin3,
		Department: dep13,
		Gender:     gender2,
	}
	db.Model(&Employee{}).Create(&emp2)

	emp3 := Employee{
		FirstName:  "sirinya",
		LastName:   "kotpanya",
		Civ:        "1258896675256",
		Phone:      "0633333333",
		Email:      "sirinya@mail.com",
		Password:   "123456",
		Address:    "23/777 บ้านหนองบึง ต.ท่าช้าง อ.เมือง จ.ลพบุรี 13000",
		Role:       admin2,
		Department: dep2,
		Gender:     gender2,
	}
	db.Model(&Employee{}).Create(&emp3)

	emp4 := Employee{
		FirstName:  "poramate",
		LastName:   "jitlamom",
		Civ:        "1234445678055",
		Phone:      "0432536678",
		Email:      "poramate@mail.com",
		Password:   "123456",
		Address:    "56/77 บ้านตาก ต.หนองคุ้ม อ.ระงัน จ.ระยอง 13500",
		Role:       admin5,
		Department: dep11,
		Gender:     gender2,
	}
	db.Model(&Employee{}).Create(&emp4)

	emp5 := Employee{
		FirstName:  "siwana",
		LastName:   "julaiwarnsutti",
		Civ:        "1274563346856",
		Phone:      "0456673256",
		Email:      "siwa@mail.com",
		Password:   "123456",
		Address:    "324 ฟาร์มโชคชัย ต.โชคชัย อ.เมือง จ.นครราชศรีมา 12300",
		Role:       admin4,
		Department: dep14,
		Gender:     gender2,
	}
	db.Model(&Employee{}).Create(&emp5)

}
