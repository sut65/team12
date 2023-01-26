import { EmployeeInterface } from "../../interfaces/employee/IEmployee";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List Employee
async function ListEmployees() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/employees/list`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

// GET By ID Employee
async function GetEmployee(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/employee/get/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })

    return res

}

// Create Employee
async function CreateEmployee(emp:Partial<EmployeeInterface>) {
    let data = {
        FirstName: emp.FirstName,
        LastName: emp.LastName,
        Civ: emp.Civ,
        Phone: emp.Phone,
        Email: emp.Email,
        Password: emp.Password,
        Address: emp.Address,
        RoleID:convertType(emp.RoleID),
        GenderID: convertType(emp.GenderID),
        DepartmentID: convertType(emp.DepartmentID)
    }
    
    // return JSON.stringify(data)

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/employee/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}



// Update Employee
async function UpdateEmployee(emp : Partial<EmployeeInterface>){
    let data = {
        ID:convertType(emp.ID),
        FirstName: emp.FirstName,
        LastName: emp.LastName,
        Civ: emp.Civ,
        Phone: emp.Phone,
        Email: emp.Email,
        Password: emp.Password,
        Address: emp.Address,
        RoleID:convertType(emp.RoleID),
        GenderID: convertType(emp.GenderID),
        DepartmentID: convertType(emp.DepartmentID)
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/employee/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}


// Delete Employee
async function DeleteEmployee(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/employees/delete/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

// List Role
async function ListRoles() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/roles/list`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}


// GET ALL DATA FOR Select

async function ListGenders() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/genders/list`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}


async function ListDepartments() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/departments/list`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

// GET By ID Department
async function GetDepartment(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/department/get/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })

    return res
}
// GET By ID DepartmentByRole
async function GetDepartmentByRole(ID: number | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/departmentbyrole/get/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })

    return res
}
// GET By ID Gender
async function GetGender(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/gender/get/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })

    return res

}

// GET By ID Department
async function GetRole(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/role/get/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })

    return res

}


export {
    ListEmployees, 
    ListRoles, 
    DeleteEmployee, 
    CreateEmployee, 
    UpdateEmployee, 
    GetEmployee, 
    ListDepartments, 
    ListGenders,
    GetRole,
    GetGender,
    GetDepartment,
    GetDepartmentByRole
}