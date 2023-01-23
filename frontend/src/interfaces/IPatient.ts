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


}