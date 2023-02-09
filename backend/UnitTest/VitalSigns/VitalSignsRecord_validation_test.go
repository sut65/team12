package entity

import (
	"testing"
	"time"

	. "github.com/aamjazrk/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestVitalSignsValidateNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	t.Run("check BloodPressureHigh not blank", func(t *testing.T) {
		vitalsigns := VitalSignsRecord{
			CheckDate:         time.Now(),
			BloodPressureHigh: 0,
			BloodPressureLow:  70,
			PulseRate:         60,
			RespirationRate:   60,
			BodyTemperature:   37.50,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(vitalsigns)

		// ok คาดหวังต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).NotTo(gomega.BeTrue())

		// err คาดหวังต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("BloodPressureHigh not blank"))
	})

	// t.Run("check BloodPressureLow not blank", func(t *testing.T) {
	// 	vitalsigns := VitalSignsRecord{
	// 		CheckDate:         time.Now(),
	// 		BloodPressureHigh: 140,
	// 		BloodPressureLow:  0,
	// 		PulseRate:         60,
	// 		RespirationRate:   60,
	// 		BodyTemperature:   37.50,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(vitalsigns)

	// 	g.Expect(ok).NotTo(gomega.BeTrue())

	// 	g.Expect(err).ToNot(gomega.BeNil())

	// 	g.Expect(err.Error()).To(gomega.Equal("BloodPressureLow not blank"))
	// })

	// t.Run("check PulseRate not blank", func(t *testing.T) {
	// 	vitalsigns := VitalSignsRecord{
	// 		CheckDate:         time.Now(),
	// 		BloodPressureHigh: 140,
	// 		BloodPressureLow:  70,
	// 		PulseRate:         0,
	// 		RespirationRate:   60,
	// 		BodyTemperature:   37.50,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(vitalsigns)

	// 	g.Expect(ok).NotTo(gomega.BeTrue())

	// 	g.Expect(err).ToNot(gomega.BeNil())

	// 	g.Expect(err.Error()).To(gomega.Equal("PulseRate not blank"))
	// })

	// t.Run("check RespirationRate not blank", func(t *testing.T) {
	// 	vitalsigns := VitalSignsRecord{
	// 		CheckDate:         time.Now(),
	// 		BloodPressureHigh: 140,
	// 		BloodPressureLow:  70,
	// 		PulseRate:         60,
	// 		RespirationRate:   0,
	// 		BodyTemperature:   37.50,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(vitalsigns)

	// 	g.Expect(ok).NotTo(gomega.BeTrue())

	// 	g.Expect(err).ToNot(gomega.BeNil())

	// 	g.Expect(err.Error()).To(gomega.Equal("RespirationRate not blank"))
	// })

	// t.Run("check BodyTemperature not blank", func(t *testing.T) {
	// 	vitalsigns := VitalSignsRecord{
	// 		CheckDate:         time.Now(),
	// 		BloodPressureHigh: 140,
	// 		BloodPressureLow:  70,
	// 		PulseRate:         60,
	// 		RespirationRate:   60,
	// 		BodyTemperature:   0.0,
	// 	}

	// 	ok, err := govalidator.ValidateStruct(vitalsigns)

	// 	g.Expect(ok).NotTo(gomega.BeTrue())

	// 	g.Expect(err).ToNot(gomega.BeNil())

	// 	g.Expect(err.Error()).To(gomega.Equal("BodyTemperature not blank"))
	// })

}

func TestVitalSignsMustBeInRange(t *testing.T) {
	t.Run("check BloodPressureHigh must be between 140 - 179", func(t *testing.T) {
		g := gomega.NewGomegaWithT(t)

		vitalsigns := VitalSignsRecord{
			CheckDate:         time.Now(),
			BloodPressureHigh: 100, //ผิด
			BloodPressureLow:  70,
			PulseRate:         60,
			RespirationRate:   60,
			BodyTemperature:   37.50,
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(vitalsigns)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("BloodPressureHigh must be between 140 - 179"))
	})

	// t.Run("check BloodPressureLow must be between 0 - 90", func(t *testing.T) {
	// 	g := gomega.NewGomegaWithT(t)

	// 	vitalsigns := VitalSignsRecord{
	// 		CheckDate:         time.Now(),
	// 		BloodPressureHigh: 150,
	// 		BloodPressureLow:  100, //ผิด
	// 		PulseRate:         60,
	// 		RespirationRate:   60,
	// 		BodyTemperature:   37.50,
	// 	}
	// 	// ตรวจสอบด้วย govalidator
	// 	ok, err := govalidator.ValidateStruct(vitalsigns)

	// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	// 	g.Expect(ok).ToNot(gomega.BeTrue())

	// 	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	// 	g.Expect(err).ToNot(gomega.BeNil())

	// 	// err.Error ต้องมี error message แสดงออกมา
	// 	g.Expect(err.Error()).To(gomega.Equal("BloodPressureLow must be between 0 - 90"))
	// })
}

// func TestBodyTemperatureMustBePositive(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)

// 	fixtures := []float32{
// 		-35,
// 		-37.75,
// 		-36.00,
// 	}

// 	// ข้อมูลถูกต้องบาง field
// 	for _, fixture := range fixtures {
// 		vitalsigns := VitalSignsRecord{
// 			CheckDate:         time.Now(),
// 			BloodPressureHigh: 150,
// 			BloodPressureLow:  80,
// 			PulseRate:         60,
// 			RespirationRate:   60,
// 			BodyTemperature:   fixture, // ผิด
// 		}
// 		// ตรวจสอบด้วย govalidator
// 		ok, err := govalidator.ValidateStruct(vitalsigns)

// 		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 		g.Expect(ok).ToNot(gomega.BeTrue())

// 		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 		g.Expect(err).ToNot(gomega.BeNil())

// 		// err.Error ต้องมี error message แสดงออกมา
// 		g.Expect(err.Error()).To(gomega.Equal("BodyTemperature must be positive number"))
// 	}
// }
