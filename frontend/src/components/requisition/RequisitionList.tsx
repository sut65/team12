import {Container,Box,Snackbar,TextField,Paper,Card,CardActionArea,CardContent,CardMedia,Fab} from "@mui/material";
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText, DialogActions,Grid,Alert,createTheme, ThemeProvider,Autocomplete,FormControl,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import { LabTypeInterface } from "../../interfaces/LabXray/ILabType";
import { RequisitionRecordInterface } from "../../interfaces/requisitionRecord/IRequisitionRecord";
import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import {  
    ListRequisitions,
    DeleteRequisition,
    UpdateRequisition,
} from "../../services/RequisitionSystem/RequisitionServices";
export default function RequisitionList() {
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

    //requisition State
   const [requisition, setRequisition] = React.useState<RequisitionRecordInterface[]>([])
   const getRequisition = async () => {
       let res = await ListRequisitions();
       if (res) {
           setRequisition(res)
           //debug
           console.log(res)
       }
   }
   // image
//    const [imageString, setImageString] = React.useState<string | ArrayBuffer | null>(null);
//    //image
//   const handleImageChange = (event: any) => {
//     const image = event.target.files[0];

//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onload = () => {
//       const base64Data = reader.result;
//       setImageString(base64Data)
//     }
//   }
   //For Delete state 
   const [deleteID, setDeleteID] = React.useState<number>(0)

   // For Set dialog open
   const [openDelete, setOpenDelete] = React.useState(false);

   React.useEffect(() => {
    getRequisition();

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
        let res = await DeleteRequisition(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getRequisition();
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
                variant="h6"
                color="primary"
                gutterBottom
              >
                <h3>Requisition Equipment and Supplies</h3>
              </Typography>
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
                          <TableCell align="center" width="10%"> Nurse </TableCell>
                          <TableCell align="center" width="15%"> Department </TableCell>
                          <TableCell align="center" width="10%"> Equipment </TableCell>
                          <TableCell align="center" width="2%"> Quantity </TableCell>
                          <TableCell align="center" width="5%"> Date </TableCell>   
                          <TableCell align="center" width="5%"> Update </TableCell>
                          <TableCell align="center" width="5%"> Delete </TableCell>
    
                        </TableRow>
                      </TableHead>
                      <TableBody>
                    {requisition.map((item: RequisitionRecordInterface) => (
                      <TableRow 
                        key={item.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Employee?.FirstName + " "+item.Employee?.LastName}</TableCell>
                        <TableCell align="center">{item.DepartmentForEquipment?.Type}</TableCell>
                        <TableCell align="center">{item.Equipment?.Name}</TableCell>
                        <TableCell align="center">{item.Quantity}</TableCell>
                        <TableCell align="center">{moment(item.RequisitionDate).format("DD/MM/YYYY")}</TableCell>
                        
                        <TableCell align="center">
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/requisition/update/" + item.ID}
                                                    >
                                                        Update
                                                    </Button>

                                                }
                                            </TableCell>
                        <TableCell align="center">
                          {
                              <IconButton color='error' onClick={() => { handleDialogDeleteOpen(item.ID) }}>
                                  <DeleteIcon fontSize="inherit" />
                              </IconButton>
                          }         
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            <Grid container spacing={3} sx={{ padding: 2 }} >
              <Grid item xs={10}>
              <Box>
                <Button 
                  component={RouterLink}
                  to="/requisition/create"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 3,
                  }}
                >
                  <Typography
                    color="secondary"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    Create Requisition
                  </Typography>
                </Button>
              </Box>
              </Grid>
            </Grid>
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
                    {`คุณต้องการลบข้อมูลเบิกอุปกรณ์ทางการเเพทย์ที่ ${requisition.filter((requisition) => (requisition.ID === deleteID)).at(0)?.ID} จริงหรือไม่`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        หากคุณลบข้อมูลนี้แล้ว คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleDialogDeleteclose}
                    sx={{borderRadius: 15.5,'&:hover': { backgroundColor: '#336666'}}} >ยกเลิก
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{borderRadius: 15.5,'&:hover': { backgroundColor: '#FF0000'}}}
                  >
                      ยืนยัน
                  </Button>
                </DialogActions>

            </Dialog>
    </Container>
    </div>
    </ThemeProvider>
  );
}