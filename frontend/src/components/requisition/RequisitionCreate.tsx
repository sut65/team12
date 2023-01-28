import React, { useEffect, useState } from "react";
//import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete'; //import มาหมดเเละเก็บไว้ในตัวแปร Autocomplete
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";  //import มาเฉพราะฟังก์ชัน LocalizationProvider
//สี
import { green } from "@mui/material/colors";
//import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Schedule } from "@mui/icons-material";
import { DepartmentForEquipmentsInterface } from "../../interfaces/requisitionRecord/IDepartmentForEquipment";
import { EquipmentsInterface } from "../../interfaces/requisitionRecord/IEquipment";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider, } from '@mui/material'
import {
  ListDepartmentForEquipments,
  ListEquipments,
  PostRequisition,
} from "../../services/RequisitionSystem/RequisitionServices";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { RequisitionRecordInterface } from "../../interfaces/requisitionRecord/IRequisitionRecord";

function RequisitionCreate(){
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
  });

  const [requisition, setRequisition] = React.useState<Partial<RequisitionRecordInterface>>(
    {
      EmployeeID: 0,
      EquipmentID: 0,
      DepartmentForEquipmentID: 0
    }
  );
  const [RequisitionDate, setRequisitiondate] = React.useState<Date | null>(new Date());
  const [equipment, setEquipment] = React.useState<EquipmentsInterface[]>([]);
  const [departmentforequipment, setDepartmentforequipment] = React.useState<DepartmentForEquipmentsInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  // service
  // get Equipment
  const getEquipment = async () => {

    let res = await ListEquipments();
    console.log(res);
    if (res) {
      setEquipment(res);
    }
  }   
  // get departmentforequipment
  const getDepartmentforequipment = async () => {
    let res = await ListDepartmentForEquipments();
    console.log(res);
    if (res) {
      setDepartmentforequipment(res);
    }
  }   
  // get Employee
  const getEmployee = async () => {
    //let id =0;
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setEmployee(res);
    }
  }   

  //Vital sign Create
  const navigator = useNavigate();
  //submit
  const submit = async () => {
    console.log(requisition)

    let res = await PostRequisition(requisition)
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
    // console.log(res)
    if(res.data){
        setTimeout(() => {
            navigator("/requisition")
        }, 3000)
    }
  }

  React.useEffect(() => {
    getEquipment();
    getDepartmentforequipment();
    getEmployee();
    //getDepartmentByRole();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,

    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequisitionCreate;

    const { value } = event.target;

    setRequisition({ ...requisition, [id]: value });
  };

  //text field number 
  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequisitionCreate;
    const { value } = event.target;
    setRequisition({ ...requisition, [id]: value === "" ? "" : Number(value) });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof requisition;
    setRequisition({
      ...requisition,
      [name]: event.target.value,
    });
  };
  let theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
  });

  return (
      <Container maxWidth="lg" >
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          เบิกอุปกรณ์สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          เบิกอุปกรณ์ไม่สำเร็จ
        </Alert>
      </Snackbar>
  
        <Paper>
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                Requisition Equipment and Supplies
              </Typography>
            </Box>
          </Box>
  
          <Divider />

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>Department</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={requisition.DepartmentForEquipmentID}
                  onChange={handleChange}
                  inputProps={{
                    name: "DepartmentForEquipmentID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    เลือกแผนกที่ต้องการเบิกอุปกร์ทางการเเพทย์
                  </MenuItem>
                  {departmentforequipment.map((item: DepartmentForEquipmentsInterface) => (
                    <MenuItem value={item.ID}>{item.Type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>Equipment and Supplies</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={requisition.EquipmentID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EquipmentID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    เลือกอุุปกรณ์ทางการเเพทย์
                  </MenuItem>
                  {equipment.map((item: EquipmentsInterface) => (
                    <MenuItem value={item.ID}>{item.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Quantity</FormLabel>
                <TextField
                  id="Quantity"
                  variant="outlined"
                  type="number"
                  InputProps={{inputProps:{min: 1, max : 1000}}}
                  size="medium"
                  value={requisition.Quantity || ""}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>

          </Grid>
          
          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={4}>
                <Button component={RouterLink} to="/requisition" variant="contained">
                  Back
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                  style={{ float: "right" }}
                  onClick={submit}
                  variant="contained"
                  // color="primary"
                >
                  บันทึกข้อมูล
                </Button>
            </Grid>
          </Grid>

          
        </Paper>
      </Container>
  );
}
export default RequisitionCreate;