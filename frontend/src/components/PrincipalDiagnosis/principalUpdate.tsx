import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    RadioGroup,
    SelectChangeEvent,
    ThemeProvider,
    MenuItem, } from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { LoDInterface } from "../../interfaces/principaldiagnosis/ILoD";
import { ListEmployee,  ListLoD, CreatePrincipalDiagnosis, GetPrincipalDiagnosis, UpdatePrincipalDiagnosis } from "../../services/PrincipalDiagnosis/HttpPrincipaldiagnosis";
import { ListPatient } from '../../services/patient/HttpClineServincePatient'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function PrincipalDiagnosisUpdate() {

  let {id} = useParams();
  const navigator = useNavigate()

  // List all Database
  // Get PrincipalDiagnosis by id
  const [principaldiagnosis, setPrincipalDiagnosis] = React.useState<Partial<PrincipalDiagnosisInterface>>({})
  const getPrincipalDiagnosisByID = async (id:string | undefined) => {
      let res = await GetPrincipalDiagnosis(id)
      if(res){
          setPrincipalDiagnosis(res)
      }
  }

  // List Patient
  const [patient, setPatient] = React.useState<PatientInterface[]>([])
  const getPatient = async () => {
      let res = await ListPatient()
      if(res){
          setPatient(res)
      }
  }

  // List LoD
  const [lod, setLoD] = React.useState<LoDInterface[]>([]);
  // get LoD
  const getLoD = async () => {
      //let id =0;
      let res = await ListLoD();
      console.log(res);
      if (res) {
        setLoD(res);
      }
  }

  // List Employee
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
  const getEmployee = async () => {
      let res = await ListEmployee();
      console.log(res);
      if (res) {
        setEmployee(res);
      }
    } 
  

  
  React.useEffect(() => {


      getEmployee();
      getPatient();
      getLoD();
      getPrincipalDiagnosisByID(id);
    }, []);
  React.useEffect(() => {
    setEmployee([]);
 
  }, []);

  // submit
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

  const submit = async () => {
      console.log(principaldiagnosis)

      let res = await UpdatePrincipalDiagnosis(principaldiagnosis)
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setError(true);
        setAlertMessage(res.message);
      }
      // console.log(res)
      if(res.status){
          setTimeout(() => {
              navigator("/principaldiagnosis")
          }, 3000)
      }
  }

  // handle
  const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof PrincipalDiagnosisUpdate;
  
      const { value } = event.target;
  
      setPrincipalDiagnosis({ ...principaldiagnosis, [id]: value });
    };
  
     // Change Value in Box
  const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
      const name = event.target.name as keyof typeof principaldiagnosis;

      setPrincipalDiagnosis({
          ...principaldiagnosis,
          [name]: event.target.value
      })
  }

    let theme = createTheme({ // button theme
      palette: {
        primary: {
          main: '#12a178', //เขียว
        },
        secondary: {
          main: '#edf2ff', //ขาว
        },
      },
    });

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

    // handle Password visible, invisible
      const [showPassword, setShowPassword] = React.useState(false);
    
      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
    return (
      <Container maxWidth="lg">

      <Snackbar
          id="success"
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            แก้ไขข้อมูลสำเร็จ
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

           <Paper sx={{ p: 4, pb: 10 }}>
              <Box display="flex">
                  <Box flexGrow={1}>
                      <Typography
                          component="h2"
                          variant="h6"
                          gutterBottom
                          color="#3ba299"
                      >
                          แก้ไขข้อมูลการวินิจฉัย
                      </Typography>
                  </Box>
              </Box>
              <hr />

              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <FormControl fullWidth variant='outlined'>
                          <p>PrincipalDiagnosis</p>
                          <Select
                              native
                              value={principaldiagnosis.ID}
                              onChange={handleChange}
                              size="medium"
                              inputProps={{
                                  name: "ID"
                              }}
                              disabled // lock text bok
                          >
                              <option aria-label="None" value="">
                                  {principaldiagnosis.ID}
                              </option>
                              
                          </Select>
                      </FormControl>
                  </Grid>
              </Grid>


              <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={5}>
            <FormLabel>พนักงาน</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={principaldiagnosis.EmployeeID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EmployeeID",
                  }}
                >
                  <option aria-label="None" value="">
                              เลือกพนักงาน
                              </option>
                              {
                                  employee.map((item: EmployeeInterface) =>
                                  (<option value={item.ID} key={item.ID}>
                                      {item.FirstName}
                                  </option>)
                                  )
                              }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
            <FormLabel>Patient</FormLabel>
              <FormControl fullWidth variant="outlined">
              <Select
                  native
                  value={principaldiagnosis.PatientID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <option aria-label="None" value="">
                              เลือกผู้ป่วย
                              </option>
                              {
                                  patient.map((item: PatientInterface) =>
                                  (<option value={item.ID} key={item.ID}>
                                      {item.FirstName}
                                  </option>)
                                  )
                              }
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>LoD</FormLabel>
              <FormControl fullWidth variant="outlined">
              <Select
                  native
                  value={principaldiagnosis.LoDID}
                  onChange={handleChange}
                  inputProps={{
                    name: "LoDID",
                  }}
                >
                  <option aria-label="None" value="">
                              เลือกระดับความรุนแรงของโรค
                              </option>
                              {
                                  lod.map((item: LoDInterface) =>
                                  (<option value={item.ID} key={item.ID}>
                                      {item.Disease}
                                  </option>)
                                  )
                              }
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Note</FormLabel>

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

              <Grid item xs={12} >
                      <Button component={RouterLink} to="/principaldiagnosis" variant='contained'>
                          ย้อนกลับ
                      </Button>
                      <Button
                          style={{ float: "right" }}
                          variant="contained"
                          onClick={submit}
                      >
                          บันทึกข้อมูล
                      </Button>
              </Grid>
              
          </Paper>
      </Container>
  )
}