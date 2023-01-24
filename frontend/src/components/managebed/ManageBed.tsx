import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

import { ManageBedInterface } from "../../interfaces/imanagebed/IManageBed";
import { GetManageBed } from "../../services/HttpClientServince";

function ManageBed() {
  const [managebeds, setManageBeds] = useState<ManageBedInterface[]>([]);

  useEffect(() => {
    getManageBeds();
  }, []);

  const getManageBeds = async () => {
    let res = await GetManageBed();
    if (res) {
        setManageBeds(res);
    } 
  };

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
      headerName: "",
      sortable: true,
      width: 80,
      align:"center",
      headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>
          <Button component={RouterLink}
              to="/managebed/delete"
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                  console.log("Employee", row.EmployeeID)
                  localStorage.setItem("aid", row.ID);
              }}
              sx={{borderRadius: 15.5,'&:hover': { backgroundColor: '#ff4081'}}}
          >
              ลบ
          </Button>,},
    
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
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
          <Box>
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
        <div style={{ height: 400, width: "120%", marginTop: "20px" }}>
          <DataGrid
            rows={managebeds}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
       
      </Container>
    </div>
  );
}

export default ManageBed;