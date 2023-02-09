package entity

import (
	"testing"

	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestMedicalValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Notes not be blank", func(t *testing.T) {

		medical := MedicalSlip{
			Total:       100000.00,
			Note:        "", // ผิด
			MedicalDate: time.Now(),
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(medical)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Notes not be blank"))
	})

	t.Run("Notes must have only character and number", func(t *testing.T) {
		medical := MedicalSlip{
			Total:       100000.00,
			Note:        "**", // ผิด
			MedicalDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(medical)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Notes must have only character and number"))
	})

	t.Run("Total not be blank", func(t *testing.T) {
		medical := MedicalSlip{
			Total:       0.0,
			Note:        "Accident case", // ผิด
			MedicalDate: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(medical)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Total not be blank"))
	})

}
func TestTotalMustBePositive(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float64{
		-35,
		-37.75,
		-36.00,
	}

	// ข้อมูลถูกต้องบาง field
	for _, fixture := range fixtures {

		medical := MedicalSlip{
			Total:       fixture,
			Note:        "Accident case", // ผิด
			MedicalDate: time.Now(),
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(medical)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Total must be positive number"))
	}
}

func TestMedicalDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	medical := MedicalSlip{
		Total:       100000.00,
		Note:        "Accident case",
		MedicalDate: time.Now().Add(time.Hour * -24), // ผิด
	}

	ok, err := govalidator.ValidateStruct(medical)

	g.Expect(ok).NotTo(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("MedicalDateNotPast"))
}
