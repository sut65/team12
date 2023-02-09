package Employee

import (
	"testing"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestEmployeePass(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	e := Employee{
		FirstName: "Sirinya",
		LastName:  "Kotpanya",
		Civ:       "1236479869777",
		Phone:     "0624445678",
		Email:     "si@gmail.com",
		Password:  "Zaq23DDkk",
		Address:   "219 m.10, nongprajak s, nongsham d, Ayutthaya 13000",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(e)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(gomega.BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(gomega.BeNil())
}

// =======================================================================================
func TestEmployeeNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
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
	t.Run("Identification Number cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "", //have blank
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Identification Number cannot be blank"))
	})
	t.Run("Phone cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "", //blank
			Email:     "si@gmail.com",
			Password:  "zaqkk1wsXph",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Phone cannot be blank"))
	})
	t.Run("Email cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Email cannot be blank"))
	})
	t.Run("Password cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gmail.com",
			Password:  "",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password cannot be blank"))
	})
	t.Run("Address cannot be blank", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gmail.com",
			Password:  "SSaw345gchgf",
			Address:   "",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Address cannot be blank"))
	})
}

// ======================================================================================
func TestEmployeeValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("FirstName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "12", // first name has number
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
	t.Run("FirstName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "#", // first name has special character
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

	t.Run("LastName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "%%", // Last name has special character
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

	t.Run("LastName must have only character", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "12", // Last name has number character
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

	t.Run("Identification Number must have only number and lenght is 13", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "12364798697", //lenght not equal 13
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Identification Number must have only number and lenght is 13"))
	})
	t.Run("Identification Number must have only number and lenght is 13", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "12364798697u", //have character
			Phone:     "0624445678",
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Identification Number must have only number and lenght is 13"))
	})

	t.Run("Phone must have only number And Start with 0 and lenght is 10", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869787",
			Phone:     "062444567", // lenght not equal 10
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Phone must have only number And Start with 0 and lenght is 10"))
	})
	t.Run("Phone must have only number And Start with 0 and lenght is 10", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869787",
			Phone:     "062444567h", // has character
			Email:     "si@gmail.com",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Phone must have only number And Start with 0 and lenght is 10"))
	})

	t.Run("Email is not valid", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gamil",
			Password:  "zaq1wsXp",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Email is not valid"))
	})

	t.Run("Password length have to be at least 8", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gmail.com",
			Password:  "zxoH1",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password length have to be at least 8"))
	})

	t.Run("Password need at least 1 uppercase", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gmail.com",
			Password:  "zxo12222222",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password need at least 1 uppercase"))
	})

	t.Run("Password need at least 1 number", func(t *testing.T) {
		e := Employee{
			FirstName: "Sirinya",
			LastName:  "Kotpanya",
			Civ:       "1236479869768",
			Phone:     "0623456789",
			Email:     "si@gmail.com",
			Password:  "zxoHHkkkkkk",
			Address:   "fgfhh",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Password need at least 1 number"))
	})

}
