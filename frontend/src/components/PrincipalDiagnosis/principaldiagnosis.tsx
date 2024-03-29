import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ListPrincipalDiagnosis,DeletePrincipalDiagnosis, ListEmployee,  ListLoD, CreatePrincipalDiagnosis } from "../../services/PrincipalDiagnosis/HttpPrincipaldiagnosis";

function Manage_Show() {
  
  const themeshow = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#3ba299",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#e8f5e9",
      },
    }
  });
  
     //PrincipalDiagnosis State
     const [principaldiagnosis, setPrincipalDiagnosis] = React.useState<PrincipalDiagnosisInterface[]>([])
     const getPrincipalDiagnosis = async () => {
         let res = await ListPrincipalDiagnosis();
         if (res) {
            setPrincipalDiagnosis(res)
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
         getPrincipalDiagnosis();
  
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
         let res = await DeletePrincipalDiagnosis(deleteID)
         if (res) {
             console.log(res.data)
         } else {
             console.log(res.data)
         }
         getPrincipalDiagnosis();
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
     getPrincipalDiagnosis();
   }, []);
  
      
  
  
  
  
  
   return (
  <ThemeProvider theme={themeshow}>
    <div>
    <Container maxWidth="lg">
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
              ข้อมูลบันทึกผลการวินิจฉัย
            </Typography>
          </Box>
  
          <Box>
            <Button 
              component={RouterLink}
              to="/principaldiagnosis/create"
              variant="contained"
              color="primary"
            >
              <Typography
                color="secondary"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                ปุ่มบันทึกผลการวินิจฉัย
  
              </Typography>
            </Button>
          </Box>
        </Box>
          <div>
            <Container maxWidth="lg">
              <div style={{ height: 800, width: "120%", marginTop: "50px" }}>
                <TableContainer >
                  <Table aria-label="simple table">
                    <TableHead>
                      {/* หัวข้อตาราง */}
                      <TableRow>
                        <TableCell align="center" width="10%"> ID </TableCell>
                        <TableCell align="center" width="10%"> Doctor  </TableCell>
                        <TableCell align="center" width="10%"> Patient </TableCell>
                        <TableCell align="center" width="10%"> Level of Disease</TableCell>
                        <TableCell align="center" width="10%"> Note </TableCell>
                        <TableCell align="center" width="10%"> Date </TableCell>
                        <TableCell align="center" width="10%"> Update </TableCell>
                        <TableCell align="center" width="10%"> Delete </TableCell>
  
                      </TableRow>
                    </TableHead>
                    
                    <TableBody>
                      {principaldiagnosis.map((item: PrincipalDiagnosisInterface) => (
                        <TableRow 
                          key={item.ID}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{item.ID}</TableCell>
                          <TableCell align="center">{item.Doctor?.FirstName + " "+item.Doctor?.LastName}</TableCell>
                          <TableCell align="center">{item.Patient?.FirstName + " "+item.Patient?.LastName}</TableCell>
                          <TableCell align="center">{item.LoD?.Disease}</TableCell>
                          <TableCell align="center">{item.Note}</TableCell>
                          <TableCell align="center">{moment(item.Date).format("DD/MM/YYYY")}</TableCell>
                         
                          <TableCell>
                                                  {
                                                      <Button
                                                          variant='outlined'
                                                          color='warning'
                                                          component={RouterLink}
                                                          to={"/principaldiagnosis/update/" + item.ID}
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
                      {`คุณต้องการลบข้อมูลบันทึกการวินิจฉัย ${principaldiagnosis.filter((pd) => (pd.ID === deleteID)).at(0)?.ID} จริงหรือไม่`}
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
  
  