import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List PrincipalDiagnosis
async function ListPrincipalDiagnosis() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

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

// List Doc
async function ListDoctorPrin() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/errecords/listdoctor`, reqOpt)
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

// Create PrincipalDiagnosis
async function CreatePrincipalDiagnosis(pd:Partial<PrincipalDiagnosisInterface>) {
    let data = {
        
        Note: pd.Note,
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
        // Date: pd.Date,
        DoctorID:convertType(pd.DoctorID),
        PatientID: convertType(pd.PatientID),
        LoDID: convertType(pd.LoDID)
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
    

    let res = await fetch(`${apiUrl}/principaldiagnosis/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data){
        return { status: true, message: res.pd };
    }else{
        return { status: false, message: res.error };
    }

       
    });
    return res

}



// Update PrincipalDiagnosis
async function UpdatePrincipalDiagnosis(pd : Partial<PrincipalDiagnosisInterface>){
    let data = {
        ID:convertType(pd.ID),
        Note: pd.Note,
        Date: pd.Date,
        DoctorID:convertType(pd.DoctorID),
        PatientID: convertType(pd.PatientID),
        LoDID: convertType(pd.LoDID)
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/principaldiagnosis/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data){
        return { status: true, message: res.pd };
    }else{
        return { status: false, message: res.error };
    }

       
    });
    return res
}


// Delete PrincipalDiagnosis
async function DeletePrincipalDiagnosis(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/principaldiagnosis/delete/${ID}`, reqOpt)
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
async function ListEmployee() {
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

// List Patient
async function ListPatient() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/patients`, reqOpt)
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

// List LoD
async function ListLoD() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/lods`, reqOpt)
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

// GET By ID LoD
async function GetLoD(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/lod/get/${ID}`, reqOpt)
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
    ListPrincipalDiagnosis,
    GetPrincipalDiagnosis,
    CreatePrincipalDiagnosis,
    UpdatePrincipalDiagnosis,
    DeletePrincipalDiagnosis,
    ListEmployee,
    GetEmployee,
    ListPatient,
    GetPatient,
    ListLoD,
    GetLoD,
    ListDoctorPrin,
}