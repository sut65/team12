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
import { ListMSTs, ListHospitals, ListPatients, CreateMST, ListEmployees, GetEmployee, GetPatient, GetHospital } from "../../services/MST/mstServices";  //เรียกservice
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
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setNurse(res);
    }
  }
  // get Doctor
  const getDoctor = async () => {
    let res = await ListEmployees();
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
  }

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
  let theme = createTheme({ // ิbutton theme
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
            บันทึกข้อมูลไม่สำเร็จ
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
                Record SFT Information
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%" }}>
            <Grid item xs={5}>
              <FormLabel>PatientID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={mst.PatientID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    กรุณาเลือกCIVผู้ป่วย
                  </MenuItem>
                  {patient.map((item: PatientInterface) => (
                    <MenuItem value={item.ID}>{item.Civ}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Hospital</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={mst.HospitalID}
                  onChange={handleChange}
                  inputProps={{
                    name: "HospitalID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    เลือกรพ.ปลายทาง
                  </MenuItem>
                  {hospital.map((item: HospitalInterface) => (
                    <MenuItem value={item.ID}>{item.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>NurseID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={mst.NurseID}
                  onChange={handleChange}
                  inputProps={{
                    name: "NurseID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    พยาบาลผู้ลงทะเบียน
                  </MenuItem>
                  {nurse.map((item: EmployeeInterface) => (
                    <MenuItem value={item.ID}>{item.ID}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Doctor</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={mst.DoctorID}
                  onChange={handleChange}
                  inputProps={{
                    name: "DoctorID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    เเพทย์ผู้ลงทะเบียน
                  </MenuItem>
                  {doctor.map((item: EmployeeInterface) => (
                    <MenuItem value={item.ID}>{item.ID}</MenuItem>
                  ))}
                </Select>
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
            <Grid item xs={5}>
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