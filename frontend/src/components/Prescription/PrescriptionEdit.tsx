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
import { PrescriptionInterface } from "../../interfaces/prescription/IPrescription";
import { MedicineInterface } from "../../interfaces/prescription/IMedicine";
import { GetPrescription, ListDoctor, ListMedicine, UpdatePrescription } from "../../services/prescription/HttpClineServincePrescription";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PrescriptionEdit(){
    const [prescription, setPrescription] = useState<PrescriptionInterface>({
      Annotation: "",
      ScriptTime: new Date(),
    });
    const [patient, setPatient] = useState<PatientInterface[]>([]);
    const [medicine, setMedicine] = useState<MedicineInterface[]>([]);
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [order, setOrder] = useState<EmployeeInterface[]>([]);

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
    
        
        const name = event.target.name as keyof typeof prescription;
        setPrescription({
          ...prescription,
          [name]: event.target.value,
        });
      };

      const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof prescription;
        const { value } = event.target;
        setPrescription({ ...prescription, [id]: value });
      };

      const handleInputChangenumber = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof prescription;
        const { value } = event.target;
        setPrescription({ ...prescription, [id]: value === "" ? "" : Number(value) });
      };

      const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof prescription;
        setPrescription({
            ...prescription,
            [name]: event.target.value,
        });

    };
    const listPrescription = async () => {
        let res = await GetPrescription();
        if(res){
            setPrescription(res);
        }
      };

    
      const listPatient = async () => {
        let res = await ListPatient();
        if(res){
            setPatient(res);
        }
      };

      const listMedicine = async () => {
        let res = await ListMedicine();
        if(res){
            setMedicine(res);
        }
      };

      const listEmployee = async () => {
        let res = await ListEmployees();
        if(res){
            setEmployee(res);
        }
      };

      const listOrder = async () => {
        let res = await ListDoctor();
        if(res){
            setOrder(res);
        }
      };




      useEffect(() => {
        listPrescription();
        listMedicine();
        listOrder();
        listEmployee();
        listPatient();
      }, []);

      

    

       
      
      const submit = async () => {
         //console.log(patient)
         let data = {
          ID: convertType(prescription.ID),
          Annotation: prescription.Annotation,
          ScriptTime: new Date(),
          
          
          PatientID: convertType(prescription.PatientID),
          EmployeeID: convertType(localStorage.getItem("id") as string),
          MedicineID: convertType(prescription.MedicineID),
          OrderID: convertType(prescription.OrderID),
  
        };
          
          // await รอจนกว่าจะมีการทำงานตามคำสั่งเสร็จ
          let res = await UpdatePrescription(data);
          if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
          } else {
            setAlertMessage(res.message);
            setError(true);
            if(res.message == "Annotation cannot be blank"){
                setAlertMessage("กรุณากรอกข้อมูลช่องหมายเหตุ");
              }
              else if(res.message == "Annotation length is too long"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! ข้อความช่องหมายเหตุตัวอักษรเกิน 300 ตัว");
              }
              else if(res.message == "Annotation must have only character and number"){
                setAlertMessage("รูปแบบไม่ถูกต้อง! ข้อมูลช่องหมายเหตุกรองได้เฉพาะตัวอักษรแล้วตัวเลข");
              }
              else if(res.message == "patient not found"){
                setAlertMessage("กรุณาเลือกผู้ป่วย");
              }
              else if(res.message == "medicine not found"){
                setAlertMessage("กรุณาเลือกชนิดยา");
              }
              else if(res.message == "order_by not found"){
                setAlertMessage("กรุณาเลือกผู้สั่งจ่ายยา");
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
                        แก้ไขข้อมูล  ใบสั่งยา  ID {prescription?.ID}
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> ผู้ป่วย </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={prescription.PatientID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "PatientID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกผู้ป่วย
                                </option>
                                {patient.map((item: PatientInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.FirstName + " " + item.LastName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    
                    
                    

                    
                    
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> ชนิดยา </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={prescription.MedicineID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "MedicineID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกชนิดยา
                                </option>
                                {medicine.map((item: MedicineInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Drug}
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
                                    name: "Annotation",
                                }}
                                value={prescription.Annotation}
                            />
                    </Grid>

                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> ผู้สั่งยาจ่ายยา </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={prescription.OrderID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "OrderID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกผู้สั่งยาจ่ายย
                                </option>
                                {order.map((item: EmployeeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.FirstName + " " + item.LastName}
                                    </option>
                                ))}
                            </Select>
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
                        to="/prescription/list"
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
export default PrescriptionEdit;