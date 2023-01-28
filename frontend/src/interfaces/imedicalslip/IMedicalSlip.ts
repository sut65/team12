import { EmployeeInterface } from "../employee/IEmployee";
import { PatientInterface } from "../patient/IPatient";

import { LabXrayInterface } from "../LabXray/ILabXray";
import { ORrecordInterface } from "../OperatingRecord/Iorrecord";
import { PrescriptionInterface } from "../prescription/IPrescription";

export interface MedicalSlipInterface {
    ID?: number;
    Total: number | any ;
    Note: string | null;
    MedicalDate: Date | null;

    PatientID?: number;
    Patient?: PatientInterface;
    EmployeeID?:      number,
	Employee?:        EmployeeInterface,

    LabXrayID?: number;
    LabXray?: LabXrayInterface;
    ORrecordID?: number;
    ORrecord?: ORrecordInterface;
    PrescriptionID?: number;
    Prescription?: PrescriptionInterface;
    
}