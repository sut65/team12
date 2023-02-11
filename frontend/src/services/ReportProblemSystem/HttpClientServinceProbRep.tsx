
import { ProblemInterface } from "../../interfaces/ReportProblem/Iproblem";
import { ProblemReportInterface } from "../../interfaces/ReportProblem/Iproblemreport";
const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val
}

// -------------------------------------ProblemReport-----------------------------------------------------------------
async function GetProblemReportID() {
  let aid = localStorage.getItem("aid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/GetProblemReport/${aid}`,
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
async function GetProblemReport() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ListProblemReport`, requestOptions)
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

/**************************************************************/
async function GetClassProb() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ListClassProb`, requestOptions)
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
async function GetNumPlace() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/ListNumPlace`, requestOptions)
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
  async function GetProblem() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/ListProblem`, requestOptions)
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
  

/**************************************************************/

async function CreateProblemReport(data: ProblemReportInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/CreateProblemReport/create`, requestOptions)
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

async function UpdateProblemReport(data: ProblemReportInterface) {
    
  const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }

  let res = await fetch(`${apiUrl}/UpdateProblemReport/update`, requestOptions)
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

async function DeleteProblemReport(ID:number) {
  const requestOptions = {
      method: "DELETE",
      headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      }
  };
  
  let res = await fetch(`${apiUrl}/DeleteProblemReport/delete/${ID}`, requestOptions)
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

// GET By ID NumPlaceByClassProb
async function GetNumPlaceByClassProb (ID: number | undefined) {
  const reqOpt = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      }
  }

  let res = await fetch(`${apiUrl}/ListNumPlaceByClassProb/get/${ID}`, reqOpt)
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
    GetProblemReport,
    GetProblemReportID,
    CreateProblemReport,
    UpdateProblemReport,
    DeleteProblemReport,
  
    GetNumPlaceByClassProb,
    GetClassProb,
    GetNumPlace,
    GetProblem,
};