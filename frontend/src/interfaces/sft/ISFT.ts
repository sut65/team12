import { PrincipalDiagnosisInterface } from "../principaldiagnosis/IPrincipalDiagnosis";
import { FoodTypeInterface } from "./IFoodType";
import { PatientInterface } from "../patient/IPatient";
import { EmployeeInterface } from "../employee/IEmployee";
export interface SFTInterface{
    ID:          number,
    PatientID?:   number ;
    Patient?:     PatientInterface;
    PrincipalDiagnosisID?:     number,
    PrincipalDiagnosis?:      PrincipalDiagnosisInterface,
    FoodTypeID?:  number,
    FoodType?:    FoodTypeInterface,
    DoctorID?:    number,
    Doctor?:      EmployeeInterface,
    Date?:          Date | null;
    Description: string ;
}