import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { PatientTypeInterface } from "../../interfaces/patient/IPatientType";
import { PatientRightInterface } from "../../interfaces/patient/IPatientRight";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { GenderInterface } from "../../interfaces/employee/IGender";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListPatientType, ListPatientRight, ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListGenders, ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { convertType } from "../../services/patient/HttpClineServincePatient";
import { CreatePatient } from "../../services/patient/HttpClineServincePatient";
import { Box, Container } from "@mui/system";
import { Divider, FormControl, Grid, Paper, Snackbar, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PrescriptionInterface } from "../../interfaces/prescription/IPrescription";
import { MedicineInterface } from "../../interfaces/prescription/IMedicine";
import { CreatePrescription, ListDoctor, ListMedicine } from "../../services/prescription/HttpClineServincePrescription";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PrescriptionCreate(){
    const [prescription, setPrescription] = useState<Partial<PrescriptionInterface>>({
        ScriptTime: new Date(),
    });
    const [patient, setPatient] = useState<PatientInterface[]>([]);
    const [medicine, setMedicine] = useState<MedicineInterface[]>([]);
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [order, setOrder] = useState<EmployeeInterface[]>([]);

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
        listPatient();
        listMedicine();
        //listEmployee();
        listOrder();
      }, []);

      

    

       
      
      const submit = async () => {
         //console.log(patient)
         let data = {
          Annotation: prescription.Annotation,
          ScriptTime: prescription.ScriptTime,
          
          PatientID: convertType(prescription.PatientID),
          MedicineID: convertType(prescription.MedicineID),
          EmployeeID: convertType(localStorage.getItem("id") as string),
          OrderID: convertType(prescription.OrderID),
  
        };
          
          // await รอจนกว่าจะมีการทำงานตามคำสั่งเสร็จ
          let res = await CreatePrescription(data);
          if (res) {
            setSuccess(true);
          } else {
            setError(true);
          }
          console.log(data);
  }

      

      return(
        <Container maxWidth="md">
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert 
              onClose={handleClose} severity="success">บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>

          <Snackbar 
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert 
              onClose={handleClose} severity="error">บันทึกข้อมูลไม่สำเร็จ 
            </Alert>
          </Snackbar>

          <Paper>
            <Box display="flex" sx={{marginTop: 2, }}>  
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                ออกใบสั่งยา
                </Typography>
              </Box>       
            </Box>
            <Divider>
              <Grid container spacing={3} sx={{ padding: 2 }}>

              <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <p>รายชื่อผู้ป่วย</p>
                    <Select native value={prescription.PatientID + ""} onChange={handleChange} inputProps={{name: "PatientID", }}>
                    <option aria-label="None" value="">
                        เลือกผู้ป่วย
                      </option>
                      {patient.map((item: PatientInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {(item.FirstName) +" " +(item.LastName)}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
          </Grid>

          <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>ยา</p>
                    <Select native value={prescription.MedicineID + ""} onChange={handleChange} inputProps={{name: "MedicineID", }}>
                      <option aria-label="None" value="0">
                        เลือกยา
                      </option>
                      {medicine.map((item: MedicineInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Drug}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
        
        
        
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเหตุ</p>
              <TextField
                id="Annotation"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="หมายเหตุ"
                value={prescription.Annotation || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>    

        <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>ผู้สั่งจ่ายยา</p>
                    <Select native value={prescription.OrderID + ""} onChange={handleChange} inputProps={{name: "OrderID", }}>
                    <option aria-label="None" value="">
                        เลือกผู้สั่งจ่ายยา
                      </option>
                      {order.map((item: EmployeeInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {(item.FirstName) +" " +(item.LastName)}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
          </Grid>
          
          
          
          
          <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>วันที่และเวลา</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={prescription.ScriptTime}
                        onChange={(newValue) => {
                          setPrescription({
                            ...prescription,
                            ScriptTime: newValue,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>   


          

          
                

            

               
                                 

                

                <Grid item xs={12}>
                  <Button component={RouterLink} to="/prescription/list" variant="contained" color="inherit">
                    กลับ
                  </Button>
                  <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success">
                    ออกใบสั่งยา
                  </Button>
                </Grid>

                

                



              </Grid>
            </Divider>
          </Paper> 

        </Container>
      );
      



}

export default PrescriptionCreate;