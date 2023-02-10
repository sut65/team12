import { Alert, Box, Button, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput,
    ThemeProvider, } from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { DepartmentInterface } from "../../interfaces/employee/IDepartment";
import { RoleInterface } from "../../interfaces/employee/IRole";
import { GenderInterface } from "../../interfaces/employee/IGender";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListGenders, ListDepartments, ListRoles, CreateEmployee, GetDepartmentByRole, GetEmployee, UpdateEmployee } from "../../services/EmployeeSystem/employeeServices";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function EmployeeUpdate() {

    let {id} = useParams();
    const navigator = useNavigate()

    // List all Database
    // Get employee by id
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({})
    const getEmployeeByID = async (id:string | undefined) => {
        let res = await GetEmployee(id)
        if(res){
            setEmployee(res)
        }
    }

    // List Gender
    const [gender, setGender] = React.useState<GenderInterface[]>([])
    const getGender = async () => {
        let res = await ListGenders()
        if(res){
            setGender(res)
        }
    }

    // List Department
    const [department, setDepartment] = React.useState<DepartmentInterface[]>([]);
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

    // List Role
    const [role, setRole] = React.useState<RoleInterface[]>([])
    const getRole = async () => {
        let res = await ListRoles();
        console.log(res);
        if (res) {
          setRole(res);
        }
      }   

    
    React.useEffect(() => {
        getDepartment();
        getGender();
        getRole();
        getEmployeeByID(id);
      }, []);
    React.useEffect(() => {
      setDepartment([]);
      getDepartmentByRole();
    }, [employee.RoleID]);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(employee)
  
        let res = await UpdateEmployee(employee)
        if (res.status) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
        } else {
          setAlertMessage(res.message);
          setError(true);
        }
        // console.log(res)
        if(res.status){
            setTimeout(() => {
                navigator("/employee")
            }, 3000)
        }
    }
    // handle
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof EmployeeUpdate;
    
        const { value } = event.target;
    
        setEmployee({ ...employee, [id]: value });
      };
    
       // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof employee;

        setEmployee({
            ...employee,
            [name]: event.target.value
        })
    }

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

      // handle Password visible, invisible
        const [showPassword, setShowPassword] = React.useState(false);
      
        const handleClickShowPassword = () => setShowPassword((show) => !show);
      
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
        };
      
      return (
<ThemeProvider theme={theme}>
    <Container maxWidth="xl">
    <Snackbar
        id="success"        
        open={success}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          แก้ไขข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar 
        id="error"
        open={error} 
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
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
                  Update Record Employee Information
                </Typography>
              </Box>
            </Box>
        
            <Divider />
                <Grid container spacing={1} sx={{ padding: 2 }} style={{ marginLeft: "8%"}}>
                    <Grid item xs={9}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Employee</p>
                            <Select
                                native
                                value={employee.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {employee.ID}
                                </option>
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                        <p>First Name</p>

                        <TextField
                            id="FirstName"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={employee.FirstName || ""}
                            onChange={handleInputChange}
                            // onKeyPress={(e) => {
                            //     if (/[0-9]/.test(e.key)){
                            //       e.preventDefault()
                            //     }
                            //   }}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                        <p>Last Name</p>

                        <TextField
                            id="LastName"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={employee.LastName || ""}
                            onChange={handleInputChange}
                            // onKeyPress={(e) => {
                            //     if (/[0-9]/.test(e.key)){
                            //       e.preventDefault()
                            //     }
                            //   }}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Gender</p>
                            <Select
                                native
                                value={employee.GenderID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "GenderID"
                                }}
                            >
                                <option aria-label="None" value="">
                                เลือกเพศ
                                </option>
                                {
                                    gender.map((item: GenderInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                        <p>Identification Number</p>

                        <TextField
                            id="Civ"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={employee.Civ || ""}
                            onChange={handleInputChange}
                            // onKeyPress={(e) => {
                            //     if (!/[0-9]/.test(e.key)){
                            //       e.preventDefault()
                            //     }
                            //   }}
                            inputProps={{maxLength:13}}
                        />
                        </FormControl>
                        </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                        <p>Password</p>
                        <OutlinedInput
                            id="Password"
                            type={showPassword ? 'text' : 'password'}
                            size="medium"
                            value={employee.Password || ""}
                            onChange={handleInputChange}
                            // inputProps={{minLength:8}}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                //aria-label="toggle password visibility"
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
                    <Grid item xs={3}>
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

                </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "7%"}}>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                    <p>Phone</p>
                    <TextField
                        id="Phone"
                        variant="outlined"
                        type="string"
                        size="medium"
                        value={employee.Phone || ""}
                        onChange={handleInputChange}
                        // onKeyPress={(e) => {
                        //     if (!/[0-9]/.test(e.key)){
                        //       e.preventDefault()
                        //     }
                        //   }}
                        inputProps={{maxLength:10}}
                    />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <p>Role</p>
                    <FormControl fullWidth variant="outlined">
                    <Select
                            native
                            value={employee.RoleID}
                            onChange={handleChange}
                            size="medium"
                            inputProps={{
                                name: "RoleID"
                            }}
                        >
                        <option aria-label="None" value="">
                        เลือกเพศ
                        </option>
                            {
                                role.map((item: RoleInterface) =>
                                (<option value={item.ID} key={item.ID}>
                                     {item.Name}
                                </option>)
                                )
                            }
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <p>Department</p>
                    <FormControl fullWidth variant="outlined">
                    <Select
                            native
                            value={employee.DepartmentID}
                            onChange={handleChange}
                            size="medium"
                            inputProps={{
                                name: "DepartmentID"
                            }}
                        >
                        <option aria-label="None" value="">
                        เลือกแผนก
                        </option>
                            {
                                department.map((item: DepartmentInterface) =>
                                (<option value={item.ID} key={item.ID}>
                                     {item.Type}
                                </option>)
                                )
                            }
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: 2 }} style={{ marginLeft: "8%"}}>
                <Grid item xs={9}>
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
            <Grid container spacing={2} sx={{ padding: 2 }} style={{ marginLeft: "7%"}} >
              <Grid item xs={4}>
                  <Button component={RouterLink} to="/employee" variant="contained">
                    Back
                  </Button>
              </Grid>
              <Grid item xs={5}>
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