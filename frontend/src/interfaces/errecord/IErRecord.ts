import { EmployeeInterface } from "../employee/IEmployee";
import { PatientInterface } from "../patient/IPatient";
import { ToEInterface } from "./IToE";
import { RoomInterface } from "./IRoom";

export interface ErRecordInterface {
    ID: number;
    // Price: number;
    Description?: string;
    EmployeeID?: number;
    PatientID?: number;
    ToEID?: number;
    RoomID?: number;
    Date?: Date | null;

    Employee?: EmployeeInterface;
    Patient?: PatientInterface;
    ToE?: ToEInterface;
    Room?: RoomInterface;
    // Price: string;

}