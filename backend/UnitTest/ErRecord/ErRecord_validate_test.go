package errecord

import (
	"testing"
	"time"

	//"time"
	. "github.com/aamjazrk/team12/entity"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

// func TestErRecordDateIsNow(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)
// 	test := uint(1)

// 	t.Run("Date isn't plesent", func(t *testing.T) {
// 		errec := ErRecord{
// 			EmployeeID:  &test,
// 			PatientID:   &test,
// 			ToEID:       &test,
// 			RoomID:      &test,
// 			Description: "GGGGGGG",
// 			Date:        time.Date(2023, 2, 11, 0, 0, 0, 0, time.UTC),
// 		}

// 		ok, err := govalidator.ValidateStruct(errec)

// 		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 		g.Expect(ok).NotTo(gomega.BeTrue())

// 		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 		g.Expect(err).ToNot(gomega.BeNil())

// 		// err.Error ต้องมี error message แสดงออกมา
// 		g.Expect(err.Error()).To(gomega.Equal("Date isn't plesent"))

// 	})
// }

func TestErRecordValidateDescriptMaxCharacters(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)
	t.Run("Description must to be max 50 characters", func(t *testing.T) {
		errec := ErRecord{
			NurseID:     &test,
			PatientID:   &test,
			ToEID:       &test,
			RoomID:      &test,
			Description: "Baby Shark, doo-doo, doo-doo Baby Shark, doo-doo, doo-dooBaby Shark, doo-doo, doo-dooBaby SharkMommy Shark, doo-doo, doo-dooMommy Shark, doo-doo, doo-dooMommy Shark, doo-doo, doo-dooMommy Shark",
			Date:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(errec)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description must to be max 50 characters"))
	})
}

func TestErRecordValidateDescriptNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)
	t.Run("Description not blank", func(t *testing.T) {
		errec := ErRecord{
			NurseID:     &test,
			PatientID:   &test,
			ToEID:       &test,
			RoomID:      &test,
			Description: "",
			Date:        time.Now(),
		}

		ok, err := govalidator.ValidateStruct(errec)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description not blank"))
	})
}

func TestErRecordValidateDescriptonchracaterAndNumber(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)

	t.Run("Description must have only character and number", func(t *testing.T) {
		errec := ErRecord{
			NurseID:     &test,
			PatientID:   &test,
			ToEID:       &test,
			RoomID:      &test,
			Description: "%%%%%%%%%%%%%",
			Date:        time.Now(),
		}
		ok, err := govalidator.ValidateStruct(errec)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description must have only character and number"))
	})
}
