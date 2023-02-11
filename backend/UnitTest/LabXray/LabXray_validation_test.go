package entity

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)
func TestLabSuccess(t *testing.T){
	g := gomega.NewGomegaWithT(t)
	lab := LabXray{
		Description: "สวัสดี ปีใหม่ กระดูก C อาจแตก",
		Date: time.Now(),
		Pic: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMaaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwNiA3OS4xNjQ3NTMsIDIwMjEvMDIvMTUtMTE6NTI6MTMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmO",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(lab)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(gomega.BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(gomega.BeNil())
}
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
			Description: "giogdpofgjdfgifdogdhgusigsdghdfsaughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgiogdpofgjdfgifdogdhgusigsdghdfsughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgiogdpofgjdfgifdogdhgusigsdghdfsughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgio",
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
}
