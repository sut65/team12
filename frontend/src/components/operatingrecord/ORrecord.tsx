import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

import { ORrecordInterface } from "../../interfaces/OperatingRecord/Iorrecord";
import { GetORrecord, DeleteORrecord } from "../../services/ORrecordSystem/HttpClientServinceOR";
import Paper from "@mui/material/Paper";

function ORrecord() {
  const [ORrecord, setORrecord] = useState<ORrecordInterface[]>([]);

  const [deleteID, setDeleteID] = React.useState<number>(0)
  const [openDelete, setOpenDelete] = React.useState(false);

  useEffect(() => {
    getORrecord();
  }, []);

  const getORrecord = async () => {
    let res = await GetORrecord();
    if (res) {
        setORrecord(res);
    } 
  };

  const handleDelete = async () => {
    let res = await DeleteORrecord(deleteID)
    if (res) {
        console.log(res.data)
    } else {
        console.log(res.data)
    }
    getORrecord();
    setOpenDelete(false)
  }

  const handleDialogDeleteOpen = (ID: number) => {
    setDeleteID(ID)
    setOpenDelete(true)
  }

  const handleDialogDeleteclose = () => {
      setOpenDelete(false)
      setTimeout(() => {
          setDeleteID(0)
      }, 400)
  } 

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    { field: "User",headerName: "ผู้บันทึก",width: 120, valueFormatter: (params) => params.value.FirstName,},
    { field: "Patient",headerName: "ผู้ป่วย",width: 120, valueFormatter: (params) => params.value.FirstName,},
    { field: "OperatingRoom",headerName: "ห้องผ่าตัด",width: 100, valueFormatter: (params) => params.value.ORname,},
    { field: "Specialist",headerName: "สาขาเฉพาะทาง",width: 200, valueFormatter: (params) => params.value.SpclistName,},
    { field: "Doctor",headerName: "แพทย์ผ่าตัด",width: 120, valueFormatter: (params) => params.value.FirstName,},
    { field: "SurgeryState",headerName: "สถานะเข้าผ่าตัด",width: 120, valueFormatter: (params) => params.value.StateName, },
    { field: "SurgeryType",headerName: "ประเภทการผ่าตัด",width: 80, valueFormatter: (params) => params.value.TypeName, },
    { field: "SurgeryStart",headerName: "เวลาเริ่มการผ่าตัด",width: 200, valueFormatter: (params) => params.value.SurgeryStart, },
    { field: "SurgeryEnd",headerName: "เวลาสิ้นสุดการผ่าตัด",width: 200, valueFormatter: (params) => params.value.SurgeryEnd, },
    { field: "StaffReciving",headerName: "เจ้าหน้าที่รับผู้ป่วย",width: 120, valueFormatter: (params) => params.value.FirstName, },
    { field: "StaffReturing",headerName: "เจ้าหน้าที่ส่งผู้ป่วย",width: 120, valueFormatter: (params) => params.value.FirstName, },
    { field: "OperatingResult", headerName: "ผลการผ่าตัด*", width: 150 ,},
    { field: "Note", headerName: "หมายเหตุ", width: 150 ,},

    {
      field: "",
      headerName: "Delete",
      sortable: true,
      width: 80,
      align:"center",
      headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>           
                  <Button variant='contained' size="small" color='error' onClick={() => { 
                    handleDialogDeleteOpen(row.ID)}}
                  sx={{borderRadius: 15.5,'&:hover': { backgroundColor: '#ff4081'}}}>ลบ
                  </Button>,
      },
      {
        field: " ",
        headerName: "Update",
        sortable: true,
        width: 100,
        align:"center",
        headerAlign: "center",
        renderCell: ({ row }: Partial<GridRowParams>) =>
            <Button component={RouterLink}
                to="/orrecord/update"
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                    localStorage.setItem("aid", row.ID);
                }}
                sx={{borderRadius: 2,'&:hover': {color: '#fffdeb', backgroundColor: '#598e89'}}}
            >
                แก้ไข
            </Button>,
    },
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Paper style={{ height: 400, width: "120%", marginTop: "40px" }}>
        <Box
          display="flex"
          sx={{
            marginLeft: 2,
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h3"
              variant="h6"
              color="primary"
              gutterBottom
            >
            ข้อมูลบันทึกเข้าใช้ห้องผ่าตัด
            </Typography>
          </Box>
          <Box style={{ height: 15, width: "25%", marginTop: "12px" }}>
            <Button
              component={RouterLink}
              to="/orrecord/create"
              variant="contained"
              color="primary"
              sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#70c4bc'}}}
            >
              + เพิ่มบันทึกเข้าใช้ห้องผ่าตัด
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={ORrecord}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        <Dialog
          open={openDelete}
          onClose={handleDialogDeleteclose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                
            </DialogTitle>
            
            <DialogActions>
                
                <Button variant='contained'color='error' onClick={handleDelete}>
                    ยืนยัน
                </Button>
                <Button variant='outlined' onClick={handleDialogDeleteclose}>
                  ยกเลิก
                </Button>
            </DialogActions>

      </Dialog>
      </Paper>
      </Container>
      
    </div>
  );
}

export default ORrecord;