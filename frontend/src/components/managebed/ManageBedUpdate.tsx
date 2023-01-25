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
import { useNavigate, useParams} from 'react-router-dom'

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import { ManageBedInterface } from "../../interfaces/imanagebed/IManageBed";
import { BedInterface } from "../../interfaces/imanagebed/IBed";
import { BedStatusInterface } from "../../interfaces/imanagebed/IBedStatus";

import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";

import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { 
    GetManageBedID,
    GetBed,
    GetBedStatus,
    UpdateManageBed } from "../../services/HttpClientServince";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManageBedUpdate() {
    let {id} = useParams();
    const navigator = useNavigate()


  const [employee, setEmployee] = useState<EmployeeInterface>();

  const getEmployee = async () => {
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setEmployee(res);
    }
  };

  const [patient, setPatient] = useState<PatientInterface[]>([]);

  const getPatient = async () => {
    let res = await ListPatient();
    if (res) {
      setPatient(res);
    }
  };

  const [beds, setBeds] = useState<BedInterface[]>([]);
  const [bedstatuses, setBedstatuses] = useState<BedStatusInterface[]>([]);

  const getBed = async () => {
    let res = await GetBed();
    if (res) {
      setBeds(res);
    }
  };

  const getBedStatus = async () => {
    let res = await GetBedStatus();
    managebed.BedStatusID = res.ID;
    if (res) {
      setBedstatuses(res);
    }
  };


  const [managebed, setManageBed] = useState<ManageBedInterface>({
    Hn: 0,
    Note: "",
    ManageDate: new Date(), 
  });

  const getManageBedByID = async () => {
    let res = await GetManageBedID()
    if(res){
        setEmployee(res)
    }
  }

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
    const name = event.target.name as keyof typeof managebed;
    setManageBed({
      ...managebed,
      [name]: event.target.value,
    });
    console.log(managebed)
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ManageBedUpdate;
    const { value } = event.target;
    setManageBed({ ...managebed, [id]: value });

  }

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof managebed;
    setManageBed({
        ...managebed,
        [name]: event.target.value,
    });

};
  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  
  async function submit() {
    let data = {
      ID: convertType(managebed.ID),
      PatientID: convertType(managebed.PatientID),
      EmployeeID: convertType(localStorage.getItem("id") as string),
      BedID: convertType(managebed.BedID),
      BedStatusID: convertType(managebed.BedStatusID),     
      Hn: typeof managebed.Hn == "string" ? parseInt(managebed.Hn) : 0,
      Note: managebed.Note,
      ManageDate: managebed.ManageDate,

    };
    let res = await UpdateManageBed(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    getEmployee();
    getManageBedByID();
    getPatient();
    getBed();
    getBedStatus();

  }, []);

  return (
    <Container maxWidth="md" >
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          แก้ไขข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          แก้ไขข้อมูลผิดพลาด
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
              ระบบจัดการเตียงผู้ป่วยใน Update Mode {managebed?.ID}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>รายชื่อผู้ป่วย</p>
              <Select
                native
                value={managebed.PatientID + ""}
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
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขเตียงผู้ป่วย</p>
              <Select
                native
                value={managebed.BedID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BedID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขเตียงผู้ป่วย
                </option>
                {beds.map((item: BedInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>สภาพการใช้งานเตียงผู้ป่วย</p>
              <Select
                native
                value={managebed.BedStatusID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BedStatusID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะเตียงผู้ป่วย
                </option>
                {bedstatuses.map((item: BedStatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <p>หมายเหตุ *</p>
            <TextField className='StyledTextField'
                autoComplete="off"
                id="Name"
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                onChange={handleChangeTextField}
                inputProps={{name: "Note",}}
                value={managebed.Note}
                />
          </Grid>
          <Grid item xs={6}>
          <p>Hn</p>
            <TextField className='StyledTextField'
                autoComplete="off"
                id="Name"
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                onChange={handleChangeTextField}
                inputProps={{name: "Hn",}}
                value={managebed.Hn}
                />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={managebed.ManageDate}
                  onChange={(newValue) => {
                    setManageBed({
                      ...managebed,
                      ManageDate: newValue,
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
              to="/managebed"
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
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ManageBedUpdate;