import { EmployeeInterface } from "../employee/IEmployee";
import { SurgeryTypeInterface } from "./Isurgerytype";
import { SurgeryStateInterface } from "./Isurgerystate";
import { PatientInterface } from "../patient/IPatient";
import { SpecialistInterface } from "./Ispecialist";
import { OperatingRoomInterface } from "./Ioperatingroom";

export interface ORrecordInterface{
    ID?: number;
    //
    UserID?: number;
    User?: EmployeeInterface;
    //
    PatientID?: number;
    Patient?: PatientInterface;
    //
    OperatingRoomID?: number;
    OperatingRoom?: OperatingRoomInterface;
    //
    SpecialistID?: number;
    Specialist?: SpecialistInterface;
    //
    DoctorID?: number;
    Doctor?: EmployeeInterface;
    //
    SurgeryStateID?: number;
    SurgeryState?: SurgeryStateInterface;
    //
    SurgeryTypeID?: number;
    SurgeryType?: SurgeryTypeInterface;
    //
    StaffRecivingID?: number;
    StaffReciving?: EmployeeInterface;
	StaffReturingID?: number;
    StaffReturing?: EmployeeInterface;
    //
    SurgeryStart:      Date | null ;
	SurgeryEnd:        Date | null ;
	OperatingResult:   string ;
	Note:              string ;
}