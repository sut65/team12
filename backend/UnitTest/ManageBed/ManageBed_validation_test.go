package entity

import (
	"testing"

	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestManageBedValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Note not be blank", func(t *testing.T) {
		managebed := ManageBed{
			Note:       "", // ผิด
			Hn:         20020939,
			ManageDate: time.Now(),
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(managebed)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Note not be blank"))
	})

	t.Run("Note must have only character and number", func(t *testing.T) {
		managebed := ManageBed{
			Note:       "**", // ผิด
			Hn:         20020939,
			ManageDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(managebed)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Note must have only character and number"))
	})

	t.Run("Hn not be blank", func(t *testing.T) {
		managebed := ManageBed{
			Note:       "Accident case",
			Hn:         0, // ผิด
			ManageDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(managebed)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Hn not be blank"))
	})

	t.Run("Hn length have to be at least 8", func(t *testing.T) {
		managebed := ManageBed{
			Note:       "Accident case",
			Hn:         20020, // ผิด
			ManageDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(managebed)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Hn length have to be at least 8"))
	})

}
func TestHnMustBePositive(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		-20020939,
		-20020940,
		-20020941,
	}

	// ข้อมูลถูกต้องบาง field
	for _, fixture := range fixtures {
		managebed := ManageBed{
			Note:       "Accident case",
			Hn:         fixture, // ผิด
			ManageDate: time.Now(),
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(managebed)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Hn must be positive number"))
	}
}

func TestManageBedDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	managebed := ManageBed{
		Note:       "Accident case",
		Hn:         20020938,
		ManageDate: time.Now().Add(time.Hour * -24), // ผิด
	}
	ok, err := govalidator.ValidateStruct(managebed)

	g.Expect(ok).NotTo(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("ManageDateNotPast"))
}
