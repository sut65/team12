import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { PatientTypeInterface } from "../../interfaces/patient/IPatientType";
import { PatientRightInterface } from "../../interfaces/patient/IPatientRight";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { GenderInterface } from "../../interfaces/employee/IGender";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListPatientType, ListPatientRight } from "../../services/patient/HttpClineServincePatient";
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



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PatientCreate(){
    const [patient, setPatient] = useState<Partial<PatientInterface>>({
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
        //listEmployee();
      }, []);

      

    

       
      
      const submit = async () => {
         //console.log(patient)
         let data = {
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
          let res = await CreatePatient(data);
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
                ลงทะเบียนผู้ป่วย
                </Typography>
              </Box>       
            </Box>
            <Divider>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>เลขบัตรประชาชน</p>
              <TextField
                id="Civ"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเลขบัตรประชาชน"
                value={patient.Civ || ""}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)){
                    e.preventDefault()
                  }
                }}
                inputProps={{maxLength :13}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ</p>
              <TextField
                id="FirstName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อ"
                value={patient.FirstName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>นามสกุล</p>
              <TextField
                id="LastName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกนามสกุล"
                value={patient.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อายุ</p>
              <TextField
                id="Age"
                variant="outlined"
                type="number"
                size="medium"
                InputProps={{inputProps:{min: 1, max : 300}}}
                placeholder="ระบุน้ำหนัก"
                value={patient.Age || ""}
                onChange={handleInputChangenumber}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>น้ำหนัก</p>
              <TextField
                id="Weight"
                variant="outlined"
                type="number"
                size="medium"
                InputProps={{inputProps:{min: 1, max : 300}}}
                placeholder="ระบุน้ำหนัก"
                value={patient.Weight || ""}
                onChange={handleInputChangenumber}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>เพศ</p>
                    <Select native value={patient.GenderID + ""} onChange={handleChange} inputProps={{name: "GenderID", }}>
                    <option aria-label="None" value="">
                        เลือกเพศ
                      </option>
                      {gender.map((item: GenderInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Name}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>โรคประจำตัว</p>
              <TextField
                id="Underlying"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="หมายเหตุ"
                value={patient.Underlying || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          
          

           


                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>ประเภทผู้ป่วย</p>
                    <Select native value={patient.PatientTypeID + ""} onChange={handleChange} inputProps={{name: "PatientTypeID", }}>
                      <option aria-label="None" value="0">
                        เลือกประเภทผู้ป่วย
                      </option>
                      {patienttype.map((item: PatientTypeInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Type}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>ประเภทสิทธิ์</p>
                    <Select native value={patient.PatientRightID + ""} onChange={handleChange} inputProps={{name: "PatientRightID", }}>
                      <option aria-label="None" value="">
                        เลือกสิทธิ์
                      </option>
                      {patientright.map((item: PatientRightInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Type}
                        </option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

               
                   
                   

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>วันเกิดผู้ป่วย</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={patient.Brithdate}
                        onChange={(newValue) => {
                          setPatient({
                            ...patient,
                            Brithdate: newValue,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <p>วันที่และเวลา</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={patient.PatientTime}
                        onChange={(newValue) => {
                          setPatient({
                            ...patient,
                            PatientTime: newValue,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button component={RouterLink} to="/patients/list" variant="contained" color="inherit">
                    กลับ
                  </Button>
                  <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success">
                    บันทึก
                  </Button>
                </Grid>

                

                



              </Grid>
            </Divider>
          </Paper> 

        </Container>
      );
      



}

export default PatientCreate;