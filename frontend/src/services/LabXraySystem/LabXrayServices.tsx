import { LabXrayInterface } from "../../interfaces/LabXray/ILabXray";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List LabXray
async function ListLabXrays() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/labxrays/list`, reqOpt)
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

// GET By ID Labxray
async function GetLabXray(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/labxray/get/${ID}`, reqOpt)
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


// Create LabXray
// async function CreateLabXray(lab:Partial<LabXrayInterface>) {
//     let data = {
//         Description: lab.Description,
//         Pic: lab.Pic,
//         Date: new Date().toJSON().split("Z").at(0)+"+07:00",
//         LabTypeID:convertType(lab.LabTypeID),
//         DoctorID: convertType(lab.DortorID),
//         PatientID: convertType(lab.PatientID),
//     }
//     const reqOpt = {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     }
    

//     let res = await fetch(`${apiUrl}/labxray/create`, reqOpt)
//     .then((response) => response.json())
//     .then((res) => {
//         return res
//     })
//     return res

// }
async function CreateLabXray(lab:Partial<LabXrayInterface>) {
    let data = {
        Description: lab.Description,
        Pic: lab.Pic,
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
        LabTypeID:convertType(lab.LabTypeID),
        DoctorID: convertType(lab.DortorID),
        PatientID: convertType(lab.PatientID),
    }
    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/labxray/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            return { status: true, message: res.emp };
          } else {
            return { status: false, message: res.error };
          }
        });
    return res

}


// Update LabXray
async function UpdateLabXray(lab : Partial<LabXrayInterface>){
    let data = {
        Description: lab.Description,
        Pic: lab.Pic,
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
        LabTypeID:convertType(lab.LabTypeID),
        DoctorID: convertType(lab.DortorID),
        PatientID: convertType(lab.PatientID),
    }
    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/labxray/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            return { status: true, message: res.emp };
        } else {
            return { status: false, message: res.error };
        }
    });
    return res
}

// Delete LabXray
async function DeleteLabXray(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/labxrays/delete/${ID}`, reqOpt)
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

// List LabType
async function ListLabTypes() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/labtypes/list`, reqOpt)
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


// GET By ID LabType
async function GetLabType(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/labtype/get/${ID}`, reqOpt)
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
    ListLabXrays,
    GetLabType,
    ListLabTypes,
    DeleteLabXray,
    CreateLabXray,
    GetLabXray,
    UpdateLabXray,
}