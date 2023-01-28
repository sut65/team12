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
import { FoodTypeInterface } from "../../interfaces/sft/IFoodType";
import { SFTInterface } from "../../interfaces/sft/ISFT";
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GetSFT,UpdateSFT,ListSFTs, ListFoodTypes, ListPatients, CreateSFT, ListEmployees, GetEmployee, GetPatient, GetFoodType ,GetPrincipalDiagnosis,ListPrincipalDiagnosiss} from "../../services/SFT/sftServices";
export default function SFTUpdate() {

    let { id } = useParams();
    const navigator = useNavigate()

    // List all Database
    // Get sft by id
    const [sft, setSFT] = React.useState<Partial<SFTInterface>>({})
    const getSFTID = async (id: string | undefined) => {
        let res = await GetSFT(id)
        if (res) {
            setSFT(res)
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

    // List PrincipalDiagnosiss
    const [principaldiagnosis, setPrincipalDiagnosis] = React.useState<EmployeeInterface[]>([]);
    // get PrincipalDiagnosiss
    const getPrincipalDiagnosis = async () => {
        //let id =0;
        let res = await ListPrincipalDiagnosiss();
        console.log(res);
        if (res) {
            setPrincipalDiagnosis(res);
        }
    }
    // List FoodType
    const [foodtype, setFoodType] = React.useState<EmployeeInterface[]>([]);
    // get PrincipalDiagnosiss
    const getFoodType = async () => {
        //let id =0;
        let res = await ListFoodTypes();
        console.log(res);
        if (res) {
            setFoodType(res);
        }
    }
    // List Doctor
    const [doctor, setDoctor] = React.useState<EmployeeInterface[]>([]);
    // get Doctor
    const getDoctor = async () => {
        //let id =0;
        let res = await ListEmployees();
        console.log(res);
        if (res) {
            setDoctor(res);
        }
    }
    


    React.useEffect(() => {
        getSFTID(id);
        getPatient();
        getPrincipalDiagnosis();
        getFoodType();
        getDoctor();
    }, []);
    /*React.useEffect(() => {
      setDepartment([]);
      getDepartmentByRole();
    }, [employee.RoleID]);*/

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const submit = async () => {
        console.log(sft)

        let res = await UpdateSFT(sft)
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

    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof SFTUpdate;

        const { value } = event.target;

        setSFT({ ...sft, [id]: value });
    };

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof sft;

        setSFT({
            ...sft,
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
                    แก้ไขข้อมูลไม่สำเร็จ
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
                            แก้ไขข้อมูลเเจ้งรายการอาหารผู้ป่วย
                        </Typography>
                    </Box>
                </Box>
                <hr />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <p>SFT ID</p>
                            <Select
                                native
                                value={sft.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {sft.ID}
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
                                value={sft.PatientID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "PatientID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกเพศ
                                </option>
                                {
                                    patient.map((item: PatientInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.ID}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>PrincipalDiagnosiss ID</p>
                            <Select
                                native
                                value={sft.PrincipalDiagnosisID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "HospitalID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    เลือกโรงพยาบาล
                                </option>
                                {
                                    principaldiagnosis.map((item: PrincipalDiagnosisInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.ID}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant='outlined'>
                            <p>FoodTypeID</p>
                            <Select
                                native
                                value={sft.FoodTypeID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "FoodTypeID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    พยาบาลผู้ลงทะเบียน
                                </option>
                                {
                                    foodtype.map((item: FoodTypeInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.ID}
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
                                value={sft.DoctorID}
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
                                        {item.ID}
                                    </option>)
                                    )
                                }
                            </Select>
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

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> Date </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
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
            </Paper>
        </Container>
    )
}