import { RequisitionRecordInterface } from "../../interfaces/requisitionRecord/IRequisitionRecord";

const apiUrl = "http://localhost:8080";
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}


// List requisitions
async function ListRequisitions() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/requisitionrecords/list`, reqOpt)
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

// GET By ID requisition
async function GetRequisition(ID: string | undefined | null) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/requisitionrecord/get/${ID}`, reqOpt)
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


// Create Requisition
async function PostRequisition(requisition:Partial<RequisitionRecordInterface>) {
    let data = {
        Quantity: requisition.Quantity,
        // RequisitionDate: requisition.RequisitionDate,
        RequisitionDate: new Date().toJSON().split("Z").at(0)+"+07:00",
        EmployeeID:convertType(localStorage.getItem("id") as string),
        EquipmentID: convertType(requisition.EquipmentID),
        DepartmentForEquipmentID: convertType(requisition.DepartmentForEquipmentID),
    }

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/requisitionrecord/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}


// Update Requisition
async function UpdateRequisition(requisition : Partial<RequisitionRecordInterface>){
    let data = {
        ID:convertType(requisition.ID),
        Quantity: requisition.Quantity,
        // RequisitionDate: requisition.RequisitionDate,
        RequisitionDate: new Date().toJSON().split("Z").at(0)+"+07:00",
        EmployeeID: convertType(requisition.EmployeeID),
        EquipmentID: convertType(requisition.EquipmentID),
        DepartmentForEquipmentID: convertType(requisition.DepartmentForEquipmentID),
    }
    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/requisitionrecord/update`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}

// Delete Requisition
async function DeleteRequisition(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/requisitionrecords/delete/${ID}`, reqOpt)
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

// List Equipments
async function ListEquipments() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/equipments/list`, reqOpt)
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


// GET By ID Equipment
async function GetEquipment(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/equipment/get/${ID}`, reqOpt)
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

// List DepartmentForEquipments
async function ListDepartmentForEquipments() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/departmentforequipments/list`, reqOpt)
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

// GET By ID DepartmentForEquipment
async function GetDepartmentForEquipment(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/departmentforequipment/get/${ID}`, reqOpt)
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
    ListRequisitions,
    GetRequisition,
    PostRequisition,
    UpdateRequisition,
    DeleteRequisition,
    ListDepartmentForEquipments,
    GetDepartmentForEquipment,
    ListEquipments,
    GetEquipment,
}