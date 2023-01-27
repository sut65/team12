import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}
//แปลงเป็น Float
const convertTypeToFloat = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseFloat(data) : data;
    return val;
  };

// List Vitalsign
async function ListVitalsigns() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/vitalsigns/list`, reqOpt)
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

// GET By ID Vitalsign
async function GetVitalsign(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/vitalsign/get/${ID}`, reqOpt)
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


// Create vitalSigns
async function PostVitalSign(vtr:Partial<VitalSignsInterface>) {
    let data = {
        BloodPressureHigh: vtr.BloodPressureHigh,
        BloodPressureLow: vtr.BloodPressureLow,
        PulseRate: vtr.PulseRate,
        RespirationRate: vtr.RespirationRate,
        BodyTemperature: convertTypeToFloat(vtr.BodyTemperature),
        CheckDate: vtr.CheckDate,
        // CheckDate: new Date().toJSON().split("Z").at(0)+"+07:00",
        // EmployeeID:convertType(vtr.EmployeeID),
        EmployeeID:convertType(localStorage.getItem("id") as string),
        PatientID: convertType(vtr.PatientID),
        StatusID: convertType(vtr.StatusID),
    }

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/vitalsign/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}


// Update vitalSigns
async function UpdateVitalsign(vtr : Partial<VitalSignsInterface>){
    let data = {
        BloodPressureHigh: vtr.BloodPressureHigh,
        BloodPressureLow: vtr.BloodPressureLow,
        PulseRate: vtr.PulseRate,
        RespirationRate: vtr.RespirationRate,
        BodyTemperature: convertTypeToFloat(vtr.BodyTemperature),
        CheckDate: vtr.CheckDate,
        // CheckDate: new Date().toJSON().split("Z").at(0)+"+07:00",
        EmployeeID: convertType(vtr.EmployeeID),
        PatientID: convertType(vtr.PatientID),
        StatusID: convertType(vtr.StatusID),
    }
    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/vitalsign/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}

// Delete vitalSigns
async function DeleteVitalsign(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/vitalsigns/delete/${ID}`, reqOpt)
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

// List Statuses
async function ListStatuses() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/statuses/list`, reqOpt)
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


// GET By ID Status
async function GetStatus(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/status/get/${ID}`, reqOpt)
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
export{
    ListVitalsigns,
    GetVitalsign,
    PostVitalSign,
    UpdateVitalsign,
    DeleteVitalsign,
    ListStatuses,
    // ListPatients,
    // ListEmployees, 
    GetStatus,
    // GetPatient,
    // GetEmployee, 
}