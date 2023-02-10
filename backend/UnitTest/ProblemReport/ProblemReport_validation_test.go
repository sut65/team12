package problemreport

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestProblemReportValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("Date cannot be Future", func(t *testing.T) {
		e := ProblemReport{
			//Date:    time.Now().AddDate(0, 0, 1),
			Date:    time.Date(3023, 1, 24, 4, 0, 0, 0, time.UTC),
			Comment: "Testing Date Future",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Date cannot be Future"))
	})

	t.Run("Comment cannot be blank", func(t *testing.T) {
		e := ProblemReport{
			Date:    time.Date(2023, 1, 24, 4, 0, 0, 0, time.UTC),
			Comment: "",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Comment cannot be blank"))
	})
	t.Run("Comment must have only character and number", func(t *testing.T) {
		e := ProblemReport{
			Date:    time.Date(2023, 1, 24, 4, 0, 0, 0, time.UTC),
			Comment: "!@#$%^&*()_+",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("Comment must have only character and number"))
	})
}
