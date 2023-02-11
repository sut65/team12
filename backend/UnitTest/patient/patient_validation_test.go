package patient

import (
	"testing"
	"time"

	"github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestPatientValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	//เคสแรก ชื่อไม่ว่าง
	t.Run("check FirstName not blank", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "", //ผิด
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("FirstName cannot be blank"))
	})

	//เคสสอง ชื่อเป็นตัวหนังสือ
	t.Run("check FirstName must have only character", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "123#$%", //ผิด
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("FirstName must have only character"))
	})

	//เคสสาม นามสกุลไม่ว่าง
	t.Run("check LastName not blank", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "", //ผิด
			Age:         15,
			Weight:      56.1,
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("LastName cannot be blank"))
	})

	//เคสสี่ นามสกุลเป็นตัวหนังสือ
	t.Run("check LastName must have only character", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "123$%", //ผิด
			Age:         15,
			Weight:      56.1,
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("LastName must have only character"))
	})

	//เคสห้า อายุไม่อยู่ในช่วง 0-122
	t.Run("check Age not in range 0-122", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         123, //ผิด
			Weight:      56.1,
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Age not in range 0-122"))
	})

	//เคสหก น้ำหนักไม่อยู่ในช่วง 0-595
	t.Run("check Weight not in range 0-595", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         22,
			Weight:      600.32, //ผิด
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Weight not in range 0-595"))
	})

	//เคสเจ็ด น้ำหนักไม่เป็นเป็นเลขจำนวนเต็ม
	/*t.Run("check Weight is not an integer", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         22,
			Weight:      20.02, //ผิด
			Underlying:  "ตายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Weight is not an integer"))
	})
	*/

	//เคส 8 หมายเหตุห้ามว่าง
	t.Run("check Underlying cannot be blank", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "", //ผิด
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Underlying cannot be blank"))
	})

	//เคส 9 วันเกิดต้องเป็นอดีต
	t.Run("check Brithdate must be in the past", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650",
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ต่ายห่า",
			Brithdate:   time.Date(2023, 8, 10, 0, 0, 0, 0, time.UTC), // ปี เดือน วัน ผิด
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Brithdate must be in the past"))
	})

	//เคส 10 เลขประบัตรประชาชนไม่ครบ 13 หลัก
	t.Run("check Identification Number must have only number and lenght is 13", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "130990275", // เลขบัตรประชาชนไม่ครบ 13 ตัว
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ต่ายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Identification Number must have only number and lenght is 13"))
	})

	//เคส 11 เลขประบัตรประชาชนมีตัวอักษร
	t.Run("check Identification Number must have only number and lenght is 13", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "130990275u", // เลขบัตรประชาชนมีตัวอักษร
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ต่ายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Identification Number must have only number and lenght is 13"))
	})

	//เคส 12 เลขประบัตรประชาชนห้ามว่าง
	t.Run("check Identification Number cannot be blank", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "", // ห้ามว่าง
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ต่ายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		g.Expect(ok).NotTo(gomega.BeTrue()) //ไม่หวังให้เป็น ture

		g.Expect(err).ToNot(gomega.BeNil()) //err ไม่เป็น null ต้องผิด

		g.Expect(err.Error()).To(gomega.Equal("Identification Number cannot be blank"))
	})

	// เคสที่ 13 สำเส็จทั้งหมด
	t.Run("check Patient register cuccess", func(t *testing.T) {
		p := entity.Patient{
			Civ:         "1309902756650", // ห้ามว่าง
			FirstName:   "Paramet",
			LastName:    "Chitlamom",
			Age:         15,
			Weight:      56.1,
			Underlying:  "ต่ายห่า",
			Brithdate:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			PatientTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(p)

		// ok ต้องเป็น true แปลว่าไม่มี error
		g.Expect(ok).To(gomega.BeTrue())

		// err เป็นค่า nil แปลว่าไม่มี error
		g.Expect(err).To(gomega.BeNil())

	})

}
