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

import { MedicalSlipInterface } from "../../interfaces/imedicalslip/IMedicalSlip";
import { LabXrayInterface } from "../../interfaces/LabXray/ILabXray";

import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";

import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";

import { ListPrescription } from "../../services/prescription/HttpClineServincePrescription";
import { ListLabXrays } from "../../services/LabXraySystem/LabXrayServices";
import { PrescriptionInterface } from "../../interfaces/prescription/IPrescription";
import { CreateMedicalSlip } from "../../services/MedicalSlip/HttpClientServince";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MedicalSlipCreate() {
  const [employee, setEmployee] = useState<EmployeeInterface>();
  const [patient, setPatient] = useState<PatientInterface[]>([]);
  const [labxrays, setLabXrays] = useState<LabXrayInterface[]>([]);
  //const [orecords, setOrecords] = useState<OrecordInterface[]>([]);

  const [prescriptions, setPrescription] = useState<PrescriptionInterface[]>([]);

  const [medicalslip, setMedicalSlip] = useState<MedicalSlipInterface>({
    Total: 0.0,
    Note: "",
    MedicalDate: new Date(), 
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
    const name = event.target.name as keyof typeof medicalslip;
    setMedicalSlip({
      ...medicalslip,
      [name]: event.target.value,
    });
    console.log(medicalslip)
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof MedicalSlipCreate;
    const { value } = event.target;
    setMedicalSlip({ ...medicalslip, [id]: value });

  }

  const getEmployee = async () => {
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setEmployee(res);
    }
  };

  const getPatient = async () => {
    let res = await ListPatient();
    if (res) {
      setPatient(res);
    }
  };

  const getLabXaray = async () => {
    let res = await ListLabXrays();
    if (res) {
      setLabXrays(res);
    }
  };

  const getPrescription = async () => {
    let res = await ListPrescription();
    if (res) {
      setPrescription(res);
    }
  };

  useEffect(() => {
    getEmployee();
    getPatient();
    getLabXaray();
    getPrescription();

  }, []);
  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      PatientID: convertType(medicalslip.PatientID),
      EmployeeID: convertType(localStorage.getItem("id") as string),
      LabXrayID: convertType(medicalslip.LabXrayID),
      ORecordID: medicalslip.ORecordID,
      PrescriptionID: convertType(medicalslip.PrescriptionID),     
      Total: typeof medicalslip.Total == "string" ? parseFloat(medicalslip.Total) : 0.0,
      Note: medicalslip.Note,
      MedicalDate: medicalslip.MedicalDate,

    };
    let res = await CreateMedicalSlip(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md" >
      <Snackbar
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
              ระบบจัดการเตียงผู้ป่วยใน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <p>รายชื่อผู้ป่วย</p>
              <Select
                native
                value={medicalslip.PatientID + ""}
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
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขห้อง Lab-Xray</p>
              <Select
                native
                value={medicalslip.LabXrayID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "LabXrayID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้อง Lab-Xray
                </option>
                {labxrays.map((item: LabXrayInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขห้องผ่าตัด</p>
              <Select
                native
                value={medicalslip.ORecordID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ORecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้องผ่าตัด
                </option>
                {labxrays.map((item: LabXrayInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขใบสั่งยา</p>
              <Select
                native
                value={medicalslip.PrescriptionID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PrescriptionID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขใบสั่งยา
                </option>
                {prescriptions.map((item: PrescriptionInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
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
            <p>จำนวนค่ารักษา</p>
            <TextField
              fullWidth
              id="Total"
              type="string"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={medicalslip.MedicalDate}
                  onChange={(newValue) => {
                    setMedicalSlip({
                      ...medicalslip,
                      MedicalDate: newValue,
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
              to="/medicalslip"
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

export default MedicalSlipCreate;