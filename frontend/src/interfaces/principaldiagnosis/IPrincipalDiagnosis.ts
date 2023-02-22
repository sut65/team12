import { LoDInterface } from "./ILoD";
import { EmployeeInterface } from "../employee/IEmployee";
import { PatientInterface } from "../patient/IPatient";


export interface PrincipalDiagnosisInterface {
    ID: number;
    // EmployeeID?: number;
    PatientID?: number;
    LoDID?: number;
    Note?: string;
    Date?: Date | null;
    DoctorID?: number,


    Doctor?: EmployeeInterface;
    Patient?: PatientInterface;
    LoD?: LoDInterface;

}