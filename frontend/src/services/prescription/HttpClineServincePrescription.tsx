import { apiUrl, convertType } from "../patient/HttpClineServincePatient";
import { PrescriptionInterface } from "../../interfaces/prescription/IPrescription";


// List Prescription
async function ListPrescription() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/prescriptions/list`, requestOptions)
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

// GET By ID Prescription
async function GetPrescription() {
    let preid = localStorage.getItem("preid");
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/prescription/get/${preid}`, reqOpt)
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


// Create Prescription
async function CreatePrescription(data: PrescriptionInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/prescription/create`, requestOptions)
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

// Update Patient
async function UpdatePrescription(pre : Partial<PrescriptionInterface>){
    let data = {
        ID: convertType(pre.ID),
        Annotation: pre.Annotation,
        ScriptTime: pre.ScriptTime,

        PatientID: convertType(pre.PatientID),
        MedicineID: convertType(pre.MedicineID),
        EmployeeID: convertType(pre.EmployeeID),
        OrderID: convertType(pre.OrderID),
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/prescription/edit`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}

// Delete Patient
async function DeletePrescriptiont(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/prescription/delet/${ID}`, reqOpt)
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

// List medicine
async function ListMedicine() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/medicine/list`, reqOpt)
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
    ListPrescription,
    GetPrescription,
    CreatePrescription,
    UpdatePrescription,
    DeletePrescriptiont,
    ListMedicine,
}