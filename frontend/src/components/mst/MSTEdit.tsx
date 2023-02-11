import {
    Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography, createTheme,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    RadioGroup,
    SelectChangeEvent,
    ThemeProvider,
} from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { HospitalInterface } from "../../interfaces/mst/IHospital";
import { MSTInterface } from "../../interfaces/mst/IMST";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListMSTs, GetMST,ListDocs,ListNurse, ListHospitals, ListPatients, CreateMST, ListEmployees, GetEmployee, GetPatient, GetHospital, UpdateMST } from "../../services/MST/mstServices";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function MSTUpdate() {

    let { id } = useParams();
    const navigator = useNavigate()

    // List all Database
    // Get mst by id
    const [mst, setMST] = React.useState<Partial<MSTInterface>>({})
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const getMSTID = async (id: string | undefined) => {
        let res = await GetMST(id)
        if (res) {
            setMST(res)
        }
    }

    // List Patient
    const [patient, setPatient] = React.useState<PatientInterface[]>([])
    const getPatient = async () => {
        let res = await ListPatients()
        if (res) {
            setPatient(res)
        }
    }

    // List Nurse
    const [nurse, setNurse] = React.useState<EmployeeInterface[]>([]);
    // get Nurse
    const getNurse = async () => {
        //let id =0;
        let res = await ListNurse();
        console.log(res);
        if (res) {
            setNurse(res);
        }
    }
    // List Doctor
    const [doctor, setDoctor] = React.useState<EmployeeInterface[]>([]);
    // get Doctor
    const getDoctor = async () => {
        //let id =0;
        let res = await ListDocs();
        console.log(res);
        if (res) {
            setDoctor(res);
        }
    }
    

    // List Hospital
    const [hospital, setHospital] = React.useState<HospitalInterface[]>([])
    const getHospital = async () => {
        let res = await ListHospitals();
        console.log(res);
        if (res) {
            setHospital(res);
        }
    }


    React.useEffect(() => {
        getMSTID(id);
        getPatient();
        getNurse();
        getDoctor();
        getHospital();
    }, []);

    //mst Create
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val
    }
    const [message, setAlertMessage] = React.useState("");
    //submit
    const submit = async () => {
        console.log(mst)
        let data = {
            
            ID: convertType(mst.ID),
            RegDateTime: new Date().toJSON().split("Z").at(0) + "+07:00",
            MSTDateTime: mst.MSTDateTime,
            HospitalID: convertType(mst.HospitalID),
            NurseID: convertType(mst.NurseID),
            DoctorID: convertType(mst.DoctorID),
            PatientID: convertType(mst.PatientID),
            Description: mst.Description,
        }
        const reqOpt = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        const apiUrl = "http://localhost:8080"

        let res = await fetch(`${apiUrl}/mst/update`, reqOpt)
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
                    }, 2000)
                }

            });
    }

    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof MSTUpdate;

        const { value } = event.target;

        setMST({ ...mst, [id]: value });
    };

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof mst;

        setMST({
            ...mst,
            [name]: event.target.value
        })
    }

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
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    แก้ไขข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
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
                            แก้ไขข้อมูลคำร้องขอย้ายโรงพยาบาล
                        </Typography>
                    </Box>
                </Box>
                <hr />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <p>MST ID</p>
                            <Select
                                native
                                value={mst.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {mst.ID}
                                </option>

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>


                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Patient</p>
                            <Select
                                native
                                value={mst.PatientID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "PatientID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    รหัสบัตรประชาชนผู้ป่วย
                                </option>
                                {
                                    patient.map((item: PatientInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Civ}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Hospital ID</p>
                            <Select
                                native
                                value={mst.HospitalID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "HospitalID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    โรงพยาบาลปลายทาง
                                </option>
                                {
                                    hospital.map((item: HospitalInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>NurseID</p>
                            <Select
                                native
                                value={mst.NurseID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "NurseID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    พยาบาลผู้ลงทะเบียน
                                </option>
                                {
                                    nurse.map((item: EmployeeInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.FirstName+ " " +item.LastName}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>DoctorID</p>
                            <Select
                                native
                                value={mst.DoctorID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "DoctorID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    เเพทย์ผู้รับรอง
                                </option>
                                {
                                    doctor.map((item: EmployeeInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.FirstName+ " " +item.LastName}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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
                    

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่ลงทะเบียน </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
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

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่ย้ายโรงพยาบาล </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
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

                    <Grid item xs={12} >
                        <Button component={RouterLink} to="/mst" variant='contained'>
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


                </Grid>
            </Paper>
        </Container>
    )
}