import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    RadioGroup,
    SelectChangeEvent,
    ThemeProvider, } from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { StatusesInterface } from "../../interfaces/vitalSign/IStatus";
import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListStatuses, ListVitalsigns, PostVitalSign, GetStatus, GetVitalsign, UpdateVitalsign } from "../../services/VitalSignSystem/VitalSignsServices";
import { ListPatient, GetPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployees } from '../../services/EmployeeSystem/employeeServices'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function VitalSignsEdit() {

    let {id} = useParams();
    const navigator = useNavigate()

    // List all Database
    // Get vitalsign by id
    const [vitalsign, setVitalsign] = React.useState<Partial<VitalSignsInterface>>({})
    const getVitalsignById = async (id:string | undefined) => {
        let res = await GetVitalsign(id)
        if(res){
            setVitalsign(res)
        }
    }

    // List Status
    const [status, setStatus] = React.useState<StatusesInterface[]>([])
    const getStatus = async () => {
        let res = await ListStatuses()
        if(res){
            setStatus(res)
        }
    }

    // List patient
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    // get patient
    const getPatient = async () => {
        //let id =0;
        let res = await ListPatient();
        console.log(res);
        if (res) {
          setPatient(res);
        }
    }

    // List employee
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    // get Employee
    const getEmployee = async () => {
        //let id =0;
        let res = await ListEmployees();
        console.log(res);
        if (res) {
          setEmployee(res);
        }
    }   
    
    React.useEffect(() => {
        getStatus();
        getPatient();
        getEmployee();
        getVitalsignById(id);
      }, []);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(vitalsign)
  
        let res = await UpdateVitalsign(vitalsign)
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

    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof VitalSignsEdit;
    
        const { value } = event.target;
    
        setVitalsign({ ...vitalsign, [id]: value });
      };
    
    //handle text field number 
    const handleInputChangenumber = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof VitalSignsEdit;
        const { value } = event.target;
        setVitalsign({ ...vitalsign, [id]: value === "" ? "" : Number(value) });
    };
    
       // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof vitalsign;

        setVitalsign({
            ...vitalsign,
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
            autoHideDuration={3000} 
            onClose={handleClose} 
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
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
                            color="black"
                        >
                            แก้ไขข้อมูลสัญญาณชีพ
                        </Typography>
                    </Box>
                </Box>
                <hr />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Vital Sign</p>
                            <Select
                                native
                                value={vitalsign.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {vitalsign.ID}
                                </option>
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={10}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Patient</p>
                            <Select
                                native
                                value={vitalsign.PatientID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "PatientID"
                                }}
                                // disabled 
                            >
                                <option aria-label="None" value="">
                                เลือกผู้ป่วย
                                </option>
                                {
                                    patient.map((item: PatientInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.FirstName + " "+item.LastName}
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
                    <p>Blood Pressure High</p>

                    <TextField
                        id="BloodPressureHigh"
                        variant="outlined"
                        type="string"
                        size="medium"
                        value={vitalsign.BloodPressureHigh || ""}
                        onChange={handleInputChangenumber}
                    />
                    </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                        <p>Blood Pressure Low</p>

                        <TextField
                            id="BloodPressureLow"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={vitalsign.BloodPressureLow || ""}
                            onChange={handleInputChangenumber}
                        />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                        <p>Pulse Rate</p>

                        <TextField
                            id="PulseRate"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={vitalsign.PulseRate || ""}
                            onChange={handleInputChangenumber}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                        <p>Respiration Rate</p>

                        <TextField
                            id="RespirationRate"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={vitalsign.RespirationRate || ""}
                            onChange={handleInputChangenumber}
                        />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                        <p>Body Temperature</p>

                        <TextField
                            id="BodyTemperature"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={vitalsign.BodyTemperature || ""}
                            onChange={handleInputChange}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <p>Status</p>
                    <FormControl fullWidth variant="outlined">
                    <Select
                            native
                            value={vitalsign.StatusID}
                            onChange={handleChange}
                            size="medium"
                            inputProps={{
                                name: "StatusID"
                            }}
                        >
                        <option aria-label="None" value="">
                        เลือกสถานะ
                        </option>
                            {
                                status.map((item: StatusesInterface) =>
                                (<option value={item.ID} key={item.ID}>
                                     {item.Status}
                                </option>)
                                )
                            }
                    </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                                
           
                <Grid item xs={12} >
                        <Button component={RouterLink} to="/vitalsign" variant='contained'>
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