import { PatientInterface } from "../patient/IPatient";
import { MedicineInterface } from "./IMedicine";
import { EmployeeInterface } from "../employee/IEmployee";

export interface PrescriptionInterface {
    ID?: number;
    Annotation?: string;
    ScriptTime?: Date | null;

    PatientID?: number;
    MedicineID?: number;
    EmployeeID?: number;
    OrderID?: number;

    Patient?: PatientInterface;
    Medicine?: MedicineInterface;
    Employee?: EmployeeInterface;
    Order?: EmployeeInterface;

}