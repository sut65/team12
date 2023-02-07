import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormControl, Container,Paper,Grid,Box,Typography,Divider,Snackbar} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
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
  import { LabXrayInterface } from "../../interfaces/LabXray/ILabXray";
  import { LabTypeInterface } from "../../interfaces/LabXray/ILabType";
  import { PatientInterface } from "../../interfaces/patient/IPatient";
  import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
  import { ListLabTypes, CreateLabXray,UpdateLabXray } from "../../services/LabXraySystem/LabXrayServices";
  import { ListEmployees } from "../../services/EmployeeSystem/employeeServices";
  import { ListPatient } from "../../services/patient/HttpClineServincePatient";
  import { GetLabXray } from "../../services/LabXraySystem/LabXrayServices";
  export default function UpdateLabXrayNew() {
    

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [labxray, setLabXray] = React.useState<Partial<LabXrayInterface>>({});
      const [patient, setPatient] = React.useState<PatientInterface[]>([]);
      const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]);
      const [labtype, setLabType] = React.useState<LabTypeInterface[]>([])
      const [success, setSuccess] = React.useState(false);
      const [error, setError] = React.useState(false);
      const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null); // สร้างตัวแปรแยกเนื่องจาก render.result มันต้องการ ArrayBuffer ด้วย
      // service
      let {id} = useParams();
      const navigator = useNavigate()

      const getLabXrayByID = async (id:string | undefined) => {
        console.log(id)
        let res = await GetLabXray(id)
        if(res){
            setLabXray(res)
        }
    }
    // get LabType
    const getLabType = async () => {

        let res = await ListLabTypes();
        console.log(res);
        if (res) {
          setLabType(res);
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

    //LabXray Create
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val
    }
    const [message, setAlertMessage] = React.useState("");
    //submit
    const submit = async () => {
        console.log(labxray)
        let data = {
          ID: convertType(labxray.ID),
          Description: labxray.Description,
          Pic: imageString,
          // Date: new Date().toJSON().split("Z").at(0)+"+07:00",
          LabTypeID:convertType(labxray.LabTypeID),
          DoctorID: convertType(localStorage.getItem("id") as string),
          PatientID: convertType(labxray.PatientID),
        }
      const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
        }
        const apiUrl = "http://localhost:8080"
  
        let res = await fetch(`${apiUrl}/labxray/update`, reqOpt)
        .then((response) => response.json())
      .then((res) => {       
        console.log(res)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
           // console.log(res)
          if(res.data){
            setTimeout(() => {
                navigator("/labxray")
            }, 2000)
          }
  
        });
      }
      React.useEffect(() => {
        getLabType();
        getPatient();
        getLabXrayByID(id);
    
        //getDepartmentByRole();
      }, []);

      //image
      const handleImageChange = (event: any) => {
        const image = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            const base64Data = reader.result;
            setImageString(base64Data)
        }
      }
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
        const id = event.target.id as keyof typeof UpdateLabXrayNew;
    
        const { value } = event.target;
    
        setLabXray({ ...labxray, [id]: value });
      };
    
      const handleChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof labxray;
        setLabXray({
          ...labxray,
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
      return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" >
          <Snackbar
            id="success"        
            open={success}
            autoHideDuration={3000}
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
                    Update Record Lab X-Ray Information
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Grid container spacing={3} style={{ marginLeft: "5%"}}>
              <Grid item xs={10}>
                        <FormControl fullWidth variant='outlined'>
                            <p>Lab X-Ray</p>
                            <Select
                                native
                                value={labxray.ID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "ID"
                                }}
                                disabled // lock text bok
                            >
                                <option aria-label="None" value="">
                                    {labxray.ID}
                                </option>
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
              <Grid container spacing={1} sx={{ padding: 1 }} style={{ marginLeft: "25%"}}>
              <Grid item xs={5}>
                <FormControl fullWidth variant="outlined">
                  <p>Film X-Ray</p>
                <img src={`${imageString}`} width="500" height="500"/>
                <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                  
                </FormControl>
              </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ padding: 1 }} style={{ marginLeft: "6%"}}>
              <Grid item xs={10}>
                <FormControl fullWidth variant="outlined">
                  <p>Description</p>

                  <TextField
                    id="Description"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={labxray.Description || ""}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: 2 }} style={{ marginLeft: "4.5%"}}>
              <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                <p>Lab type</p>
                <Select
                                native
                                value={labxray.LabTypeID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "LabTypeID"
                                }}
                            >
                                <option aria-label="None" value="">
                                กรุณา เลือกชนิดของแลป
                                </option>
                                {
                                    labtype.map((item: LabTypeInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>)
                                    )
                                }
                            </Select>
                </FormControl>
            </Grid>
            <Grid item xs={5}>
                    <FormControl fullWidth variant="outlined">
                        <p>Patient</p>

                        <Select
                                native
                                value={labxray.PatientID}
                                onChange={handleChange}
                                size="medium"
                                inputProps={{
                                    name: "PatientID"
                                }}
                            >
                                <option aria-label="None" value="">
                                เลือกเพศ
                                </option>
                                {
                                    patient.map((item: PatientInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.FirstName+" "+item.LastName}
                                    </option>)
                                    )
                                }
                            </Select>
                    </FormControl>
                </Grid>
        </Grid>
  
                
                <Grid container spacing={2} sx={{ padding: 2 }} style={{ marginLeft: "5%"}}>
              <Grid item xs={4}>
                  <Button component={RouterLink} to="/labxray" variant="contained">
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



 