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
}
