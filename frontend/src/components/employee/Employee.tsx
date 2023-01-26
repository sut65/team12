import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListEmployees,DeleteEmployee, } from "../../services/EmployeeSystem/employeeServices";
function Manage_Show() {
const themeshow = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[800],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#e8f5e9",
    },
  }
});

   //Employee State
   const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
   const getEmployee = async () => {
       let res = await ListEmployees();
       if (res) {
           setEmployee(res)
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
       getEmployee();

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
       let res = await DeleteEmployee(deleteID)
       if (res) {
           console.log(res.data)
       } else {
           console.log(res.data)
       }
       getEmployee();
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
   getEmployee();
 }, []);

 return (
<ThemeProvider theme={themeshow}>
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
            Employee
          </Typography>
        </Box>

        <Box>
          <Button 
            component={RouterLink}
            to="/employee/create"
            variant="contained"
            color="success"
          >
            <Typography
              color="secondary"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create Employee

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
                      <TableCell align="center" width="20%"> First Name </TableCell>
                      <TableCell align="center" width="20%"> Last Name </TableCell>
                      <TableCell align="center" width="20%"> Civ </TableCell>
                      <TableCell align="center" width="20%"> Phone </TableCell>
                      <TableCell align="center" width="20%"> Email </TableCell>
                      <TableCell align="center" width="100%"> Address </TableCell>
                      <TableCell align="center" width="20%"> Role </TableCell>
                      <TableCell align="center" width="20%"> Department </TableCell>
                      <TableCell align="center" width="20%"> Gender </TableCell>
                      <TableCell align="center" width="20%"> Edit </TableCell>
                      <TableCell align="center" width="20%"> Delete </TableCell>

                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {employee.map((item: EmployeeInterface) => (
                      <TableRow 
                        key={item.ID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{item.ID}</TableCell>
                        <TableCell align="center">{item.FirstName}</TableCell>
                        <TableCell align="center">{item.LastName}</TableCell>
                        <TableCell align="center">{item.Civ}</TableCell>
                        <TableCell align="center">{item.Phone}</TableCell>
                        <TableCell align="center">{item.Email}</TableCell>
                        <TableCell align="center">{item.Address}</TableCell>
                        <TableCell align="center">{item.Role?.Name}</TableCell>
                        <TableCell align="center">{item.Department?.Type}</TableCell>
                        <TableCell align="center">{item.Gender?.Name}</TableCell>
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
              <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลของพนักงาน ${employee.filter((emp) => (emp.ID === deleteID)).at(0)?.FirstName} จริงหรือไม่`}
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

