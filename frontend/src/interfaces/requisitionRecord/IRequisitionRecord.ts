
import { EmployeeInterface } from "../employee/IEmployee";
import { EquipmentsInterface } from "./IEquipment";
import { DepartmentForEquipmentsInterface } from "./IDepartmentForEquipment";

export interface RequisitionRecordInterface {
  // ?ตวรจสอบว่าเป็น null ไหม หรือ ตวรจสอบว่า เป็น type ที่ตรงไหมก่อนที่จะ assignment
  ID: number;
  RequisitionDate?: Date | null ;
  Quantity?: number;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
   
  EquipmentID?: number;
  Equipment?: EquipmentsInterface;

  DepartmentForEquipmentID?: number;
  DepartmentForEquipment?: DepartmentForEquipmentsInterface;

}