import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { PatientInterface } from "../../interfaces/patient/IPatient";
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { SFTInterface } from "../../interfaces/sft/ISFT";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListSFTs,DeleteSFT, } from "../../services/SFT/sftServices";

function Manage_Show() {
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

   //SFT State
   const [sft, setSFT] = React.useState<SFTInterface[]>([])
   const getSFT = async () => {
       let res = await ListSFTs();
       if (res) {
           setSFT(res)
           //debug
           // console.log(res)
       }
   }

   //For Delete state 
   const [deleteID, setDeleteID] = React.useState<number>(0)
   // For Set dialog open
   const [openDelete, setOpenDelete] = React.useState(false);
   const [openUpdate, setOpenUpdate] = React.useState(false);
   const [editID, setEditID] = React.useState(0);

   React.useEffect(() => {
       getSFT();

   }, [])

   const convertDateFormat = (date: Date) => {
       const newDate = new Date(date)
       return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
   }

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
       let res = await DeleteSFT(deleteID)
       if (res) {
           console.log(res.data)
       } else {
           console.log(res.data)
       }
       getSFT();
       setOpenDelete(false)

   }

   const handleDialogUpdateclose = async () => {
       setOpenUpdate(false)
       setTimeout(() => {
           setEditID(0)
       }, 500)
   }

   const handleDialogUpdateOpen = async (ID: number) => {
       setEditID(ID)
       setOpenUpdate(true)
   }
 useEffect(() => {
   getSFT();
 }, []);

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
            SFT
          </Typography>
        </Box>

        <Box>
          <Button 
            component={RouterLink}
            to="/sft/create"
            variant="contained"
            color="primary"
          >
            <Typography
              color="text"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create SFT

            </Typography>
          </Button>
        </Box>
      </Box>
        <div>
          <Container maxWidth="xl">
            <div style={{ height: 500, width: "120%", marginTop: "50px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                  <TableHead>
                    {/* หัวข้อตาราง */}
                    <TableRow>
                      <TableCell align="center" width="20%"> ID </TableCell>
                      <TableCell align="center" width="20%"> Patient </TableCell>
                      <TableCell align="center" width="20%"> PrincipalDiagnosisID </TableCell>
                      <TableCell align="center" width="20%"> FoodTypeID </TableCell>
                      <TableCell align="center" width="20%"> DoctorID </TableCell>
                      <TableCell align="center" width="20%"> Date </TableCell>
                      <TableCell align="center" width="100%"> Description </TableCell>
                      <TableCell align="center" width="20%"> Edit </TableCell>
                      <TableCell align="center" width="20%"> Delete </TableCell>
                      

                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {sft.map((item: SFTInterface) => (
                      <TableRow 
                        key={item.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Patient?.Civ}</TableCell>
                        <TableCell align="center">{item.PrincipalDiagnosisID}</TableCell>
                        <TableCell align="center">{item.FoodTypeID}</TableCell>
                        <TableCell align="center">{item.DoctorID}</TableCell>
                        <TableCell align="center">{moment(item.Date).format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="center">{item.Description}</TableCell>
                        <TableCell>
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/sft/update/" + item.ID}
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
              <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลเเจ้งรายการอาหาร ${sft.filter((emp) => (emp.ID === deleteID)).at(0)?.Patient} จริงหรือไม่`}
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
            </div>
          </Container>
        </div>
  </Container>
 </div>
</ThemeProvider>
 );
}
export default Manage_Show;

