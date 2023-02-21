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
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputAdornment from '@mui/material/InputAdornment';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";  //import มาหมดเเละเก็บไว้ในตัวแปร FormControl
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";  //import มาเฉพราะฟังก์ชัน LocalizationProvider

import { Schedule } from "@mui/icons-material";
import { StatusesInterface } from "../../interfaces/vitalSign/IStatus";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  createTheme,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";


import {
  ListStatuses, 
  PostVitalSign,
} from "../../services/VitalSignSystem/VitalSignsServices";
import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";

function VitalSignsCreate(){
  let theme = createTheme({ // button theme
    palette: {
        primary: {
          main: '#339966', //เขียว
        },
        secondary: {
          main: '#339999', 
        },
    },
});
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [vitalsign, setVitalsign] = React.useState<Partial<VitalSignsInterface>>(
    {
      EmployeeID: 0,
      PatientID: 0,
      StatusID: 0
    }
  );
  const [bloodPressureHigh, setBloodpressurehigh] = React.useState<string>("");
  const [bloodPressureLow, setBloodpressurelow] = React.useState<string>("");
  const [pulseRate, setPulserate] = React.useState<string>("");
  const [respirationRate, setRespirationrate] = React.useState<string>("");
  const [bodyTemperature, setBodytemperature] = React.useState<string>("");
  const [checkDate, setCheckDate] = React.useState<Date | null>(new Date());
  // const [password, setPassword] = React.useState<string>("");
  // const [address, setAddress] = React.useState<string>("");
  const [status, setStatus] = React.useState<StatusesInterface[]>([]);
  const [patient, setPatient] = React.useState<PatientInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

  const [snackBar, setSnackBar] = React.useState({
    open: false,
    error: false,
    errorMsg: ""
  })

  // service
  // get Status
  const getStatus = async () => {

    let res = await ListStatuses();
    console.log(res);
    if (res) {
      setStatus(res);
    }
  }   
  // get Patient
  const getPatient = async () => {
    let res = await ListPatient();
    console.log(res);
    if (res) {
      setPatient(res);
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
    console.log(vitalsign)

    let res = await PostVitalSign(vitalsign)
      if (res.status) {
        // setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setAlertMessage(res.message);
        setError(true);
      }
    // console.log(res)
    if(res.status){
        setTimeout(() => {
            navigator("/vitalsign")
        }, 3000)
    }
  }

  React.useEffect(() => {
    getStatus();
    getPatient();
    getEmployee();
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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof VitalSignsCreate;

    const { value } = event.target;

    setVitalsign({ ...vitalsign, [id]: value });
  };

  //text field number 
  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof VitalSignsCreate;
    const { value } = event.target;
    setVitalsign({ ...vitalsign, [id]: value === "" ? "" : Number(value) });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof vitalsign;
    setVitalsign({
      ...vitalsign,
      [name]: event.target.value,
    });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" >
        <Snackbar
              id="success"
              open={success}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
      
        <Snackbar
          id="error"
          open={error}
          autoHideDuration={3000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
  
        <Paper >
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
                color="secondary"
                gutterBottom
              >
                Record Vital Signs
              </Typography>
            </Box>
          </Box>
  
          <Divider />

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>Patient</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={vitalsign.PatientID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <option value={0} key={0}>
                    กรุณาเลือกผู้ป่วย
                  </option>
                  {patient.map((item: PatientInterface) => (
                    <option value={item.ID}>{item.FirstName + " "+item.LastName}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Blood Pressure High</FormLabel>

                <TextField
                  id="BloodPressureHigh"
                  variant="outlined"
                  type="string"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                  }}
                  size="medium"
                  placeholder="กรุณาระบุความดันโลหิตสูงสุด"
                  value={vitalsign.BloodPressureHigh || ""}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Blood Pressure Low</FormLabel>
                <TextField
                  id="BloodPressureLow"
                  variant="outlined"
                  type="string"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                  }}
                  size="medium"
                  placeholder="กรุณาระบุความดันโลหิตต่ำสุด"
                  value={vitalsign.BloodPressureLow || ""}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Pulse Rate</FormLabel>

                <TextField
                  id="PulseRate"
                  variant="outlined"
                  type="string"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                  }}
                  size="medium"
                  placeholder="กรุณาระบุอัตราการเต้นของหัวใจ"
                  value={vitalsign.PulseRate || ""}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Respiration Rate</FormLabel>
                <TextField
                  id="RespirationRate"
                  variant="outlined"
                  type="string"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                  }}
                  size="medium"
                  placeholder="กรุณาระบุอัตราการหายใจ"
                  value={vitalsign.RespirationRate || ""}
                  onChange={handleInputChangenumber}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Body Temperature</FormLabel>

                <TextField
                  id="BodyTemperature"
                  variant="outlined"
                  type="string"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">° C</InputAdornment>,
                  }}
                  size="medium"
                  placeholder="กรุณาระบุอุณหภูมิร่างกาย"
                  value={vitalsign.BodyTemperature || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            
            <Grid item xs={5}>
              <FormLabel>Status</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={vitalsign.StatusID}
                  onChange={handleChange}
                  inputProps={{
                    name: "StatusID",
                  }}
                >
                  <option value={0} key={0}>
                    กรุณาเลือกสถานะ
                  </option>
                  {status.map((item: StatusesInterface) => (
                    <option value={item.ID}>{item.Status}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
          
          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={4}>
                <Button component={RouterLink} to="/vitalsign" variant="contained" color="secondary">
                  Back
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                  style={{ float: "right" }}
                  onClick={submit}
                  variant="contained"
                  color="secondary"
                >
                  Submit
                </Button>
            </Grid>
          </Grid>

          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default VitalSignsCreate;