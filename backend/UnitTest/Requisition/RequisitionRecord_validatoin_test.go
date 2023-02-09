package entity

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestRequisitionPass(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	requisition := RequisitionRecord{
		RequisitionDate: time.Now(),
		Quantity:        10,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(requisition)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(gomega.BeNil())
}

func TestRequisitionQuantityNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("check Quantity not blank", func(t *testing.T) {
		requisition := RequisitionRecord{
			RequisitionDate: time.Now(),
			Quantity:        0,
		}

		ok, err := govalidator.ValidateStruct(requisition)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Quantity not blank"))
	})

}

func TestVRequisitionMustBeInRange(t *testing.T) {

	g := gomega.NewGomegaWithT(t)

	requisition := RequisitionRecord{
		RequisitionDate: time.Now(),
		Quantity:        1000000, //ผิด
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(requisition)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(gomega.BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(gomega.Equal("Quantity must be between 1 - 10000"))
}

func TestQuantityMustBePositive(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	fixtures := []int{
		-10,
		-1,
		-1000,
	}

	// ข้อมูลถูกต้องบาง field
	for _, fixture := range fixtures {
		requisition := RequisitionRecord{
			RequisitionDate: time.Now(),
			Quantity:        fixture,
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(requisition)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("Quantity must be positive number"))
	}
}
