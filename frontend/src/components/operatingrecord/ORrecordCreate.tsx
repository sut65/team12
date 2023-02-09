import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { OperatingRoomInterface } from "../../interfaces/OperatingRecord/Ioperatingroom";
import { SpecialistInterface } from "../../interfaces/OperatingRecord/Ispecialist";
import { SurgeryStateInterface } from "../../interfaces/OperatingRecord/Isurgerystate";
import { SurgeryTypeInterface } from "../../interfaces/OperatingRecord/Isurgerytype";
import { ORrecordInterface } from "../../interfaces/OperatingRecord/Iorrecord";

import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { CreateORrecord,
        GetSpecialist,
        GetOperatingRoom,
        GetSurgeryState,
        GetSurgeryType } from "../../services/ORrecordSystem/HttpClientServinceOR";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ORrecordCreate() {
  const [user, setUser] = useState<EmployeeInterface[]>([]);
  const [patient, setPatient] = useState<PatientInterface[]>([]);
  const [operatingRoom, setOperatingroom] = useState<OperatingRoomInterface[]>([]);
  const [specialist, setSpecialist] = useState<SpecialistInterface[]>([]);
  const [doctor, setDoctor] = useState<EmployeeInterface[]>([]);
  const [surgerystate, setSurgerystate] = useState<SurgeryStateInterface[]>([]);
  const [surgerytype, setSurgerytype] = useState<SurgeryTypeInterface[]>([]);
  const [staffreciving, setStaffreciving] = useState<EmployeeInterface[]>([]);
  const [staffreturing, setStaffreturing] = useState<EmployeeInterface[]>([]);
 

  const [orrecord, setORrecord] = useState<ORrecordInterface>({
    SurgeryStart: new Date(), 
    SurgeryEnd: new Date(), 
    OperatingResult:"",
    Note: "",
  });
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
    const name = event.target.name as keyof typeof orrecord;
    setORrecord({
      ...orrecord,
      [name]: event.target.value,
    });
    console.log(orrecord)
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ORrecordCreate;
    const { value } = event.target;
    setORrecord({ ...orrecord, [id]: value });

  }

  const getUser = async () => {
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setUser(res);
    }
  };

  const getPatient = async () => {
    let res = await ListPatient();
    if (res) {
      setPatient(res);
    }
  };
  const getOperatingroom = async () => {
    let res = await GetOperatingRoom();
    if (res) {
      setOperatingroom(res);
    }
  };
  const getSpecialist = async () => {
    let res = await GetSpecialist();
    if (res) {
      setSpecialist(res);
    }
  };
  const getDoctor = async () => {
    let res = await ListEmployees();
    if (res) {
      setDoctor(res);
    }
  };
  const getSurgerytype = async () => {
    let res = await GetSurgeryType();
    if (res) {
      setSurgerytype(res);
    }
  };
  const getSurgerystate = async () => {
    let res = await GetSurgeryState();
    if (res) {
      setSurgerystate(res);
    }
  };
  //StaffReciving
  const getStaffreciving = async () => {
    let res = await ListEmployees();
    if (res) {
      setStaffreciving(res);
    }
  };
  const getStaffreturing = async () => {
    let res = await ListEmployees();
    if (res) {
      setStaffreturing(res);
    }
  };

  useEffect(() => {
    getUser();
    getPatient();
    getOperatingroom();
    getSpecialist();
    getDoctor();
    getSurgerystate();
    getSurgerytype();
    getStaffreciving();
    getStaffreturing();
    

  }, []);
  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
        UserID: convertType(localStorage.getItem("id") as string),
        PatientID: convertType(orrecord.PatientID),
        OperatingRoomID: convertType(orrecord.OperatingRoomID),
        SpecialistID: convertType(orrecord.SpecialistID),
        DoctorID: convertType(orrecord.DoctorID),
        SurgeryStateID: convertType(orrecord.SurgeryStateID),
        SurgeryTypeID:convertType(orrecord.SurgeryTypeID),
        StaffRecivingID:convertType(orrecord.StaffRecivingID),
        StaffReturingID:convertType(orrecord.StaffReturingID),
        SurgeryStart: orrecord.SurgeryStart,
	      SurgeryEnd: orrecord.SurgeryEnd,
	      OperatingResult: orrecord.OperatingResult,
	      Note: orrecord.Note,

    };
    let res = await CreateORrecord(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }


  return (
    <Container maxWidth="md" >
      <Snackbar
        id="success" 
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        id="error"
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกผิดพลาด
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 4, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ระบบบันทึกการเข้าใช้งานห้องผ่าตัด
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>

        {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รายชื่อผู้บันทึก</p>
              <Select
                native
                value={orrecord.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุชื่อ
                </option>
                {user.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รายชื่อผู้ป่วย</p>
              <Select
                native
                value={orrecord.PatientID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาระบุชื่อผู้ป่วย
                </option>
                {patient.map((item: PatientInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เลขห้องผ่าตัด</p>
              <Select
                native
                value={orrecord.OperatingRoomID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "OperatingRoomID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้องผ่าตัด
                </option>
                {operatingRoom.map((item: OperatingRoomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ORname}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สาขาเฉพาะทาง</p>
              <Select
                native
                value={orrecord.SpecialistID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SpecialistID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสาขาเฉพาะทาง
                </option>
                {specialist.map((item: SpecialistInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.SpclistName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>แพทย์ผ่าตัด</p>
              <Select
                native
                value={orrecord.DoctorID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DoctorID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกแพทย์ผ่าตัด
                </option>
                {doctor.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>การเข้าใช้ห้องผ่าตัด</p>
              <Select
                native
                value={orrecord.SurgeryStateID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SurgeryStateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกการเข้าใช้ห้องผ่าตัด
                </option>
                {surgerystate.map((item: SurgeryStateInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.StateName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทการผ่าตัด</p>
              <Select
                native
                value={orrecord.SurgeryTypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SurgeryTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทการผ่าตัด
                </option>
                {surgerytype.map((item: SurgeryTypeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.TypeName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เจ้าหน้าที่รับผู้ป่วย</p>
              <Select
                native
                value={orrecord.StaffRecivingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StaffRecivingID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเจ้าหน้าที่รับผู้ป่วย
                </option>
                {staffreciving.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เจ้าหน้าที่ส่งผู้ป่วย</p>
              <Select
                native
                value={orrecord.StaffReturingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StaffReturingID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเจ้าหน้าที่ส่งผู้ป่วย
                </option>
                {staffreturing.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

        
          <Grid item xs={6}>
            <p>ผลการผ่าตัด*</p>
            <TextField
              fullWidth
              id="OperatingResult"
              type="string"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <p>หมายเหตุ*</p>
            <TextField
              fullWidth
              id="Note"
              type="string"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
        
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลาเริ่มผ่าตัด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={orrecord.SurgeryStart}
                  onChange={(newValue) => {
                    setORrecord({
                      ...orrecord,
                      SurgeryStart: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          
        
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลาสิ้นสุดการผ่าตัด</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={orrecord.SurgeryEnd}
                  onChange={(newValue) => {
                    setORrecord({
                      ...orrecord,
                      SurgeryEnd: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>



          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/ORrecord"
              variant="outlined"
              color="primary"
              sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#e0f2f1'}}}

            >
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
              sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#80cbc4'}}}
            >
              Save
            </Button>
          </Grid>
          
        </Grid>
      </Paper>
    </Container>
  );
}

export default ORrecordCreate;