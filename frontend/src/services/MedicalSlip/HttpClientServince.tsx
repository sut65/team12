import { MedicalSlipInterface } from "../../interfaces/imedicalslip/IMedicalSlip";

const apiUrl = "http://localhost:8080";

// -------------------------------------MedicalSlip-----------------------------------------------------------------

async function GetMedicalSlipID() {
  let aid = localStorage.getItem("aid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/medicalslip/${aid}`,
        requestOptions
    )
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
async function GetManageBed() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/medicalslips`, requestOptions)
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

async function CreateManageBed(data: MedicalSlipInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/medicalslips`, requestOptions)
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

async function UpdateMedicalSlip(data: MedicalSlipInterface) {
    
  const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }

  let res = await fetch(`${apiUrl}/medicalslips`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data
          } else {
              return false
          }
      })
  return res
}

async function DeleteMedicalSlip(ID:number) {
  const requestOptions = {
      method: "DELETE",
      headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      }
  };
  
  let res = await fetch(`${apiUrl}/managebeds/${ID}`, requestOptions)
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
  
    GetManageBed,
    GetMedicalSlipID,

    CreateManageBed,
    UpdateMedicalSlip,
    DeleteMedicalSlip,

};