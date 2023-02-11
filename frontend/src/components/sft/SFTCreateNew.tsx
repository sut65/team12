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
import { ListSFTs, ListFoodTypes, ListDocs,ListPatients, CreateSFT, ListEmployees, GetEmployee, GetPatient, GetFoodType ,GetPrincipalDiagnosis,ListPD} from "../../services/SFT/sftServices";  //เรียกservice
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
      Description: "",
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
    let id = sft.PatientID;
    let res = await ListPD(id);
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
    let res = await ListDocs();
    console.log(res);
    if (res) {
      setDoctor(res);
    }
  }

  //LabXray Create
  const navigator = useNavigate();
  const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val
  }
  const [message, setAlertMessage] = React.useState("");
  //submit
  const submit = async () => {
    console.log(sft)
    let data = {
      Description: sft.Description,
      Date: new Date().toJSON().split("Z").at(0)+"+07:00",
      PrincipalDiagnosisID:convertType(sft.PrincipalDiagnosisID),
      DoctorID:convertType(sft.DoctorID),
      FoodTypeID:convertType(sft.FoodTypeID),
      PatientID: convertType(sft.PatientID),
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

    let res = await fetch(`${apiUrl}/sft/create`, reqOpt)
    .then((response) => response.json())
    .then((res) => {       
      console.log(res)
      if (res.data) {
        setSuccess(true);
      } else {
        setError(true);
        setAlertMessage(res.error);
      }
      if(res.data){
        setTimeout(() => {
            navigator("/sft")
        }, 2000)
      }
    });
  }

  React.useEffect(() => {
    getPatient();
    getPrincipalDiagnosis();
    getFoodType();
    getDoctor();
    //getDepartmentByRole();
  }, []);

  useEffect(() => {
    setPrincipalDiagnosis([]);
    getPrincipalDiagnosis();
  }, [sft.PatientID]);

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
                  native
                  value={sft.PatientID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <option value={0} key={0}>
                    รหัสบัตรประชาชนผู้ป่วย
                  </option>
                  {patient.map((item: PatientInterface) => (
                    <option value={item.ID}>{item.Civ}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Food Type</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                 native
                  value={sft.FoodTypeID}
                  onChange={handleChange}
                  inputProps={{
                    name: "FoodTypeID",
                  }}
                >
                  <option value={0} key={0}>
                    ประเภทอาหาร
                  </option>
                  {foodtype.map((item: FoodTypeInterface) => (
                    <option value={item.ID}>{item.FoodType}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>PrincipalDiagnosisID</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={sft.PrincipalDiagnosisID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PrincipalDiagnosisID",
                  }}
                >
                  <option value={0} key={0}>
                    ผลคำวินิจฉัย
                  </option>
                  {principaldiagnosis.map((item: PrincipalDiagnosisInterface) => (
                    <option value={item.ID}>{item.Note}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormLabel>Doctor</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={sft.DoctorID}
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

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <p>Description</p>

                  <TextField
                    id="Description"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={sft.Description || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
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