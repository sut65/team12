import Stack from '@mui/material/Stack';
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import moment from 'moment';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function Patient() {
    const [patient, setPatient] = useState<PatientInterface[]>([]);
    useEffect(() => {
        getPatient();
    }, []);

    const getPatient = async () => {
        let res = await ListPatient();
        if (res) {
            setPatient(res);
            console.log(res)
        }
    };


    const columns: GridColDef[] = [
        { field: "ID", headerName: "ลำดับ", width: 50},
        { field: "Civ", headerName: "เลขบัตรประชาชน", width: 150, valueFormatter: (params) => params.value.Civ},
        { field: "FirstName", headerName: "ชื่อ", width: 150, valueFormatter: (params) => params.value.FirstName},
        { field: "LastName", headerName: "นามสกุล", width: 150, valueFormatter: (params) => params.value.LastName},
        { field: "Age", headerName: "อายุ", width: 150, valueFormatter: (params) => params.value.Age},        
        { field: "Weight", headerName: "น้ำหนัก", width: 150, valueFormatter: (params) => params.value.Weight},
        { field: "Underlying", headerName: "หมายเหตุ", width: 150, valueFormatter: (params) => params.value.Underlying},
        { field: "PatientType", headerName: "ประเภทผู้ป่วย", width: 150, valueFormatter: (params) => params.value.Type},
        { field: "PatientRight", headerName: "สิทธิ์ผู้ป่วย", width: 200, valueFormatter: (params) => params.value.Type},
        { field: "Brithdate", headerName: "วันเกิด", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss')},
        { field: "PatientTime", headerName: "วันที่และเวลา", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss')},
        { field: "Employee", headerName: "พยาบาล", width: 150, valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName},
        { field: "Gender", headerName: "เพศ", width: 150, valueFormatter: (params) => params.value.Name},
        {
            field: " ",
            headerName: " ",
            sortable: true,
            width: 100,
            align:"center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button component={RouterLink}
                    to="/patient/edit" 
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        localStorage.setItem("pid", row.ID);
                    }}
                    sx={{borderRadius: 20,'&:hover': {color: '#FC0000', backgroundColor: '#F9EBEB'}}}
                >
                    แก้ไข
                </Button>,
        },
];
return(
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
              รายชื่อผู้ป่วยใน
            </Typography>
          </Box>
          
          

          <Box>
            <Button
              component={RouterLink}
              to="/patient/create" 
              variant="contained"
              color="primary"
            >
              ลงทะเบียนผู้ป่วย
            </Button>
          </Box>

          

        </Box>
        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={patient}
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
export default Patient;    