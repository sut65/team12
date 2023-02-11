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
async function GetPatient() {
    let pid = localStorage.getItem("pid");
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/patient/get/${pid}`, reqOpt)
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
async function CreatePatient(data: PatientInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/patient/create`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        //return res.data;
        return { status: true, message: res.data };
      } else {
        //return false;
        return { status: false, message: res.error };
      }
    });
  
  return res;
    
  }

// Update Patient
async function UpdatePatient(data: PatientInterface) {
    
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/patient/edit`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                //return res.data
                return { status: true, message: res.data };
            } else {
                //return false
                return { status: false, message: res.error };
            }
        })
    return res;
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
