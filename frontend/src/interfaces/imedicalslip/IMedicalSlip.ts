import { EmployeeInterface } from "../employee/IEmployee";
import { PatientInterface } from "../patient/IPatient";

import { LabXrayInterface } from "../LabXray/ILabXray";
// import {ORecordInterface} from "../ORecord/IORecord";
import { PrescriptionInterface } from "../prescription/IPrescription";

export interface MedicalSlipInterface {
    ID?: number;
    Total: number | null;
    Note: string | null;
    MedicalDate: Date | null;

    PatientID?: number;
    Patient?: PatientInterface;
    EmployeeID?:      number,
	Employee?:        EmployeeInterface,

    LabXrayID?: number;
    LabXray?: LabXrayInterface;
    ORecordID?: number;
    ORecord?: null; //ORecordInterface
    PrescriptionID?: number;
    Prescription?: PrescriptionInterface;
    
}