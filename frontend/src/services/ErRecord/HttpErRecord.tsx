import { ErRecordInterface } from "../../interfaces/errecord/IErRecord";
const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List ErRecord
async function ListErRecord() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/errecords/list`, reqOpt)
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

// GET By ID ErRecord
async function GetErRecord(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/errecord/get/${ID}`, reqOpt)
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

// Create ErRecord
async function CreateErRecord(errec:Partial<ErRecordInterface>) {
    let data = {

        // Price: errec.Price,
        NurseID:convertType(errec.NurseID),
        PatientID: convertType(errec.PatientID),
        ToEID:convertType(errec.ToEID),
        RoomID: convertType(errec.RoomID),
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
        Description: errec.Description,
      
    }
    // console.log(data)
    // return JSON.stringify(data)

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/errecord/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data){
        return { status: true, message: res.errec };
    }else{
        return { status: false, message: res.error };
    }

       
    });
    return res
}



// Update ErRecord
async function UpdateErRecord(errec : Partial<ErRecordInterface>){
    let data = {
        ID:convertType(errec.ID),
        // Price: errec.Price,
        NurseID:convertType(errec.NurseID),
        PatientID: convertType(errec.PatientID),
        ToEID:convertType(errec.ToEID),
        RoomID: convertType(errec.RoomID),
        Description: errec.Description,
        Date: new Date().toJSON().split("Z").at(0)+"+07:00"
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/errecord/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if (res.data){
        return { status: true, message: res.errec };
    }else{
        return { status: false, message: res.error };
    }

       
    });
    return res
}


// Delete ErRecord
async function DeleteErRecord(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/errecord/delete/${ID}`, reqOpt)
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

// List Nurse
async function ListNurseErRecord() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/errecords/listnurse`, reqOpt)
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
//     // List ToE
// async function ListToE() {
//     const reqOpt = {
//         method: "GET",
//         header: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         }
//     }
//     let res = await fetch(`${apiUrl}/toes/list`, reqOpt)
//     .then((response) => response.json())
//     .then((res) => {
//         if(res.data){
//             return res.data
//         } else{
//             return false
//         }
//     })
//     return res
// }

// List ToE
async function ListToE() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/toes/list`, reqOpt)
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


// GET By ID ToE
async function GetToE(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/toe/get/${ID}`, reqOpt)
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

    // List Room
async function ListRoom() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/rooms/list`, reqOpt)
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

// GET By ID Room
async function GetRoom(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/room/get/${ID}`, reqOpt)
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
    // GET By ID RoomByToE
async function GetRoomByToE(ID: number | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/roombytoe/get/${ID}`, reqOpt)
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
    ListErRecord,
    GetErRecord,
    CreateErRecord,
    UpdateErRecord,
    DeleteErRecord,
    ListEmployee, 
    GetEmployee,
    ListPatient,
    GetPatient,
    ListToE,
    GetToE,
    ListRoom,
    GetRoomByToE,
    GetRoom,
    ListNurseErRecord
    
    
}