import { SurgeryTypeInterface } from "./Isurgerytype";
export interface OperatingRoomInterface{
    ID: number;
    ORname: string ;
    ORtypeID: number;
    ORtype: SurgeryTypeInterface;
}