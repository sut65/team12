import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import {FormControl, Container,Paper,Grid,Box,Typography,Divider,Snackbar} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { grey } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
    createTheme,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    ThemeProvider,
  } from "@mui/material";
  import { ErRecordInterface } from "../../interfaces/errecord/IErRecord";
  import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
  import { PatientInterface } from "../../interfaces/patient/IPatient";
  import { ToEInterface } from "../../interfaces/errecord/IToE";
  import { RoomInterface } from "../../interfaces/errecord/IRoom";
//   import { ListEmployee, ListDepartments, ListRoles, CreateEmployee, GetDepartmentByRole } from "../../services/EmployeeSystem/employeeServices";
  import { ListPatient } from "../../services/patient/HttpClineServincePatient";
import { ListEmployee,  ListRoom, CreateErRecord, GetRoomByToE , ListNurseErRecord} from "../../services/ErRecord/HttpErRecord";
import { ListToE } from "../../services/ErRecord/HttpErRecord";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function Create_save(){
  

    const [errecord, setErRecord] = React.useState<Partial<ErRecordInterface>>(
      {
        // EmployeeID: 0,
        NurseID: 0,
        PatientID: 0,
        ToEID: 0,
        RoomID: 0,
        Description: "",
        // Note: "",
        
      }
    );
    const [firstName, setFirstName] = React.useState<string>("");
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [nurse, setNurse] = React.useState<EmployeeInterface[]>([]);
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [toe, setToE] = React.useState<ToEInterface[]>([]);
    const [room, setRoom] = React.useState<RoomInterface[]>([]);
    const [note, setNote] = React.useState<string>("");
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    // service
    // get Employee
    const getEmployee = async () => {

      let res = await ListEmployee();
      console.log(res);
      if (res) {
        setEmployee(res);
      }
    }   

     // get Nurse
  const getNurse = async () => {
    let res = await ListNurseErRecord();
    console.log(res);
    if (res) {
      setNurse(res);
    }
  }
    // get Patient
    const getPatient = async () => {
      let res = await ListPatient();
      console.log(res);
      if (res) {
        setPatient(res);
      }
    }   
    // // get ToE
    // const getToE = async () => {
    //   //let id =0;
    //   let res = await ListToE();
    //   console.log(res);
    //   if (res) {
    //     setToE(res);
    //   }
    // }   

    // get ToE
    const getToE = async () => {
      let res = await ListToE();
      console.log(res);
      if (res) {
        setToE(res);
      }
    } 
    // get Room
    const getRoom = async () => {
        //let id =0;
        let res = await ListRoom();
        console.log(res);
        if (res) {
          setRoom(res);
        }
      }   

    const getRoomByToE = async () => {
      //let id =0;
      let id = errecord.ToEID;
      let res = await GetRoomByToE(id);
      console.log(res);
      if (res) {
        setRoom(res);
      }
    } 
    
    //ErRecord Create
    const navigator = useNavigate();
    //submit
    const submit = async () => {
      console.log(errecord)

      let res = await CreateErRecord(errecord)

      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setError(true);
        setAlertMessage(res.message);
      }
      if(res.status){
          setTimeout(() => {
              navigator("/errecord")
          }, 3000)
      }

      
    }


    React.useEffect(() => {
      getEmployee();
      getPatient();
      getToE();
      // getRoom();
      getRoomByToE();
      getNurse();
    }, []);

    useEffect(() => {
      setRoom([]);
      getRoomByToE();
    }, [errecord.ToEID]);

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
  
    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof Create_save;
  
      const { value } = event.target;
  
      setErRecord({ ...errecord, [id]: value });
    };
  
    const handleChange = (event: SelectChangeEvent<number>) => {
      const name = event.target.name as keyof typeof errecord;
      setErRecord({
        ...errecord,
        [name]: event.target.value,
      });
    };
    let theme = createTheme({
      palette: {
        primary: {
          main: '#3ba299',
        },
        secondary: {
          main: '#edf2ff',
        },

        
      },
    });
    
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" >
          <Snackbar
            id="success"
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
    
          <Snackbar 
            id="error"
            open={error} 
            autoHideDuration={8000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
            {message}
            </Alert>
          </Snackbar>
    
          <Paper>
            <Box
              display="flex"
              sx={{
                marginTop: 2,
              }}
            >
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Exclusive Room Information
                </Typography>
              </Box>
            </Box>
    
            <Divider />

            

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
              <FormLabel>พยาบาล</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native

                    value={errecord.NurseID}
                    onChange={handleChange}
                    inputProps={{
                      name: "NurseID",
                    }}
                  >
                    <option value={0} key={0}>
                      เลือกพยาบาล
                    </option>
                    {nurse.map((item: EmployeeInterface) => (
                      <option value={item.ID}>{item.FirstName + " "+item.LastName}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
              <FormLabel>ผู้ป่วย</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={errecord.PatientID}
                    onChange={handleChange}
                    inputProps={{
                      name: "PatientID",
                    }}
                  >
                    <option value={0} key={0}>
                      เลือกผู้ป่วย
                    </option>
                    {patient.map((item: PatientInterface) => (
                      <option value={item.ID}>{item.FirstName + " "+item.LastName}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={35} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={6}>
              <FormLabel>Type of Exclusive Room</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={errecord.ToEID}
                    onChange={handleChange}
                    inputProps={{
                      name: "ToEID",
                    }}
                  >
                    <option value={0} key={0}>
                      ประเภทของห้องพิเศษ
                    </option>
                    {toe.map((item: ToEInterface) => (
                      <option value={item.ID}>{item.Roomtype}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* <Grid container spacing={45} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={5}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Price</p>
                            <Select
                                native
                                value={errecord.RoomID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "Price"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {errecord.RoomID}
                                </option>
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid> */}

            <Grid container spacing={45} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
              <FormLabel>Exclusive Room</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={errecord.RoomID}
                    onChange={handleChange}
                    inputProps={{
                      name: "RoomID",
                    }}
                  >
                    <option value={0} key={0}>
                      ห้องพิเศษ
                    </option>
                    {room.map((item: RoomInterface) => (
                      <option value={item.ID}>{item.Roomname}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>


            <Grid container spacing={42} sx={{ padding: 5 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>หมายเหตุ*</FormLabel>

                  <TextField
                    id="Description"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={errecord.Description || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={4}>
                  <Button component={RouterLink} to="/errecord" variant="contained">
                    Back
                  </Button>
              </Grid>
              <Grid item xs={6}>
                  <Button
                    style={{ float: "right" }}
                    onClick={submit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
    </ThemeProvider>
      );
  }
  export default Create_save;