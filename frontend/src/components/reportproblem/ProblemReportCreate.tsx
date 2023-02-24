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

import { ProblemReportInterface } from "../../interfaces/ReportProblem/Iproblemreport";
import { ClassProbInterface } from "../../interfaces/ReportProblem/Iclassprob";
import { NumPlaceInterface } from "../../interfaces/ReportProblem/Inumplace";
import { ProblemInterface } from "../../interfaces/ReportProblem/Iproblem";

import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";

import { CreateProblemReport,
        GetClassProb,
        GetNumPlace,
        GetProblem,
        GetNumPlaceByClassProb } from "../../services/ReportProblemSystem/HttpClientServinceProbRep";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProblemReportCreate() {
  const [user, setUser] = useState<EmployeeInterface[]>([]);
  const [classprob, setClassprob] = useState<ClassProbInterface[]>([]);
  const [numPlace, setNumplace] = useState<NumPlaceInterface[]>([]);
  const [problem, setProblem] = useState<ProblemInterface[]>([]);

  const [problemreport, setProblemreport] = useState<Partial<ProblemReportInterface>>({
    UserID: 0,
    ClassProbID: 0,
    NumPlaceID: 0,
    ProblemID: 0,
    Date: new Date(),
    Comment: "",
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
    const name = event.target.name as keyof typeof problemreport;
    setProblemreport({
      ...problemreport,
      [name]: event.target.value,
    });
    console.log(problemreport)
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ProblemReportCreate;
    const { value } = event.target;
    setProblemreport({ ...problemreport, [id]: value });

  }

  const getUser = async () => {
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setUser(res);
    }
  };

  const getClassProb = async () => {
    let res = await GetClassProb();
    if (res) {
      setClassprob(res);
    }
  };

  const getNumPlace = async () => {
    let res = await GetNumPlace();
    if (res) {
      setNumplace(res);
    }
  };

  const getProblem = async () => {
    let res = await GetProblem();
    if (res) {
      setProblem(res);
    }
  };
  const getNumPlaceByClassProb = async () => {
    //let id =0;
    let id = problemreport.ClassProbID;
    let res = await GetNumPlaceByClassProb(id);
    console.log(res);
    if (res) {
      setNumplace(res);
    }
  }  

  useEffect(() => {
    getUser();
    getClassProb();
    getNumPlace();
    getProblem();
  }, []);
  useEffect(() => {
    setNumplace([]);
    getNumPlaceByClassProb();
  }, [problemreport.ClassProbID]);

  //=========================== ทำถึงนี่แล้ว ไปซื้อข้าวอยู่ ===========================
  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  async function submit() {
    let data = {
      
      UserID: convertType(localStorage.getItem("id") as string),
      ClassProbID: convertType(problemreport.ClassProbID),
      NumPlaceID: convertType(problemreport.NumPlaceID),
      ProblemID: convertType(problemreport.ProblemID),
      Date: problemreport.Date,
      Comment: problemreport.Comment,
  };

    let res = await CreateProblemReport(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md" >
      <Snackbar
       id = "success"
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
        id = "error"
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
              ระบบแจ้งซ่อมบำรุง
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทหมวดหมู่ที่เกิดปัญหา</p>
              <Select
                native
                value={problemreport.ClassProbID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ClassProbID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกกหมวดหมู่
                </option>
                {classprob.map((item: ClassProbInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ClassProbType}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อเลขสถานที่เกิดเหตุ</p>
              <Select
                native
                value={problemreport.NumPlaceID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "NumPlaceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อเลข
                </option>
                {numPlace.map((item: NumPlaceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ปัญหาที่เกิด</p>
              <Select
                native
                value={problemreport.ProblemID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ProblemID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกปัญหา
                </option>
                {problem.map((item: ProblemInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ProblemName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>รายละเอียด *</p>
            <TextField
              fullWidth
              id="Comment"
              type="string"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลาเกิดเหตุ</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  value={problemreport.Date}
                  onChange={(newValue) => {
                    setProblemreport({
                      ...problemreport,
                      Date: newValue,
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
              to="/problemreport"
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

export default ProblemReportCreate;