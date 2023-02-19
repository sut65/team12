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
    const [message, setAlertMessage] = React.useState("");
    

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
          PatientTime: new Date(),
          
          PatientTypeID: convertType(patient.PatientTypeID),
          EmployeeID: convertType(localStorage.getItem("id") as string),
          PatientRightID: convertType(patient.PatientRightID),
          GenderID: convertType(patient.GenderID),
  
        };
          
          // await รอจนกว่าจะมีการทำงานตามคำสั่งเสร็จ
          let res = await UpdatePatient(data);
          if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
          } else {
            setAlertMessage(res.message);
            setError(true);
            if(res.message == "Identification Number must have only number and lenght is 13"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! หมายเลขประจำตัวประชาชนประกอบด้วยตัวเลข 13");
              }
              else if(res.message == "Identification Number cannot be blank"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! หมายเลขประจำตัวประชาชนห้ามว่าง");
              }
              else if(res.message == "FirstName cannot be blank"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! ชื่อห้ามว่าง");
              }
              else if(res.message == "FirstName must have only character"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! ชื่อต้องเป็นตัวอักษร");
              }
              else if(res.message == "LastName cannot be blank"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! นามสกุลห้ามว่าง");
              }
              else if(res.message == "LastName must have only character"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! นามสกุลต้องเป็นตัวอักษร");
              }
              else if(res.message == "Age not in range 0-122"){
                setAlertMessage("อายุไม่ถูกต้อง! อายุผู้ป่วยต้องอยุ่ในช่วงตั้งแต่ 0 ถึง 122 ปี");
              }
              else if(res.message == "Weight not in range 0-595"){
                setAlertMessage("น้ำหนักไม่ถูกต้อง! น้ำหนักผู้ป่วยต้องอยุ่ในช่วงตั้งแต่ 0 ถึง 595 ปี");
              }
              else if(res.message == "Underlying cannot be blank"){
                setAlertMessage("กรุณากรอกข้อมูลโรคประจำตัว");
              }
              else if(res.message == "Brithdate must be in the past"){
                setAlertMessage("วันเดือนปีเกิดไม่ถูกต้อง! ต้องไม่เกินวันที่ในปัจจุบัน");
              }
              else if(res.message == "patientright not found"){
                setAlertMessage("กรุณาเลือกประเภทสิทธิ์ผู้ป่วย")
              }
              else if(res.message == "patienttype not found"){
                setAlertMessage("กรุณาเลือกประเภทผู้ป่วย")
              }
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
                    {message}
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
                    {message}
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
                                id="FirstName"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "FirstName",
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)){
                                      e.preventDefault()
                                    }
                                  }}
                                value={patient.FirstName}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> นามสกุล </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="LastName"
                                variant="outlined"
                                size="small"
                                color="primary"
                                fullWidth
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "LastName",
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)){
                                      e.preventDefault()
                                    }
                                  }}
                                value={patient.LastName}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                            <Typography className='StyledTypography'> อายุ </Typography>
                            <TextField className='StyledTextField'
                                autoComplete="off"
                                id="Age"
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
                                id="Weight"
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
                            id="Underlying"
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