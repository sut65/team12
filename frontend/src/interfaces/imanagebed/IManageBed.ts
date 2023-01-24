import { BedInterface } from "./IBed";
import { BedStatusInterface } from "./IBedStatus";
// import { EmployeeInterface } from "./IEmployee";
// import { PatientInterface } from "./IPatient";

export interface ManageBedInterface {
    ID?: number;
    Hn: number | null;
    Note: string | null;
    ManageDate: Date | null;

    PatientID?: number;
    Patient?: null;//PatientInterface;
    EmployeeID?:      number,
	Employee?:        null;//EmployeeInterface,
    BedID?: number;
    Bed?: BedInterface;
    BedStatusID?: number;
    BedStatus?: BedStatusInterface;
    
}