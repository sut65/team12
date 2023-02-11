import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { FormControl, Container, Paper, Grid, Box, Typography, Divider, Snackbar } from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

import { MSTInterface } from "../../interfaces/mst/IMST";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { HospitalInterface } from "../../interfaces/mst/IHospital";
import { ListMSTs,ListDocs,ListNurse, ListHospitals, ListPatients, CreateMST, ListEmployees, GetEmployee, GetPatient, GetHospital } from "../../services/MST/mstServices";  //เรียกservice
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Create_save() {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [patient, setPatient] = React.useState<PatientInterface[]>([]);
  const [mst, setMST] = React.useState<Partial<MSTInterface>>(
    { 
      Description: "",
      RegDateTime: new Date(),
      MSTDateTime: new Date(),
    }
  );
  const [nurse, setNurse] = React.useState<EmployeeInterface[]>([]);
  const [doctor, setDoctor] = React.useState<EmployeeInterface[]>([]);
  const [hospital, setHospital] = React.useState<HospitalInterface[]>([])
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  // service
  // get Patient
  const getPatient = async () => {

    let res = await ListPatients();
    console.log(res);
    if (res) {
      setPatient(res);
    }
  }
  // get Nurse
  const getNurse = async () => {
    let res = await ListNurse();
    console.log(res);
    if (res) {
      setNurse(res);
    }
  }
  // get Doctor
  const getDoctor = async () => {
    let res = await ListDocs();
    console.log(res);
    if (res) {
      setDoctor(res);
    }
  }
  // get Hospital
  const getHospital = async () => {
    //let id =0;
    let res = await ListHospitals();
    console.log(res);
    if (res) {
      setHospital(res);
    }
  }
  /*const getDepartmentByRole = async () => {
    //let id =0;
    let id = employee.RoleID;
    let res = await GetDepartmentByRole(id);
    console.log(res);
    if (res) {
      setDepartment(res);
    }
  }  */

/*
  //MST Create
  const navigator = useNavigate();
  //submit
  const submit = async () => {
    console.log(mst)

    let res = await CreateMST(mst)
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
    // console.log(res)
    if (res.data) {
      setTimeout(() => {
        navigator("/mst")
      }, 3000)
    }
  }*/

  //MST Create
  const navigator = useNavigate();
  const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val
  }
  const [message, setAlertMessage] = React.useState("");
  //submit
  const submit = async () => {
    console.log(mst)
    let data = {
      RegDateTime: new Date().toJSON().split("Z").at(0)+"+07:00",
      MSTDateTime: mst.MSTDateTime,
      HospitalID:convertType(mst.HospitalID),
      NurseID:convertType(mst.NurseID),
      DoctorID:convertType(mst.DoctorID),
      PatientID: convertType(mst.PatientID),
      Description: mst.Description,
    }
  const reqOpt = {
    method: "POST",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    }
    const apiUrl = "http://localhost:8080"

    //let res = await CreateMST(mst)
    let res = await fetch(`${apiUrl}/mst/create`, reqOpt)
    .then((response) => response.json())
      .then((res) => {       
        console.log(res)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
    // console.log(res)
    if (res.data) {
      setTimeout(() => {
        navigator("/mst")
      }, 3000)
    }
  });}


  React.useEffect(() => {
    getPatient();
    getNurse();
    getDoctor();
    getHospital();
    //getDepartmentByRole();
  }, []);

  /*useEffect(() => {
    setDepartment([]);
    getDepartmentByRole();
  }, [employee.RoleID]);*/

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
    const id = event.target.id as keyof typeof Create_save;

    const { value } = event.target;

    setMST({ ...mst, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof mst;
    setMST({
      ...mst,
      [name]: event.target.value,
    });
  };
  let theme = createTheme({ // button theme
    palette: {
      primary: {
        main: "#009688",
      },
      secondary: {
        main: "#009688"
      },
      text: {
        primary: "#008573",
        secondary: "#000000"
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" >
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>

        <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
              {message}
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
                color="text"
                gutterBottom
              >
                Record MST Information
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
            <Grid item xs={5}>
              <FormLabel>PatientID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={mst.PatientID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <option value={0} key={0}>
                    กรุณาเลือกCIVผู้ป่วย
                  </option>
                  {patient.map((item: PatientInterface) => (
                    <option value={item.ID}>{item.Civ}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Hospital</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={mst.HospitalID}
                  onChange={handleChange}
                  inputProps={{
                    name: "HospitalID",
                  }}
                >
                  <option value={0} key={0}>
                    เลือกรพ.ปลายทาง
                  </option>
                  {hospital.map((item: HospitalInterface) => (
                    <option value={item.ID}>{item.Name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>NurseID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={mst.NurseID}
                  onChange={handleChange}
                  inputProps={{
                    name: "NurseID",
                  }}
                >
                  <option value={0} key={0}>
                    พยาบาลผู้ลงทะเบียน
                  </option>
                  {nurse.map((item: EmployeeInterface) => (
                    <option value={item.ID}>{item.FirstName+ " " +item.LastName}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Doctor</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={mst.DoctorID}
                  onChange={handleChange}
                  inputProps={{
                    name: "DoctorID",
                  }}
                >
                  <option value={0} key={0}>
                    เเพทย์ผู้ลงทะเบียน
                  </option>
                  {doctor.map((item: EmployeeInterface) => (
                    <option value={item.ID}>{item.FirstName+ " " +item.LastName}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                  <p>Description</p>

                  <TextField
                    id="Description"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={mst.Description || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
            <Grid item xs={10}>
              <FormLabel>DateTime</FormLabel>
              <FormControl fullWidth variant="outlined">
                <p>วันที่ลงทะเบียน</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={mst.RegDateTime}
                    onChange={(newValue) => {
                      setMST({
                        ...mst,
                        RegDateTime: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <p>วันที่ย้ายโรงพยาบาล</p>
                {/* input from roomid andthen search booking where roomid and get start\stop day in recorded   */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={mst.MSTDateTime}
                    onChange={(newValue) => {
                      setMST({
                        ...mst,
                        MSTDateTime: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
            <Grid item xs={4}>
              <Button component={RouterLink} to="/mst" variant="contained">
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
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
export default Create_save;