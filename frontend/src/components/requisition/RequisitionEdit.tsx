import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    RadioGroup,
    SelectChangeEvent,
    ThemeProvider, } from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { EquipmentsInterface } from "../../interfaces/requisitionRecord/IEquipment";
import { DepartmentForEquipmentsInterface } from "../../interfaces/requisitionRecord/IDepartmentForEquipment";
import { RequisitionRecordInterface } from "../../interfaces/requisitionRecord/IRequisitionRecord";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListEquipments, ListDepartmentForEquipments, GetEquipment, GetDepartmentForEquipment, GetRequisition, UpdateRequisition } from "../../services/RequisitionSystem/RequisitionServices";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ListEmployees } from '../../services/EmployeeSystem/employeeServices'

export default function RequisitionEdit() {

    let {id} = useParams();
    const navigator = useNavigate()

    // List all Database
    // Get requisition by id
    const [requisition, setRequisition] = React.useState<Partial<RequisitionRecordInterface>>({})
    const getRequisitionByID = async (id:string | undefined) => {
        let res = await GetRequisition(id)
        if(res){
            setRequisition(res)
        }
    }

    // List Equipment
    const [equipment, setEquipment] = React.useState<EquipmentsInterface[]>([])
    const getEquipment = async () => {
        let res = await ListEquipments()
        if(res){
            setEquipment(res)
        }
    }

    // List Departmentforequipment
    const [departmentforequipment, setDepartmentforequipment] = React.useState<DepartmentForEquipmentsInterface[]>([]);
    // get DepartmentForEquipment
    const getDepartmentforequipment = async () => {
        //let id =0;
        let res = await ListDepartmentForEquipments();
        console.log(res);
        if (res) {
            setDepartmentforequipment(res);
        }
    }

    // List Employee
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
    // get DepartmentForEquipment
    const getEmployee = async () => {
        //let id =0;
        let res = await ListEmployees();
        console.log(res);
        if (res) {
            setEmployee(res);
        }
    }  
 
    React.useEffect(() => {
        getEquipment();
        getEmployee();
        getDepartmentforequipment();
        getRequisitionByID(id);
      }, []);

    // submit
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const submit = async () => {
        console.log(requisition)
  
        let res = await UpdateRequisition(requisition)
        if (res.status) {
            // setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
          } else {
            setAlertMessage(res.message);
            setError(true);
          }
        // console.log(res)
        if(res.status){
            setTimeout(() => {
                navigator("/requisition")
            }, 3000)
        }
    }

    //handle text field number 
    const handleInputChangenumber = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof RequisitionEdit;
        const { value } = event.target;
        setRequisition({ ...requisition, [id]: value === "" ? "" : Number(value) });
    };
    
       // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof requisition;

        setRequisition({
            ...requisition,
            [name]: event.target.value
        })
    }

      let theme = createTheme({ // button theme
        palette: {
          primary: {
            main: '#12a178', //เขียว
          },
          secondary: {
            main: '#edf2ff', //ขาว
          },
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

      return (
        <Container maxWidth="lg">

        <Snackbar
            id="success"
            open={success}
            autoHideDuration={3000}
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
            autoHideDuration={3000} 
            onClose={handleClose} 
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>

             <Paper sx={{ p: 4, pb: 10 }}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            gutterBottom
                            color="black"
                        >
                            แก้ไขข้อมูลสัญญาณชีพ
                        </Typography>
                    </Box>
                </Box>
                <hr />

                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Equipment and Supplies</p>
                            <Select
                                native
                                value={requisition.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {requisition.ID}
                                </option>
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={10}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Department</p>
                            <Select
                                native
                                value={requisition.DepartmentForEquipmentID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "DepartmentForEquipmentID"
                                }}
                                
                            >
                                <option aria-label="None" value="">
                                    เลือกแผนก
                                </option>
                                {
                                    departmentforequipment.map((item: DepartmentForEquipmentsInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Type}
                                    </option>)
                                )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
                    <Grid item xs={10}>
                    <FormControl fullWidth variant='outlined'>
                            <p>Equipment</p>
                            <Select
                                native
                                value={requisition.EquipmentID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "EquipmentID"
                                }}
                                
                            >
                                <option aria-label="None" value="">
                                    เลือกอุุปกรณ์ทางการเเพทย์
                                </option>
                                {
                                    equipment.map((item: EquipmentsInterface) =>
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
                    <Grid item xs={5}>
                        <FormControl fullWidth variant="outlined">
                        <p>Quantity</p>

                        <TextField
                            id="Quantity"
                            variant="outlined"
                            type="string"
                            size="medium"
                            value={requisition.Quantity || ""}
                            onChange={handleInputChangenumber}
                        />
                        </FormControl>
                    </Grid>
                </Grid>
           
                <Grid item xs={12} >
                        <Button component={RouterLink} to="/requisition" variant='contained'>
                            ย้อนกลับ
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            variant="contained"
                            onClick={submit}
                        >
                            บันทึกข้อมูล
                        </Button>
                </Grid>
                
            </Paper>
        </Container>
    )
}