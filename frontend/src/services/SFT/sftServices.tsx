import { SFTInterface } from "../../interfaces/sft/ISFT";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List SFT
async function ListSFTs() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/sfts/list`, reqOpt)
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

// GET By ID SFT
async function GetSFT(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/sft/get/${ID}`, reqOpt)
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

// Create SFT
async function CreateSFT(emp:Partial<SFTInterface>) {
    let data = {

        PatientID:convertType(emp.PatientID),
        FoodTypeID: convertType(emp.FoodTypeID),
        PrincipalDiagnosisID: convertType(emp.PrincipalDiagnosisID),
        DoctorID: convertType(emp.DoctorID),
        Date: emp.Date,
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
    let res = await fetch(`${apiUrl}/sft/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}



// Update SFT
async function UpdateSFT(emp : Partial<SFTInterface>){
    let data = {
        ID:convertType(emp.ID),
        PatientID:convertType(emp.PatientID),
        FoodTypeID: convertType(emp.FoodTypeID),
        PrincipalDiagnosisID: convertType(emp.PrincipalDiagnosisID),
        DoctorID: convertType(emp.DoctorID),
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/sft/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}


// Delete SFT
async function DeleteSFT(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/sfts/delete/${ID}`, reqOpt)
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
// List Employee
async function ListEmployees() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
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

async function ListPatients() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/patients/list`, reqOpt)
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

// GET By ID Patient
async function GetPatient(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/patient/get/${ID}`, reqOpt)
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
async function ListFoodTypes() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/foodtypes/list`, reqOpt)
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
// GET By ID FoodType
async function GetFoodType(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/foodtype/get/${ID}`, reqOpt)
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

async function ListPrincipalDiagnosiss() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/principaldiagnosiss/list`, reqOpt)
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

// GET By ID PrincipalDiagnosis
async function GetPrincipalDiagnosis(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/principaldiagnosis/get/${ID}`, reqOpt)
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
// List Doc
async function ListDocs() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/msts/listdoc`, reqOpt)
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



// List PD
async function ListPD(ID: number | undefined) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    let res = await fetch(`${apiUrl}/sfts/listPD/${ID}`, reqOpt)
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




export {

    
    ListDocs,
    
    ListSFTs, 
    ListEmployees, 
    DeleteSFT, 
    CreateSFT, 
    UpdateSFT, 
    GetSFT, 
    ListPatients,
    GetFoodType,
    GetEmployee,
    GetPrincipalDiagnosis,
    ListFoodTypes, 
    GetPatient,
    ListPD,
    //GetDepartmentByRole
}