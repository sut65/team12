package prescription

import (
	"testing"
	"time"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestPrescriptionValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	//เคส 1 หมายเหตุไม่ว่าง
	t.Run("check Annotation not blank", func(t *testing.T) {
		p := entity.Prescription{
			Annotation: "", //ผิดนะ มันห้ามว่าง
			ScriptTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Annotation cannot be blank"))
	})

	//เคส 2 ไม่ยาวเกิน 300 ตัวอักษร
	t.Run("check Annotation length is too long", func(t *testing.T) {
		p := entity.Prescription{ //ผิดนะ มันยาวเกินมี 301 ตัว
			Annotation: "giogdpofgjdfgifdogdhgusigsdghdfsaughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgiogdpofgjdfgifdogdhgusigsdghdfsughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgiogdpofgjdfgifdogdhgusigsdghdfsughsgsgjsgosgsgioufshguiosghdsigfdjsihfussfgfsugiohsdfigfshgisfghosgio",
			ScriptTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Annotation length is too long"))
	})

	//เคส 3 ไม่มีอักษรพิเศษ
	t.Run("check Annotation must have only character and number", func(t *testing.T) {
		p := entity.Prescription{
			Annotation: "+/*$$$", //ผิดนะ มันห้ามว่าง
			ScriptTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Annotation must have only character and number"))
	})

	//เคส 4 สำเร็จทั้งหมด
	t.Run("check Prescription success all", func(t *testing.T) {
		p := entity.Prescription{
			Annotation: "ตายซนะนะ",
			ScriptTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		// ok ต้องเป็น true แปลว่าไม่มี error
		g.Expect(ok).To(gomega.BeTrue())

		// err เป็นค่า nil แปลว่าไม่มี error
		g.Expect(err).To(gomega.BeNil())
	})

}
