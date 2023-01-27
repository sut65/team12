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
import TableCell from "@mui/material/TableCell/TableCell";

import { ManageBedInterface } from "../../interfaces/imanagebed/IManageBed";
import { GetManageBed, DeleteManageBed } from "../../services/HttpClientServince";
import Paper from "@mui/material/Paper";

function ManageBed() {
  const [managebed, setManageBed] = useState<ManageBedInterface[]>([]);

  const [deleteID, setDeleteID] = React.useState<number>(0)
  const [openDelete, setOpenDelete] = React.useState(false);

  useEffect(() => {
    getManageBed();
  }, []);

  const getManageBed = async () => {
    let res = await GetManageBed();
    if (res) {
        setManageBed(res);
    } 
  };

  const handleDelete = async () => {
    let res = await DeleteManageBed(deleteID)
    if (res) {
        console.log(res.data)
    } else {
        console.log(res.data)
    }
    getManageBed();
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
    { field: "Bed",headerName: "หมายเลขเตียง",width: 100, valueFormatter: (params) => params.value.Number,},
    { field: "BedStatus",headerName: "สถานะเตียงผู้ป่วย",width: 120,valueFormatter: (params) => params.value.Name,},
    { field: "Patient",headerName: "รายชื่อผู้ป่วย",width: 100,valueFormatter: (params) => params.value.FirstName,},
    { field: "Hn", headerName: "HN", width: 100 ,},
    { field: "Note", headerName: "หมายเหตุ*", width: 150 ,},
    { field: "ManageDate", headerName: "วันที่และเวลา", width: 200 },
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
                to="/managebed/update"
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
              ข้อมูลการรายการเตียงผู้ป่วยใน
            </Typography>
          </Box>
          <Box style={{ height: 10, width: "18%", marginTop: "10px" }}>
            <Button
              component={RouterLink}
              to="/managebed/create"
              variant="contained"
              color="primary"
              sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#70c4bc'}}}
            >
              + เพิ่มเตียงผู้ป่วยใน
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={managebed}
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
                {`ยืนยันการลบข้อมูลเตียงผู้ป่วยหมายเลข  ${managebed.filter((emp) => (emp.ID === deleteID)).at(0)?.Bed?.Number}`}
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

export default ManageBed;