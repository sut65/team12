import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import {FormControl, Container,Paper,Grid,Box,Typography,Divider,Snackbar} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
  import { DepartmentInterface } from "../../interfaces/employee/IDepartment";
  import { RoleInterface } from "../../interfaces/employee/IRole";
  import { GenderInterface } from "../../interfaces/employee/IGender";
  import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
  import { ListGenders, ListDepartments, ListRoles, CreateEmployee, GetDepartmentByRole } from "../../services/EmployeeSystem/employeeServices";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function Create_save(){
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>(
      {
        DepartmentID: 0,
        RoleID: 0,
        GenderID: 0
      }
    );
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
      // console.log(res)
      if(res.data){
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
                  Record Employee Information
                </Typography>
              </Box>
            </Box>
    
            <Divider />

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>First Name</FormLabel>

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
                  <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Identification Number</FormLabel>

                  <TextField
                    id="Civ"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Civ || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Phone</FormLabel>
                  <TextField
                    id="Phone"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Phone || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Email</FormLabel>

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
                  <FormLabel>Password</FormLabel>
                  <TextField
                    id="Password"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={employee.Password || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={10}>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Address</FormLabel>

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
              <FormLabel>Role</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={employee.RoleID}
                    onChange={handleChange}
                    inputProps={{
                      name: "RoleID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกสิทธิ์การเข้าถึง
                    </MenuItem>
                    {role.map((item: RoleInterface) => (
                      <MenuItem value={item.ID}>{item.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
              <FormLabel>Gender</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={employee.GenderID}
                    onChange={handleChange}
                    inputProps={{
                      name: "GenderID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกเพศ
                    </MenuItem>
                    {gender.map((item: GenderInterface) => (
                      <MenuItem value={item.ID}>{item.Name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
              <Grid item xs={10}>
              <FormLabel>Department</FormLabel>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={employee.DepartmentID}
                    onChange={handleChange}
                    inputProps={{
                      name: "DepartmentID",
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      เลือกแผนก
                    </MenuItem>
                    {department.map((item: DepartmentInterface) => (
                      <MenuItem value={item.ID}>{item.Type}</MenuItem>
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