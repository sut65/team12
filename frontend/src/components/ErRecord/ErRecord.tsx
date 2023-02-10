import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PrincipalDiagnosisInterface } from "../../interfaces/principaldiagnosis/IPrincipalDiagnosis";
import { ErRecordInterface } from "../../interfaces/errecord/IErRecord";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
// import { ListPrincipalDiagnosis, DeletePrincipalDiagnosis } from "../../services/HttpPrincipaldiagnosis";
import { ListErRecord, DeleteErRecord } from "../../services/ErRecord/HttpErRecord";
function Er_Record() {
  
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

 //ErRecord State
 const [errecord, setErRecord] = React.useState<ErRecordInterface[]>([])
 const getErRecord = async () => {
     let res = await ListErRecord();
     if (res) {
        setErRecord(res)
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
     getErRecord();

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
     let res = await DeleteErRecord(deleteID)
     if (res) {
         console.log(res.data)
     } else {
         console.log(res.data)
     }
     getErRecord();
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
 getErRecord();
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
          ข้อมูลการจองห้องพิเศษ
        </Typography>
      </Box>

      <Box>
        <Button 
          component={RouterLink}
          to="/errecord/create"
          variant="contained"
          color="primary"
        >
          <Typography
            color="secondary"
            component="div"
            sx={{ flexGrow: 1}}
          >
            ปุ่มจองห้องพิเศษ

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
                    <TableCell align="center" width="10%"> Employee  </TableCell>
                    <TableCell align="center" width="10%"> Patient </TableCell>
                    <TableCell align="center" width="10%"> ประเภทห้องพิเศษ</TableCell>
                    <TableCell align="center" width="10%"> ห้อง </TableCell>
                    <TableCell align="center" width="10%"> Description </TableCell>
                    <TableCell align="center" width="10%"> Date </TableCell>
                    <TableCell align="center" width="10%"> Update </TableCell>
                    <TableCell align="center" width="10%"> Delete </TableCell>

                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {errecord.map((item: ErRecordInterface) => (
                    <TableRow 
                      key={item.ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{item.ID}</TableCell>
                      <TableCell align="center">{item.Employee?.FirstName}</TableCell>
                      <TableCell align="center">{item.Patient?.FirstName}</TableCell>
                      <TableCell align="center">{item.ToE?.Roomtype}</TableCell>
                      <TableCell align="center">{item.Room?.Roomname}</TableCell>
                      <TableCell align="center">{item.Description}</TableCell>
                      
                      <TableCell align="center">{moment(item.Date).format("DD/MM/YYYY")}</TableCell>
                     
                      <TableCell>
                                              {
                                                  <Button
                                                      variant='outlined'
                                                      color='warning'
                                                      component={RouterLink}
                                                      to={"/errecord/update/" + item.ID}
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
                  {`คุณต้องการลบข้อมูลการจองห้องพิเศษ ${errecord.filter((errec) => (errec.ID === deleteID)).at(0)?.ID} จริงหรือไม่`}
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
export default Er_Record;

