import Stack from '@mui/material/Stack';
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import moment from 'moment';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid, GridRowParams, GridRenderCellParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrescriptionDelete from './PrescriptionDelete';
import { ListPrescription } from '../../services/prescription/HttpClineServincePrescription';
import { PrescriptionInterface } from '../../interfaces/prescription/IPrescription';




function Prescription() {
    const [prescription, setPrescription] = useState<PrescriptionInterface[]>([]);
    useEffect(() => {
        getPrescription();
    }, []);

    const getPrescription = async () => {
        let res = await ListPrescription();
        if (res) {
            setPrescription(res);
            console.log(res)
        }
    };


    const columns: GridColDef[] = [
        { field: "ID", headerName: "ลำดับ", width: 50},
        { field: "Patient", headerName: "ผู้ป่วย", width: 150, valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName},
        { field: "Medicine", headerName: "ชื่อยา", width: 150, valueFormatter: (params) => params.value.Drug},
        { field: "Annotation", headerName: "หมายเหตุ", width: 250, valueFormatter: (params) => params.value.Annotation},
        { field: "Order", headerName: "ผู้สั่งยา", width: 150, valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName},
        { field: "Employee", headerName: "เภสัชกร", width: 150, valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName},
        { field: "ScriptTime", headerName: "วันและเวลา", width: 200, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss')},
        {
            field: " ",
            headerName: " ",
            sortable: true,
            width: 100,
            align:"center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button component={RouterLink}
                    to="/prescription/edit"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        localStorage.setItem("preid", row.ID);
                    }}
                    sx={{borderRadius: 20,'&:hover': {color: '#FC0000', backgroundColor: '#F9EBEB'}}}
                >
                    แก้ไข
                </Button>,
        },
        {
            field: "",
            align: "center",
            headerAlign: "center",
            width: 85,
            renderCell: (params: GridRenderCellParams<any>) => {
              return <PrescriptionDelete params={params.row.ID} />;
            },
            sortable: false,
            description: "ลบ",
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
              รายรายการใบสั่งยา
            </Typography>
          </Box>
          
          

          <Box>
            <Button
              component={RouterLink}
              to="/prescription/create" 
              variant="contained"
              color="primary"
            >
            ออกใบสั่งยา
            </Button>
          </Box>


        </Box>
        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={prescription}
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
export default Prescription;    