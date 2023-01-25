import { PatientInterface } from "../../interfaces/patient/IPatient";

const apiUrl = "http://localhost:8080";

const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List Patient
async function ListPatient() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/patients/list`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
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


// Create Patient
async function CreatePatient(par:Partial<PatientInterface>) {
    let data = {
        Civ: par.Civ,
        FirstName: par.FirstName,
        LastName: par.LastName,
        Age: convertType(par.Age),
        Weight: convertType(par.Weight),
        Underlying: par.Underlying,
        Brithdate: new Date().toJSON().split("Z").at(0)+"+07:00",
        PatientTime: new Date().toJSON().split("Z").at(0)+"+07:00",

        PatientTypeID: convertType(par.PatientTypeID),
        EmployeeID: convertType(par.EmployeeID),
        PatientRightID: convertType(par.PatientRightID),
        GenderID: convertType(par.GenderID),
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
    

    let res = await fetch(`${apiUrl}/patient/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}

// Update Patient
async function UpdatePatient(par : Partial<PatientInterface>){
    let data = {
        ID: convertType(par.ID),
        Civ: par.Civ,
        FirstName: par.FirstName,
        LastName: par.LastName,
        Age: convertType(par.Age),
        Weight: convertType(par.Weight),
        Underlying: par.Underlying,
        Brithdate: par.Brithdate,
        PatientTime: par.PatientTime,

        PatientTypeID: convertType(par.PatientTypeID),
        EmployeeID: convertType(par.EmployeeID),
        PatientRightID: convertType(par.PatientRightID),
        GenderID: convertType(par.GenderID),
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/patient/edit`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}

// Delete Patient
async function DeletePatient(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/patient/delet/${ID}`, reqOpt)
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

// List Patient_type
async function ListPatientType() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/patient/types/list`, reqOpt)
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

// List Patient_right
async function ListPatientRight() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/patient/rights/list`, reqOpt)
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
    ListPatient,
    GetPatient,
    CreatePatient,
    UpdatePatient,
    DeletePatient,
    ListPatientType,
    ListPatientRight,
    apiUrl,
    convertType,
}
