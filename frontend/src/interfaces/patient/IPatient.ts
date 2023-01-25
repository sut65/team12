import { PatientTypeInterface } from "./IPatientType";
import { PatientRightInterface } from "./IPatientRight";
import { EmployeeInterface } from "../employee/IEmployee";
import { GenderInterface } from "../employee/IGender";

export interface PatientInterface {

    ID?: number;
    Civ?: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    Weight?: number;
    Underlying?: string;
    Brithdate?: Date | null;
    PatientTime?: Date | null;

    PatientTypeID?: number;
    EmployeeID?: number;
    PatientRightID?: number;
    GenderID?: number;

    PatientType?: PatientTypeInterface;
    Employee?: EmployeeInterface
    PatientRight?: PatientRightInterface;
    Gender?: GenderInterface;

}