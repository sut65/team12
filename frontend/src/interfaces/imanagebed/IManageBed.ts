import { BedInterface } from "./IBed";
import { BedStatusInterface } from "./IBedStatus";

import { EmployeeInterface } from "../employee/IEmployee";
import { PatientInterface } from "../patient/IPatient";

export interface ManageBedInterface {
    ID?: number;
    Hn: number | null;
    Note: string | null;
    ManageDate: Date | null;

    PatientID?: number;
    Patient?: PatientInterface;
    EmployeeID?:      number,
	Employee?:        EmployeeInterface,
    BedID?: number;
    Bed?: BedInterface;
    BedStatusID?: number;
    BedStatus?: BedStatusInterface;
    
}