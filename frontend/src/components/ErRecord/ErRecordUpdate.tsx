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
import { ToEInterface } from '../../interfaces/errecord/IToE'
import { RoomInterface } from '../../interfaces/errecord/IRoom'
import { ListEmployee, ListToE, ListRoom, CreateErRecord, GetErRecord, UpdateErRecord, GetRoomByToE } from "../../services/ErRecord/HttpErRecord";
import { ListPatient } from '../../services/patient/HttpClineServincePatient'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ErRecordInterface } from '../../interfaces/errecord/IErRecord'

export default function ErRecordUpdate() {

  let {id} = useParams();
  const navigator = useNavigate()

  // List all Database
  // Get ErRecord by id
  const [errecord, setErRecord] = React.useState<Partial<ErRecordInterface>>({})
  const getErRecordByID = async (id:string | undefined) => {
      let res = await GetErRecord(id)
      if(res){
          setErRecord(res)
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

  // List ToE
  const [toe, setToE] = React.useState<ToEInterface[]>([]);
  // get ToE
  const getToE = async () => {
      //let id =0;
      let res = await ListToE();
      console.log(res);
      if (res) {
        setToE(res);
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
   // List ToE
   const [room, setRoom] = React.useState<RoomInterface[]>([]);
   // get ToE
   const getRoom = async () => {
       //let id =0;
       let res = await ListToE();
       console.log(res);
       if (res) {
         setToE(res);
       }
   }

   const getRoomByToE = async () => {
      //let id =0;
      let id = errecord.ToEID;
      let res = await GetRoomByToE(id);
      console.log(res);
      if (res) {
        setRoom(res);
      }
    } 

  
  React.useEffect(() => {


      getEmployee();
      getPatient();
      getToE();
      getErRecordByID(id);
      getRoom();

    }, []);
  React.useEffect(() => {
    setRoom([]);
    getRoomByToE();
  }, [errecord.ToEID]);
 


  // submit
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");


  const submit = async () => {
    console.log(errecord)

    let res = await UpdateErRecord(errecord)
    
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
    if(res.status){
        setTimeout(() => {
            navigator("/errecord")
        }, 3000)
    }

    
  }

  // handle
  const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof ErRecordUpdate;
  
      const { value } = event.target;
  
      setErRecord({ ...errecord, [id]: value });
    };
  
     // Change Value in Box
  const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
      const name = event.target.name as keyof typeof errecord;

      setErRecord({
          ...errecord,
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
                          color="primary"
                      >
                          แก้ไขข้อมูลการจองห้องพิเศษ
                      </Typography>
                  </Box>
              </Box>
              <hr />

              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <FormControl fullWidth variant='outlined'>
                          <p>ErRecord</p>
                          <Select
                              native
                              value={errecord.ID}
                              onChange={handleChange}
                              size="medium"
                              inputProps={{
                                  name: "ID"
                              }}
                              disabled // lock text bok
                          >
                              <option aria-label="None" value="">
                                  {errecord.ID}
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
                  value={errecord.EmployeeID}
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
                  value={errecord.PatientID}
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
            <FormLabel>ToE</FormLabel>
              <FormControl fullWidth variant="outlined">
              <Select
                  native
                  value={errecord.ToEID}
                  onChange={handleChange}
                  inputProps={{
                    name: "ToEID",
                  }}
                >
                  <option aria-label="None" value="">
                              เลือกระดับความรุนแรงของโรค
                              </option>
                              {
                                  toe.map((item: ToEInterface) =>
                                  (<option value={item.ID} key={item.ID}>
                                      {item.Roomtype}
                                  </option>)
                                  )
                              }
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>Room</FormLabel>
              <FormControl fullWidth variant="outlined">
              <Select
                  native
                  value={errecord.RoomID}
                  onChange={handleChange}
                  inputProps={{
                    name: "RoomID",
                  }}
                >
                  <option aria-label="None" value="">
                              เลือกห้องพิเศษ
                              </option>
                              {
                                  room.map((item: RoomInterface) =>
                                  (<option value={item.ID} key={item.ID}>
                                      {item.Roomname}
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
                <FormLabel>Description</FormLabel>

                <TextField
                  id="Description"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={errecord.Description || ""}
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
                      <Button component={RouterLink} to="/errecord" variant='contained'>
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