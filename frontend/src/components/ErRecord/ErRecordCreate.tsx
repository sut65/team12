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
  import { ListEmployee, ListPatient, ListToE, ListRoom, CreateErRecord, GetRoomByToE } from "../../services/ErRecord/HttpErRecord";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function Create_save(){
  

    const [errecord, setErRecord] = React.useState<Partial<ErRecordInterface>>(
      {
        EmployeeID: 0,
        PatientID: 0,
        ToEID: 0,
        RoomID: 0,
        // Note: "",
      }
    );
    const [firstName, setFirstName] = React.useState<string>("");
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [toe, setToE] = React.useState<ToEInterface[]>([]);
    const [room, setRoom] = React.useState<RoomInterface[]>([]);
    const [note, setNote] = React.useState<string>("");
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    // service
    // get Employee
    const getEmployee = async () => {

      let res = await ListEmployee();
      console.log(res);
      if (res) {
        setEmployee(res);
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
    // get ToE
    const getToE = async () => {
      //let id =0;
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
      // console.log(res)
      if (res) {
        setSuccess(true);
      } else {
        setError(true);
      }
      if(res.data){
          setTimeout(() => {
              navigator("/errecord")
          }, 3000)
      }
    }

    React.useEffect(() => {
      getEmployee();
      getPatient();
      getToE();
      getRoom();
      getRoomByToE();
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
          main: '#0052cc',
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
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
    
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
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
              <FormLabel>Nurse</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={errecord.EmployeeID}
                    onChange={handleChange}
                    inputProps={{
                      name: "EmployeeID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกพยาบาล
                    </MenuItem>
                    {employee.map((item: EmployeeInterface) => (
                      <MenuItem value={item.ID}>{item.FirstName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
              <FormLabel>Patient</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={errecord.PatientID}
                    onChange={handleChange}
                    inputProps={{
                      name: "PatientID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกผู้ป่วย
                    </MenuItem>
                    {patient.map((item: PatientInterface) => (
                      <MenuItem value={item.ID}>{item.FirstName}</MenuItem>
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
                    value={errecord.ToEID}
                    onChange={handleChange}
                    inputProps={{
                      name: "ToEID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      ประเภทของห้องพิเศษ
                    </MenuItem>
                    {toe.map((item: ToEInterface) => (
                      <MenuItem value={item.ID}>{item.Roomtype}</MenuItem>
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
                    value={errecord.RoomID}
                    onChange={handleChange}
                    inputProps={{
                      name: "RoomID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      ห้องพิเศษ
                    </MenuItem>
                    {room.map((item: RoomInterface) => (
                      <MenuItem value={item.ID}>{item.Roomname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>


            <Grid container spacing={45} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                         <FormControl fullWidth variant="outlined">
                             <p>Date</p>
                             {/* input from roomid andthen search booking where roomid and get start\stop day in recorded   */}
                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                                 <DatePicker
                                     value={errecord.Date}
                                     onChange={(newValue) => {
                                         setErRecord({
                                             ...errecord,
                                             Date: newValue,
                                         });
                                     }}
                                     renderInput={(params) => <TextField {...params} />}
                                 />
                             </LocalizationProvider>
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