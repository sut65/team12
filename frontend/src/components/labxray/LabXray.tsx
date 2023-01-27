import {Container,Box,Snackbar,TextField,Paper,Card,CardActionArea,CardContent,CardMedia,Fab} from "@mui/material";
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText, DialogActions,Grid,Alert,createTheme, ThemeProvider,Autocomplete,FormControl,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography  } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import { LabTypeInterface } from "../../interfaces/LabXray/ILabType";
import { LabXrayInterface } from "../../interfaces/LabXray/ILabXray";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { Link as RouterLink } from "react-router-dom";
import { 
    ListLabTypes, 
    ListLabXrays,
    GetLabType,
    DeleteLabXray,
    UpdateEmployee,
    PostLabXray,
    GetLabXray,  } from "../../services/LabXraySystem/LabXrayServices";
export default function LabXrayShow() {
    let theme = createTheme({ // ิbutton theme
        palette: {
            primary: {
              main: '#648c8a', //เขียว
            },
            secondary: {
              main: '#edf2ff', //ขาว
            },
        },
    });

    //Employee State
   const [labxray, setLabXray] = React.useState<LabXrayInterface[]>([])
   const getLabXray = async () => {
       let res = await ListLabXrays();
       if (res) {
           setLabXray(res)
           //debug
           console.log(res)
       }
   }
   // image
   const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
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
   //For Delete state 
   const [deleteID, setDeleteID] = React.useState<number>(0)

   // For Set dialog open
   const [openDelete, setOpenDelete] = React.useState(false);

   React.useEffect(() => {
    getLabXray();

    }, [])

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }

    const handleDelete = async () => {
        let res = await DeleteLabXray(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getLabXray();
        setOpenDelete(false)
 
    }

    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
    }
    
 return (
    <ThemeProvider theme={theme}>
      <div>
      <Container maxWidth="xl">
      <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Lab X-Ray
              </Typography>
            </Box>
    
            <Box>
              <Button 
                component={RouterLink}
                to="/labxray/create"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Create Lab X-Ray
    
                </Typography>
              </Button>
            </Box>
          </Box>
            <div>
              <Container maxWidth="xl">
                <div style={{ height: 500, width: "150%", marginTop: "50px" }}>
                  <TableContainer >
                    <Table aria-label="simple table">
                      <TableHead>
                        {/* หัวข้อตาราง */}
                        <TableRow>
                          <TableCell align="center" width="1%"> ID </TableCell>
                          <TableCell align="center" width="15%"> Doctor </TableCell>
                          <TableCell align="center" width="15%"> Patient </TableCell>
                          <TableCell align="center" width="5%"> LabType </TableCell>
                          <TableCell align="center" width="15%"> Description </TableCell>
                          <TableCell align="center" width="20%"> Date </TableCell>
                          <TableCell align="center" width="20%"> Picture </TableCell>
                          <TableCell align="center" width="5%"> Update </TableCell>
                          <TableCell align="center" width="5%"> Delete </TableCell>
    
                        </TableRow>
                      </TableHead>
                      <TableBody>
                    {labxray.map((item: LabXrayInterface) => (
                      <TableRow 
                        key={item.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Doctor?.FirstName + " "+item.Doctor?.LastName}</TableCell>
                        <TableCell align="center">{item.Patient?.FirstName + " "+item.Patient?.LastName}</TableCell>
                        <TableCell align="center">{item.LabType?.Name}</TableCell>
                        <TableCell align="center">{item.Description}</TableCell>
                        <TableCell align="center">{convertDateFormat(item.Date)}</TableCell>
                        <TableCell align="center">{
                            <img src={`data:image/jpeg;base64,${item.Pic}`} width="200" height="200"/>
                            //<input type="file" onChange={handleImageChange} />
                        
                        }</TableCell>
                        <TableCell>
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/employee/update/" + item.ID}
                                                    >
                                                        Update
                                                    </Button>

                                                }
                                            </TableCell>
                        <TableCell align="center">
                            {
                                <Button variant='outlined' color='error' onClick={() => { handleDialogDeleteOpen(item.ID) }}>Delete</Button>
                            }
                                        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                    
                    </Table>
                    </TableContainer>
                    </div>
            </Container>
            </div>
            <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลแลป ${labxray.filter((lab) => (lab.ID === deleteID)).at(0)?.ID} จริงหรือไม่`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                    <Button onClick={handleDelete} className="bg-red" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>

            </Dialog>
    </Container>
    </div>
    </ThemeProvider>


);
}