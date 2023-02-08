package orrecord

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestORrecordValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("OperatingResult cannot be blank", func(t *testing.T) {
		e := ORrecord{
			SurgeryStart:    time.Date(2023, 1, 24, 4, 12, 0, 0, time.UTC),
			SurgeryEnd:      time.Date(2023, 1, 24, 8, 41, 0, 0, time.UTC),
			OperatingResult: "", //ตรวจสอบผิด
			Note:            "ระวังผู้ป่วยตาย",
		}

		ok, err := govalidator.ValidateStruct(e)

		g.Expect(ok).NotTo(gomega.BeTrue())

		g.Expect(err).ToNot(gomega.BeNil())

		g.Expect(err.Error()).To(gomega.Equal("OperatingResult cannot be blank"))
	})
}
