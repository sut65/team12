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
import moment from 'moment';

import { MedicalSlipInterface } from "../../interfaces/imedicalslip/IMedicalSlip";
import { ListMedicalSlip , DeleteMedicalSlip } from "../../services/MedicalSlip/HttpClientServince";
import Paper from "@mui/material/Paper";

function MedicalSlip() {
  const [medicalslip, setMedicalSlip] = useState<MedicalSlipInterface[]>([]);

  const [deleteID, setDeleteID] = React.useState<number>(0)
  const [openDelete, setOpenDelete] = React.useState(false);

  useEffect(() => {
    getMedicalSlip();
  }, []);

  const getMedicalSlip = async () => {
    let res = await ListMedicalSlip();
    if (res) {
        setMedicalSlip(res);
    } 
  };

  const handleDelete = async () => {
    let res = await DeleteMedicalSlip(deleteID)
    if (res) {
        console.log(res.data)
    } else {
        console.log(res.data)
    }
    getMedicalSlip();
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
    { field: "LabXray",headerName: "Lab-Xray ",width: 100, valueFormatter: (params) => params.value.ID,},
    { field: "ORrecord",headerName: "ห้องผ่าตัด",width: 100,valueFormatter: (params) => params.value.ID,},
    { field: "Prescription",headerName: "หมายเลขใบสั่งยา",width: 120,valueFormatter: (params) => params.value.ID,},
    { field: "Total", headerName: "จำนวนค่ารักษา", width: 130, valueFormatter: (params) => params.value.Total},
    { field: "Note", headerName: "หมายเหตุ*", width: 150 ,},
    { field: "MedicalDate", headerName: "วันที่ออกบิล", width: 230 ,valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss')},
    {
      field: "",
      headerName: "",
      sortable: true,
      width: 80,
      align:"center",
      headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>
            
                  <Button variant='contained' size="small" color='error' onClick={() => { 
                  localStorage.setItem("aid", row.ID);
                    handleDialogDeleteOpen(row.ID)}}
                  sx={{borderRadius: 15.5,'&:hover': { backgroundColor: '#ff4081'}}}>ลบ
                  </Button>,
      },
      
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Paper style={{ height: 459, width: "120%", marginTop: "20px" }}>
        <Box
          display="flex"
          sx={{
            marginLeft: 2,
            marginTop: 2
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการรายการบันทึกค่ารักษา
            </Typography>
          </Box>
          <Box style={{ height: 10, width: "18%", marginTop: "10px" }}>
            <Button
              component={RouterLink}
              to="/medicalslip/create"
              variant="contained"
              color="primary"
              sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#70c4bc'}}}
            >
              + บันทึกค่ารักษา
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={medicalslip}
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
                {`ยืนยันการลบข้อมูลใบเสร็จค่ารักษาหมายเลข  ${medicalslip.filter((emp) => (emp.ID === deleteID)).at(0)?.ID}`}
            </DialogTitle>
            
            <DialogActions>
                
                <Button variant='contained'color='error' onClick={handleDelete}autoFocus>
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

export default MedicalSlip;