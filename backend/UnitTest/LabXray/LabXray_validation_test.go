package entity

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestLab(t *testing.T) {
	g := gomega.NewGomegaWithT(t)
	t.Run("Description cannot be blank", func(t *testing.T) {
		lab := LabXray{
			Description: "",
			Pic:         "xcfgvhbjkjkhgfds",
			Date:        time.Now(),
		}
		ok, err := govalidator.ValidateStruct(lab)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description cannot be blank"))
	})
	t.Run("Description length is too long", func(t *testing.T) {
		lab := LabXray{
			Description: "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",
			Pic:         "sdfghjk;xcvbjklgf",
			Date:        time.Now(),
		}
		ok, err := govalidator.ValidateStruct(lab)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description length is too long"))
	})
	t.Run("Description must have only character and number", func(t *testing.T) {
		lab := LabXray{
			Description: "%%%%%%%%%",
			Pic:         "dxfchkljhgfdghghjljkhg",
			Date:        time.Now(),
		}
		ok, err := govalidator.ValidateStruct(lab)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description must have only character and number"))
	})
	t.Run("Description must have only character and number", func(t *testing.T) {
		lab := LabXray{
			Description: "%%%%%%%%%",
			Pic:         "dxfchkljhgfdghghjljkhg",
			Date:        time.Now(),
		}
		ok, err := govalidator.ValidateStruct(lab)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Description must have only character and number"))
	})
}
