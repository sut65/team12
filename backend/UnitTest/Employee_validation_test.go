package Validate

import (
	"testing"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestEmployeeValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("FirstName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "12",
			LastName:  "Kotpanya",
			Civ:       "1236479869777",
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "Zaq23DDkk",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("FirstName must have only character"))
	})
	t.Run("FirstName cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "",
			LastName:  "Kotpanya",
			Civ:       "1236479869777",
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("FirstName cannot be blank"))
	})
	t.Run("LastName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "11",
			Civ:       "1236479869777",
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("LastName must have only character"))
	})
	t.Run("LastName cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "",
			Civ:       "1236479869777",
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("LastName cannot be blank"))
	})
	
}
