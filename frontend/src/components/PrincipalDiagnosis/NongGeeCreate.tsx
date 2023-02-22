import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import {FormControl, Container,Paper,Grid,Box,Typography,Divider,Snackbar} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { grey } from "@mui/material/colors";
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
  import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
  import { PatientInterface } from "../../interfaces/patient/IPatient";
  import { LoDInterface } from "../../interfaces/principaldiagnosis/ILoD";
  import { ListPatient } from "../../services/patient/HttpClineServincePatient";
//   import { ListEmployee, ListDepartments, ListRoles, CreateEmployee, GetDepartmentByRole } from "../../services/EmployeeSystem/employeeServices";
import { ListPrincipalDiagnosis, ListEmployee, CreatePrincipalDiagnosis } from "../../services/PrincipalDiagnosis/HttpPrincipaldiagnosis";
import { ListDoctorPrin } from "../../services/PrincipalDiagnosis/HttpPrincipaldiagnosis";
import { ListLoD } from "../../services/PrincipalDiagnosis/HttpPrincipaldiagnosis";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function Create_save(){
  

    const [principaldiagnosis, setPrincipalDiagnosis] = React.useState<Partial<PrincipalDiagnosisInterface>>(
      {
        DoctorID: 0,
        PatientID: 0,
        LoDID: 0,
        // Note: "",
      }
    );
    const [firstName, setFirstName] = React.useState<string>("");
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [lod, setLoD] = React.useState<LoDInterface[]>([]);
    const [note, setNote] = React.useState<string>("");
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const [doctor, setDoctor] = React.useState<EmployeeInterface[]>([]);
    // service
    // get Employee
    const getEmployee = async () => {

      let res = await ListEmployee();
      console.log(res);
      if (res) {
        setEmployee(res);
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

      // get Doctor
  const getDoctorPrin= async () => {
    let res = await ListDoctorPrin();
    console.log(res);
    if (res) {
      setDoctor(res);
    }
  }

        // get Role
        const getLoD = async () => {
          let res = await ListLoD();
          console.log(res);
          if (res) {
            setLoD(res);
          }
        }   
    
    //Principal Diagnosis Create
    const navigator = useNavigate();
    //submit
    const submit = async () => {
      console.log(principaldiagnosis)

      let res = await CreatePrincipalDiagnosis(principaldiagnosis)
      
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setError(true);
        setAlertMessage(res.message);
      }
      if(res.status){
          setTimeout(() => {
              navigator("/principaldiagnosis")
          }, 3000)
      }

      
    }

    



    React.useEffect(() => {
      getEmployee();
      getPatient();
      getLoD();
      getDoctorPrin();
      //getDepartmentByRole();
    }, []);

    // useEffect(() => {
    //   setDepartment([]);
    //   getDepartmentByRole();
    // }, [employee.RoleID]);

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
  
      setPrincipalDiagnosis({ ...principaldiagnosis, [id]: value });
    };
  
    const handleChange = (event: SelectChangeEvent<number>) => {
      const name = event.target.name as keyof typeof principaldiagnosis;
      setPrincipalDiagnosis({
        ...principaldiagnosis,
        [name]: event.target.value,
      });
    };
    let theme = createTheme({
      palette: {
        primary: {
          main: '#3ba299',
        },
        secondary: {
          main: '#edf2ff',
        },
      },
    });
    
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" >
          <Snackbar
            id="success"  
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
    
          <Snackbar 
            id="error"
            open={error} 
            autoHideDuration={8000} 
            onClose={handleClose}>
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
                  Principal Diagnosis Information
                </Typography>
              </Box>
            </Box>
    
            <Divider />

            

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
              <FormLabel>แพทย์</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={principaldiagnosis.DoctorID}
                    onChange={handleChange}
                    inputProps={{
                      name: "DoctorID",
                    }}
                  >
                    <option value={0} key={0}>
                      เลือกแพทย์
                    </option>
                    {doctor.map((item: EmployeeInterface) => (
                      <option value={item.ID}>{item.FirstName + " "+item.LastName}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
              <FormLabel>ผู้ป่วย</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={principaldiagnosis.PatientID}
                    onChange={handleChange}
                    inputProps={{
                      name: "PatientID",
                    }}
                  >
                    <option value={0} key={0}>
                      เลือกผู้ป่วย
                    </option>
                    {patient.map((item: PatientInterface) => (
                      <option value={item.ID}>{item.FirstName + " "+item.LastName}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={10}>
              <FormLabel>ระดับความรุนแรงของโรค</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={principaldiagnosis.LoDID}
                    onChange={handleChange}
                    inputProps={{
                      name: "LoDID",
                    }}
                  >
                    <option value={0} key={0}>
                      เลือกระดับความรุนแรงของโรค
                    </option>
                    {lod.map((item: LoDInterface) => (
                      <option value={item.ID}>{item.Disease}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>อาการ/โรคที่เป็น</FormLabel>

                  <TextField
                    id="Note"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={principaldiagnosis.Note || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                         <FormControl fullWidth variant="outlined">
                             <p>วันที่</p>
                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                                 <DatePicker
                                     value={principaldiagnosis.Date}
                                     onChange={(newValue) => {
                                         setPrincipalDiagnosis({
                                             ...principaldiagnosis,
                                             Date: newValue,
                                         });
                                     }}
                                     renderInput={(params) => <TextField {...params} />}
                                 />
                             </LocalizationProvider>
                         </FormControl>
              </Grid>
            </Grid> */}
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={4}>
                  <Button component={RouterLink} to="/principaldiagnosis" variant="contained">
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