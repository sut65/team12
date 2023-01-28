import { LabTypeInterface } from "./ILabType";
import { PatientInterface } from "../patient/IPatient";
import { EmployeeInterface } from "../employee/IEmployee";
export interface LabXrayInterface{
    ID: number;
    Description: string ;
    Pic: string;
    Date: Date ;

    LabTypeID: number;
    LabType: LabTypeInterface;

    DortorID: number;
    Doctor: EmployeeInterface;
    
    PatientID: number;
    Patient: PatientInterface;

}