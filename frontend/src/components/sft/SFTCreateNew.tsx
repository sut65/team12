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
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import { SFTInterface } from "../../interfaces/sft/ISFT";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { FoodTypeInterface } from "../../interfaces/sft/IFoodType";
import { ListSFTs, ListFoodTypes, ListPatients, CreateSFT, ListEmployees, GetEmployee, GetPatient, GetFoodType ,GetPrincipalDiagnosis,ListPrincipalDiagnosiss} from "../../services/SFT/sftServices";  //เรียกservice
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
  const [principaldiagnosis, setPrincipalDiagnosis] = React.useState<PrincipalDiagnosisInterface[]>([])
  const [foodtype, setFoodType] = React.useState<FoodTypeInterface[]>([]);
  const [doctor, setDoctor] = React.useState<EmployeeInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [sft, setSFT] = React.useState<Partial<SFTInterface>>(
    {
      Date: new Date(),
    }
  );
  // service
  // get Patient
  const getPatient = async () => {

    let res = await ListPatients();
    console.log(res);
    if (res) {
      setPatient(res);
    }
  }
  // get PrincipalDiagnosis
  const getPrincipalDiagnosis = async () => {
    let res = await ListPrincipalDiagnosiss();
    console.log(res);
    if (res) {
      setPrincipalDiagnosis(res);
    }
  }
  // get FoodType
  const getFoodType = async () => {
    //let id =0;
    let res = await ListFoodTypes();
    console.log(res);
    if (res) {
      setFoodType(res);
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
  

  //SFT Create
  const navigator = useNavigate();
  //submit
  const submit = async () => {
    console.log(sft)

    let res = await CreateSFT(sft)
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
    // console.log(res)
    if (res.data) {
      setTimeout(() => {
        navigator("/sft")
      }, 3000)
    }
  }

  React.useEffect(() => {
    getPatient();
    getPrincipalDiagnosis();
    getFoodType();
    getDoctor();
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

    setSFT({ ...sft, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof sft;
    setSFT({
      ...sft,
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
                color="primary"
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
                  value={sft.PatientID}
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
              <FormLabel>Food Type</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={sft.FoodTypeID}
                  onChange={handleChange}
                  inputProps={{
                    name: "FoodTypeID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    FoodType
                  </MenuItem>
                  {foodtype.map((item: FoodTypeInterface) => (
                    <MenuItem value={item.ID}>{item.FoodType}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>PrincipalDiagnosisID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={sft.PrincipalDiagnosisID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PrincipalDiagnosisID",
                  }}
                >
                  <MenuItem value={0} key={0}>
                    พยาบาลผู้ลงทะเบียน
                  </MenuItem>
                  {principaldiagnosis.map((item: PrincipalDiagnosisInterface) => (
                    <MenuItem value={item.ID}>{item.ID}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Doctor</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={sft.DoctorID}
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
                <p>วันที่และเวลา</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={sft.Date}
                    onChange={(newValue) => {
                      setSFT({
                        ...sft,
                        Date: newValue,
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
              <Button component={RouterLink} to="/sft" variant="contained">
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