import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Divider } from '@mui/material';
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EmployeeInterface } from "../../interfaces/employee/IEmployee";
import { ListEmployees,DeleteEmployee, } from "../../services/EmployeeSystem/employeeServices";
import { info } from "console";
function Manage_Show() {
  let theme = createTheme({ // ิbutton theme
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
      },
      info:{
        main: "#d8e2dc"
      }
    },
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

   React.useEffect(() => {
       getEmployee();

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
       let res = await DeleteEmployee(deleteID)
       if (res) {
           console.log(res.data)
       } else {
           console.log(res.data)
       }
       getEmployee();
       setOpenDelete(false)

   }

 useEffect(() => {
   getEmployee();
 }, []);

 return (
<ThemeProvider theme={theme}>
  <div>
  <Container maxWidth="xl">
  <Paper
  sx = {{
    maxWidth:"xl",
    Width:3000,
    bgcolor: '#F0EEED'
  }}
  >
  <Box
        display="flex"
        sx={{
          marginTop: 5,
        }}
      >
        <Box flexGrow={1} 
        sx={{
          marginTop: 3,
          marginLeft:3,
          // bgcolor: '#F0EEED'
        }}>
          <Typography
            component="h4"
            variant="h4"
            // color="#AD8E70"
            color="text"
            gutterBottom
          >
            Record Employee Information
          </Typography>
        </Box>

        <Box
        sx={{
          marginTop: 3,
          marginRight:3,
          marginBottom:3,
        }}>
          <Button 
            component={RouterLink}
            to="/employee/create"
            variant="contained"
            color="primary"
          >
            <Typography
              color="text"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create Employee

            </Typography>
          </Button>
        </Box>
        
      </Box>
      <Divider/>
        <div>
        
          <Container maxWidth="lg">
            <div style={{ height: "100%", width: "100%", marginTop: "10px" }}>
              <TableContainer >
                <Table aria-label="simple table">
                  <TableHead>
                    {/* หัวข้อตาราง */}
                    <TableRow>
                      <TableCell align="center" width="1%"> ID </TableCell>
                      <TableCell align="center" width="5%"> First Name </TableCell>
                      <TableCell align="center" width="5%"> Last Name </TableCell>
                      <TableCell align="center" width="10%"> Identification Number </TableCell>
                      <TableCell align="center" width="10%"> Phone </TableCell>
                      <TableCell align="center" width="10%"> Email </TableCell>
                      <TableCell align="center" width="25%"> Address </TableCell>
                      <TableCell align="center" width="15%"> Role </TableCell>
                      <TableCell align="center" width="10%"> Department </TableCell>
                      <TableCell align="center" width="10%"> Gender </TableCell>
                      <TableCell align="center" width="10%"> Edit </TableCell>
                      <TableCell align="center" width="10%"> Delete </TableCell>

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
              <Box>
          </Box>
              <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลของพนักงาน ${employee.filter((emp) => (emp.ID === deleteID)).at(0)?.FirstName +" "+employee.filter((emp) => (emp.ID === deleteID)).at(0)?.LastName} จริงหรือไม่`}
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
        </Paper>
  </Container>
 </div>
</ThemeProvider>
 );
}
export default Manage_Show;

