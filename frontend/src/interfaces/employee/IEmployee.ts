import { RoleInterface } from "./IRole";
import { GenderInterface } from "./IGender";
import { DepartmentInterface } from "./IDepartment";
export interface EmployeeInterface {

    ID?: number;
    FirstName?: string;
    LastName?: string;
    Civ?: string;
    Phone?: string;
    Email?: string;
    Password?: string;
    Address?: string;
    RoleID?: number;
    GenderID?: number;
    DepartmentID?: number;

    Role?: RoleInterface;
    Gender?: GenderInterface;
    Department?: DepartmentInterface;

}