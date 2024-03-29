import React, { useEffect, useState } from "react";
//import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete'; //import มาหมดเเละเก็บไว้ในตัวแปร Autocomplete
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";  //import มาเฉพราะฟังก์ชัน LocalizationProvider

//import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Schedule } from "@mui/icons-material";
import { DepartmentForEquipmentsInterface } from "../../interfaces/requisitionRecord/IDepartmentForEquipment";
import { EquipmentsInterface } from "../../interfaces/requisitionRecord/IEquipment";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography,createTheme,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider, } from '@mui/material'
import {
  ListDepartmentForEquipments,
  ListEquipments,
  PostRequisition,
} from "../../services/RequisitionSystem/RequisitionServices";
import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";
import { RequisitionRecordInterface } from "../../interfaces/requisitionRecord/IRequisitionRecord";

function RequisitionCreate(){
  let theme = createTheme({ // button theme
    palette: {
        primary: {
          main: '#339966', //เขียว
        },
        secondary: {
          main: '#339999', 
        },
    },
  });
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
  });

  const [requisition, setRequisition] = React.useState<Partial<RequisitionRecordInterface>>(
    {
      EmployeeID: 0,
      EquipmentID: 0,
      DepartmentForEquipmentID: 0
    }
  );
  const [RequisitionDate, setRequisitiondate] = React.useState<Date | null>(new Date());
  const [equipment, setEquipment] = React.useState<EquipmentsInterface[]>([]);
  const [departmentforequipment, setDepartmentforequipment] = React.useState<DepartmentForEquipmentsInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");
  // service
  // get Equipment
  const getEquipment = async () => {

    let res = await ListEquipments();
    console.log(res);
    if (res) {
      setEquipment(res);
    }
  }   
  // get departmentforequipment
  const getDepartmentforequipment = async () => {
    let res = await ListDepartmentForEquipments();
    console.log(res);
    if (res) {
      setDepartmentforequipment(res);
    }
  }   
  // get Employee
  const getEmployee = async () => {
    //let id =0;
    let res = await ListEmployees();
    console.log(res);
    if (res) {
      setEmployee(res);
    }
  }   

  //Vital sign Create
  const navigator = useNavigate();
  //submit
  const submit = async () => {
    console.log(requisition)

    let res = await PostRequisition(requisition)
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

  React.useEffect(() => {
    getEquipment();
    getDepartmentforequipment();
    getEmployee();
    //getDepartmentByRole();
  }, []);

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

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequisitionCreate;

    const { value } = event.target;

    setRequisition({ ...requisition, [id]: value });
  };

  //text field number 
  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RequisitionCreate;
    const { value } = event.target;
    setRequisition({ ...requisition, [id]: value === "" ? "" : Number(value) });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof requisition;
    setRequisition({
      ...requisition,
      [name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" >
      <Snackbar
        id="success"
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          เบิกอุปกรณ์สำเร็จ
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
                Requisition Equipment and Supplies
              </Typography>
            </Box>
        </Box>

        <Grid container margin={1} columnGap={2}>
          <Grid>
            <img src="https://th.bing.com/th/id/R.0caddcb9262a4baf0a79b81de967eecf?rik=8ntqrRxNo%2b%2f%2b%2fQ&riu=http%3a%2f%2fi.ebayimg.com%2fimages%2fi%2f300975021241-0-1%2fs-l1000.jpg&ehk=rBYAUSchJ%2fPzlHRlliUXCL0AzQRDMRmFEGQDlUymwi4%3d&risl=&pid=ImgRaw&r=0" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://vcareshop.com/wp-content/uploads/2021/09/238_P_1475293552883-600x629-768x768.png" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://www.สอบเทียบเครื่องมือแพทย์.com/images/content/original-1662713704563.png" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://storage.googleapis.com/prod-hps-bucket/2020/11/product/400130001_1_1604638408.jpg" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://cf.shopee.co.th/file/b3cb6dd425d7afb142409d4d8beb1721" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://media.allonline.7eleven.co.th/pdzoom/205870_Exta_0362_00.jpg" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://media.shopat24.com/pdmain/200642_01_thai_sports_exeo_weight_scale_digital_display_model_eb9377_grey.jpg" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://www.สอบเทียบเครื่องมือแพทย์.com/images/content/original-1662713581563.png" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://www.สอบเทียบเครื่องมือแพทย์.com/images/content/original-1662713511315.png" alt="" width="200" height="200" />
          </Grid>
          <Grid>
            <img src="https://th.bing.com/th/id/R.5523cfb2aabc341f83d797ebdcdaf9d8?rik=0J0Y8tApQu7X6w&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fe%2fe2%2fDoctors_stethoscope_1.jpg&ehk=szgpSDd2P1lcdk5pcSnHs1Sh5ndRQXcDOa4NfnNsYDk%3d&risl=&pid=ImgRaw&r=0" alt="" width="200" height="200" />
          </Grid>
        </Grid>

          <Divider />

          <Grid container spacing={3} sx={{ padding: 1,marginTop: 1 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
              <FormLabel>Department</FormLabel>
                <Select
                  native
                  value={requisition.DepartmentForEquipmentID}
                  onChange={handleChange}
                  inputProps={{
                    name: "DepartmentForEquipmentID",
                  }}
                >
                  <option value={0} key={0}>
                    กรุณาเลือกแผนกที่ต้องการเบิกอุปกร์ทางการเเพทย์
                  </option>
                  {departmentforequipment.map((item: DepartmentForEquipmentsInterface) => (
                    <option value={item.ID}>{item.Type}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 1,marginTop: 0 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={10}>
            <FormLabel>Equipment and Supplies</FormLabel>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={requisition.EquipmentID}
                  onChange={handleChange}
                  inputProps={{
                    name: "EquipmentID",
                  }}
                >
                  <option value={0} key={0}>
                    กรุณาเลือกอุุปกรณ์ทางการเเพทย์
                  </option>
                  {equipment.map((item: EquipmentsInterface) => (
                    <option value={item.ID}>{item.Name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ padding: 1,marginTop: 0 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={6}>
            <FormLabel>Quantity</FormLabel>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="Quantity"
                  variant="outlined"
                  type="string"
                  size="medium"
                  placeholder="กรุณาระบุจำนวนอุปกรณ์ทางการเเพทย์"
                  value={requisition.Quantity}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

          </Grid>
          
          <Grid container spacing={3} sx={{ padding: 2 }} style={{ marginLeft: "6.5%"}}>
            <Grid item xs={4}>
                <Button component={RouterLink} to="/requisition" variant="contained" color="secondary">
                  Back
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                  style={{ float: "right" }}
                  onClick={submit}
                  variant="contained"
                  color="secondary"
                >
                  บันทึกข้อมูล
                </Button>
            </Grid>
          </Grid>

           

          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default RequisitionCreate;

