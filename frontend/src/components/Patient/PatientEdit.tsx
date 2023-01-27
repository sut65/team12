import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box, Container } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { convertType, GetPatient, ListPatient, UpdatePatient } from "../../services/patient/HttpClineServincePatient";
import { GenderInterface } from "../../interfaces/employee/IGender";
import { CreatePatient } from "../../services/patient/HttpClineServincePatient";
import { ListPatientType, ListPatientRight } from "../../services/patient/HttpClineServincePatient";
import { ListGenders, ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { PatientTypeInterface } from "../../interfaces/patient/IPatientType";
import { PatientRightInterface } from "../../interfaces/patient/IPatientRight";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PatientEdit(){
    const [patient, setPatient] = useState<PatientInterface>({
      Civ: "",
      FirstName: "",
      LastName: "",
      //Age: 0,
      //Weight: 0,
      Underlying: "",
      Brithdate: new Date(),
      PatientTime: new Date(),
    });
    const [patienttype, setPatienttype] = useState<PatientTypeInterface[]>([]);
    const [patientright, setPatientright] = useState<PatientRightInterface[]>([]);
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [gender, setGender] = useState<GenderInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    

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

      const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.name);
        console.log(event.target.value);
    
        
        const name = event.target.name as keyof typeof patient;
        setPatient({
          ...patient,
          [name]: event.target.value,
        });
      };

      const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof patient;
        const { value } = event.target;
        setPatient({ ...patient, [id]: value });
      };

      const handleInputChangenumber = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof patient;
        const { value } = event.target;
        setPatient({ ...patient, [id]: value === "" ? "" : Number(value) });
      };

      const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof patient;
        setPatient({
            ...patient,
            [name]: event.target.value,
        });

    };
    const listPatient = async () => {
        let res = await GetPatient();
        if(res){
            setPatient(res);
        }
      };

    
      const listPatientType = async () => {
        let res = await ListPatientType();
        if(res){
            setPatienttype(res);
        }
      };

      const listPatientRight = async () => {
        let res = await ListPatientRight();
        if(res){
            setPatientright(res);
        }
      };

      const listGender = async () => {
        let res = await ListGenders();
        if(res){
            setGender(res);
        }
      };

      const listEmployee = async () => {
        let res = await ListEmployees();
        if(res){
            setEmployee(res);
        }
      };

      useEffect(() => {
        listPatientType();
        listPatientRight();
        listGender();
        listEmployee();
        listPatient();
      }, []);

      

    

       
      
      const submit = async () => {
         //console.log(patient)
         let data = {
          ID: convertType(patient.ID),
          Civ: patient.Civ,
          FirstName: patient.FirstName,
          LastName: patient.LastName,
          Age: convertType(patient.Age),
          Weight: convertType(patient.Weight),
          Underlying: patient.Underlying,
          Brithdate: patient.Brithdate,
          PatientTime: patient.PatientTime,
          
          PatientTypeID: convertType(patient.PatientTypeID),
          EmployeeID: convertType(localStorage.getItem("id") as string),
          PatientRightID: convertType(patient.PatientRightID),
          GenderID: convertType(patient.GenderID),
  
        };
          
          // await รอจนกว่าจะมีการทำงานตามคำสั่งเสร็จ
          let res = await UpdatePatient(data);
          if (res) {
            setSuccess(true);
          } else {
            setError(true);
          }
          console.log(data);
  }

      

      return(
        <div>
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    อัพเดตข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    อัพเดตข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5'
                }}>
                <CssBaseline />
                <Stack
                    sx={{ p: 0, m: 0, mb: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        แก้ไขข้อมูล  ผู้ป่วย  ID {patient?.ID}
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> บัตรประชาชน </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Civ"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "Civ",
                                }}
                                value={patient.Civ}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> ชื่อ </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Name"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "FirstName",
                                }}
                                value={patient.FirstName}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> นามสกุล </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Name"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "LastName",
                                }}
                                value={patient.LastName}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> อายุ </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Name"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "Age",
                                }}
                                value={patient.Age}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> น้ำหนัก </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Name"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "Weight",
                                }}
                                value={patient.Weight}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> เพศ </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={patient.GenderID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "GenderID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกเพศ
                                </option>
                                {gender.map((item: GenderInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    


                    
                    
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> ประเภทผู้ป่วย </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={patient.PatientTypeID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PatientTypeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกประเภทผู้ป่วย
                                </option>
                                {patienttype.map((item: PatientTypeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Type}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> สิทธิ์ผู้ป่วย </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={patient.PatientRightID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PatientRightID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกสิทธิ์ผู้ป่วย
                                </option>
                                {patientright.map((item: PatientRightInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Type}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography className='StyledTypography'> หมายเหตุ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete="off"
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "Underlying",
                            }}
                            value={patient.Underlying}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันเกิดผู้ป่วย </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={patient.Brithdate}
                                    onChange={(newValue) => {
                                        setPatient({
                                            ...patient,
                                            Brithdate: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    
                        
                    

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่และเวลา </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={patient.PatientTime}
                                    onChange={(newValue) => {
                                        setPatient({
                                            ...patient,
                                            PatientTime: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mt: 3 }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/patients/list"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
                    >
                        อัพเดตข้อมูล
                    </Button>
                </Stack>
            </Container>
        </div>
      );
      



}
export default PatientEdit;