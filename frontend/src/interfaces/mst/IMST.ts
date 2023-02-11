import { HospitalInterface } from "./IHospital";
import { PatientInterface } from "../patient/IPatient";
import { EmployeeInterface } from "../employee/IEmployee";
export interface MSTInterface {

    ID: number;
    RegDateTime?:     Date | null;
    MSTDateTime?:     Date | null;

    PatientID?:     number;
    Patient?:       PatientInterface;
    NurseID?:       number,
	Nurse?:         EmployeeInterface,
    DoctorID?:      number;
    Doctor?:        EmployeeInterface;
    HospitalID?:    number;
    Hospital?:      HospitalInterface;
    Description:    string ;
    

}