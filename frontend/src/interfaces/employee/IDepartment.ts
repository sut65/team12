import { RoleInterface } from "./IRole";
export interface DepartmentInterface {
    ID?: number;
    Type?: string;
    RoleID?: number;

    Role?: RoleInterface;


}