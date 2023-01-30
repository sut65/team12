import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { PatientInterface } from "../../interfaces/patient/IPatient";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { MSTInterface } from "../../interfaces/mst/IMST";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListMSTs,DeleteMST, } from "../../services/MST/mstServices";

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

   //MST State
   const [mst, setMST] = React.useState<MSTInterface[]>([])
   const getMST = async () => {
       let res = await ListMSTs();
       if (res) {
           setMST(res)
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
       getMST();

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
       let res = await DeleteMST(deleteID)
       if (res) {
           console.log(res.data)
       } else {
           console.log(res.data)
       }
       getMST();
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
   getMST();
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
            MST
          </Typography>
        </Box>

        <Box>
          <Button 
            component={RouterLink}
            to="/mst/create"
            variant="contained"
            color="primary"
          >
            <Typography
              color="text"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create MST

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
                      <TableCell align="center" width="20%"> RegDate Time </TableCell>
                      <TableCell align="center" width="20%"> MSTDate Time </TableCell>
                      <TableCell align="center" width="20%"> NurseID </TableCell>
                      <TableCell align="center" width="20%"> DoctorID </TableCell>
                      <TableCell align="center" width="100%"> HospitalID </TableCell>
                      <TableCell align="center" width="20%"> Edit </TableCell>
                      <TableCell align="center" width="20%"> Delete </TableCell>

                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {mst.map((item: MSTInterface) => (
                      <TableRow 
                        key={item.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.Patient?.Civ}</TableCell>
                        <TableCell align="center">{moment(item.RegDateTime).format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="center">{moment(item.MSTDateTime).format("DD/MM/YYYY")}</TableCell>
                        <TableCell align="center">{item.NurseID}</TableCell>
                        <TableCell align="center">{item.DoctorID}</TableCell>
                        <TableCell align="center">{item.HospitalID}</TableCell>
                        <TableCell>
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/mst/update/" + item.ID}
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
                    {`คุณต้องการลบข้อมูลคำร้องขอย้ายโรงพยาบาล ${mst.filter((emp) => (emp.ID === deleteID)).at(0)?.Patient} จริงหรือไม่`}
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

