import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import {FormControl,InputAdornment,OutlinedInput,IconButton,Container,Paper,Grid,Box,Typography,Divider,Snackbar} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    createTheme,
    Select,
    SelectChangeEvent,
    ThemeProvider,
  } from "@mui/material";
  import { DepartmentInterface } from "../../interfaces/employee/IDepartment";
  import { RoleInterface } from "../../interfaces/employee/IRole";
  import { GenderInterface } from "../../interfaces/employee/IGender";
  import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
  import { ListGenders, ListDepartments, ListRoles, CreateEmployee, GetDepartmentByRole } from "../../services/EmployeeSystem/employeeServices";
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';
  function Create_save(){
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref
    ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>(
      {
        DepartmentID: 0,
        RoleID: 0,
        GenderID: 0
      }
    );
    const [message, setAlertMessage] = React.useState("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [civ, setCiv] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [department, setDepartment] = React.useState<DepartmentInterface[]>([]);
    const [gender, setGender] = React.useState<GenderInterface[]>([]);
    const [role, setRole] = React.useState<RoleInterface[]>([])
    const [success, setSuccess] = React.useState(false);
    //check max min lenght
    const [error, setError] = React.useState(false);
    // service
    // get Gender
    const getGender = async () => {

      let res = await ListGenders();
      console.log(res);
      if (res) {
        setGender(res);
      }
    }   
    // get Role
    const getRole = async () => {
      let res = await ListRoles();
      console.log(res);
      if (res) {
        setRole(res);
      }
    }   
    // get Department
    const getDepartment = async () => {
      //let id =0;
      let res = await ListDepartments();
      console.log(res);
      if (res) {
        setDepartment(res);
      }
    }   
    const getDepartmentByRole = async () => {
      //let id =0;
      let id = employee.RoleID;
      let res = await GetDepartmentByRole(id);
      console.log(res);
      if (res) {
        setDepartment(res);
      }
    }   
    //Employee Create
    const navigator = useNavigate();
    //submit
    const submit = async () => {
      console.log(employee)

      let res = await CreateEmployee(employee)
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setAlertMessage(res.message);
        setError(true);
      }
      console.log(res)
      if(res.status){
          setTimeout(() => {
              navigator("/employee")
          }, 3000)
      }
    }

    React.useEffect(() => {
      getDepartment();
      getGender();
      getRole();
      //getDepartmentByRole();
    }, []);

    useEffect(() => {
      setDepartment([]);
      getDepartmentByRole();
      employee.DepartmentID=0;
    }, [employee.RoleID]);

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
  
      setEmployee({ ...employee, [id]: value });
    };
  
    const handleChange = (event: SelectChangeEvent<number>) => {
      const name = event.target.name as keyof typeof employee;
      setEmployee({
        ...employee,
        [name]: event.target.value,
      });
    };
    let theme = createTheme({ // button theme
      palette: {
        primary: {
          main: "#009688",
        },
        secondary: {
          main: "#009688"
        },
        text: {
          primary: "#008573",
          secondary: "#000000"
        }
      },
    });
    // handle Password visible, invisible
    const [showPassword, setShowPassword] = React.useState(false);
      
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" >
        <Snackbar
        id="success"        
        open={success}
        autoHideDuration={8000}
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
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
        <Alert onClose={handleClose} severity="error">
          {/* บันทึกข้อมูลไม่สำเร็จ */}
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
                  Create Record Employee Information
                </Typography>
              </Box>
            </Box>
    
          <Divider />

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>First Name</p>

                  <TextField
                    id="FirstName"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.FirstName || ""}
                    onChange={handleInputChange}
                    
                  />
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Last Name</p>
                  <TextField
                    id="LastName"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.LastName || ""}
                    onChange={handleInputChange}
                    
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Identification Number</p>

                  <TextField
                    id="Civ"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Civ || ""}
                    onChange={handleInputChange}
                   
                    inputProps={{maxLength:13}}
                   
                  />
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Phone</p>
                  <TextField
                    id="Phone"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Phone || ""}
                    onChange={handleInputChange}
                    
                    inputProps={{maxLength:10}}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Email</p>

                  <TextField
                    id="Email"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Email || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Password</p>
                  <OutlinedInput
                      id="Password"
                      type={showPassword ? 'text' : 'password'}
                      size="medium"
                      value={employee.Password || ""}
                      onChange={handleInputChange}
                      
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
   
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                    />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={10}>
                <FormControl fullWidth variant="outlined">
                  <p>Address</p>

                  <TextField
                    id="Address"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Address || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
              <p>Role</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={employee.RoleID}
                    onChange={handleChange}
                    inputProps={{
                      name: "RoleID",
                    }}
                  >
                    <option value={0} key={0}>
                    กรุณา เลือกสิทธิ์การเข้าถึง
                    </option>
                    {role.map((item: RoleInterface) => (
                      <option value={item.ID}>{item.Name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
              <p>Gender</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={employee.GenderID}
                    onChange={handleChange}
                    inputProps={{
                      name: "GenderID",
                    }}
                  >
                    <option value={0} key={0}>
                    กรุณา ระบุเพศ
                    </option>
                    {gender.map((item: GenderInterface) => (
                      <option value={item.ID}>{item.Name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={10}>
              <p>Department</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={employee.DepartmentID}
                    onChange={handleChange}
                    inputProps={{
                      name: "DepartmentID",
                    }}
                  >
                    <option value={0} key={0}>
                    กรุณา เลือกแผนก
                    </option>
                    {department.map((item: DepartmentInterface) => (
                      <option value={item.ID}>{item.Type}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={4}>
                  <Button component={RouterLink} to="/employee" variant="contained">
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