package principaldiagnosis

import (
	"testing"
	"time"

	//"time"
	. "github.com/aamjazrk/team12/entity"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestPDValidatenotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)

	t.Run("check Note not blank", func(t *testing.T) {
		pd := PrincipalDiagnosis{
			DoctorID:  &test,
			PatientID: &test,
			LoDID:     &test,
			Note:      "",
			Date:      time.Now(),
		}

		ok, err := govalidator.ValidateStruct(pd)

		g.Expect(ok).ToNot(gomega.BeTrue())
		g.Expect(err).ToNot(gomega.BeNil())
		g.Expect(err.Error()).To(gomega.Equal("Note not blank"))

	})

	t.Run("check Doctor not nil", func(t *testing.T) {
		pd := PrincipalDiagnosis{
			DoctorID:  nil,
			PatientID: &test,
			LoDID:     &test,
			Note:      "SS",
			Date:      time.Now(),
		}

		ok, err := govalidator.ValidateStruct(pd)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(gomega.BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("Please select Doctor"))

	})

	t.Run("check Patient not nil", func(t *testing.T) {
		pd := PrincipalDiagnosis{
			DoctorID:  &test,
			PatientID: nil,
			LoDID:     &test,
			Note:      "GG",
			Date:      time.Now(),
		}

		ok, err := govalidator.ValidateStruct(pd)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(gomega.BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("Please select Patient"))

	})

	t.Run("check LoD not nil", func(t *testing.T) {
		pd := PrincipalDiagnosis{
			DoctorID:  &test,
			PatientID: &test,
			LoDID:     nil,
			Note:      "GG",
			Date:      time.Now(),
		}

		ok, err := govalidator.ValidateStruct(pd)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Please select LoD"))

	})
}

func TestPDValidateNoteMaxCharacters(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	test := uint(1)
	t.Run("Note must to be max 150 characters", func(t *testing.T) {
		pd := PrincipalDiagnosis{
			DoctorID:  &test,
			PatientID: &test,
			LoDID:     &test,
			Date:      time.Now(),
			Note:      "Baby Shark, doo-doo, doo-doo Baby Shark, doo-doo, doo-dooBaby Shark, doo-doo, doo-dooBaby SharkMommy Shark, doo-doo, doo-dooMommy Shark, doo-doo, doo-dooMommy Shark, doo-doo, doo-dooMommy Shark",
		}

		ok, err := govalidator.ValidateStruct(pd)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Note must to be max 150 characters"))
	})
}
