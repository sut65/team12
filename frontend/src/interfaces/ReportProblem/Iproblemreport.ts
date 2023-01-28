import { EmployeeInterface } from "../employee/IEmployee";
import { ClassProbInterface } from "./Iclassprob";
import { NumPlaceInterface } from "./Inumplace";
import { ProblemInterface } from "./Iproblem";

export interface ProblemReportInterface {
    ID?: number;
    UserID?: number;
    ClassProbID?: number;
    NumPlaceID?: number;
    ProblemID?: number;

    Date?: Date | null;
    Comment?: string;

    User?: EmployeeInterface,
    ClassProb?: ClassProbInterface,
    NumPlace?: NumPlaceInterface,
    Problem?: ProblemInterface,
}