
import { PatientInterface } from "../patient/IPatient";
import { EmployeeInterface } from "../employee/IEmployee";
import { StatusesInterface } from "./IStatus";

export interface VitalSignsInterface {
  // ?ตวรจสอบว่าเป็น null ไหม หรือ ตวรจสอบว่า เป็น type ที่ตรงไหมก่อนที่จะ assignment
  ID: number;
  CheckDate?: Date | null ;
  // CheckDate: Date,
  BloodPressureHigh?: number;
  BloodPressureLow?: number;
  PulseRate?: number;
  RespirationRate?: number;
  BodyTemperature?: number;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
   
  PatientID?: number;
  Patient?: PatientInterface;

  StatusID?: number;
  Status?: StatusesInterface;

}