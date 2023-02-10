import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
// import { WatchVideoInterface } from "../interfaces/IWatchVideo";
import { VitalSignsInterface } from "../../interfaces/vitalSign/IVitalSignsRecord";
// import { DeleteVitalSignsRecord, GetVitalSignsRecords } from "../services/HttpClientService";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//import { GetResearchRooms } from "../services/HttpClientService";
import { ListStatuses, PostVitalSign, UpdateVitalsign, ListVitalsigns, DeleteVitalsign } from '../../services/VitalSignSystem/VitalSignsServices'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Pigments.css"

export default function VitalSignsList() {
  let theme = createTheme({ // button theme
      palette: {
          primary: {
            main: '#648c8a', //เขียว
          },
          secondary: {
            main: '#edf2ff', //ขาว
          },
      },
  });

  //Vitalsign State
 const [vitalsign, setVitalsign] = React.useState<VitalSignsInterface[]>([])
 const getVitalsign = async () => {
     let res = await ListVitalsigns();
     if (res) {
         setVitalsign(res)
         //debug
         console.log(res)
     }
 }
 
 //For Delete state 
 const [deleteID, setDeleteID] = React.useState<number>(0)

 // For Set dialog open
 const [openDelete, setOpenDelete] = React.useState(false);

 React.useEffect(() => {
  getVitalsign();

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
      let res = await DeleteVitalsign(deleteID)
      if (res) {
          console.log(res.data)
      } else {
          console.log(res.data)
      }
      getVitalsign();
      setOpenDelete(false)

  }

  const convertDateFormat = (date: Date) => {
      const newDate = new Date(date)
      return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
  }
  
return (
  <ThemeProvider theme={theme}>
    <div>
    {/* <Paper elevation={3}/> */}
    <Container maxWidth="xl">
    <Box
      display="flex"
      sx={{
        marginTop: 2,
      }}
    >
          <Box flexGrow={1}>
            <Typography
              // component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              <h3>Vital Signs List Information</h3>
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
                        <TableCell align="center" width="9%"> Patient </TableCell>
                        <TableCell align="center" width="7%"> Blood Pressure High </TableCell>
                        <TableCell align="center" width="7%"> Blood Pressure Low </TableCell>
                        <TableCell align="center" width="5%"> Pulse Rate </TableCell>
                        <TableCell align="center" width="6%"> Respiration Rate </TableCell>
                        <TableCell align="center" width="7%"> Body Temperature </TableCell>
                        <TableCell align="center" width="3%"> Status </TableCell>
                        <TableCell align="center" width="5%"> Date </TableCell>
                        <TableCell align="center" width="3%"> Update </TableCell>
                        <TableCell align="center" width="3%"> Delete </TableCell>
  
                      </TableRow>
                    </TableHead>
                    <TableBody>
                  {vitalsign.map((item: VitalSignsInterface) => (
                    <TableRow 
                      key={item.ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{item.ID}</TableCell>
                      <TableCell align="center">{item.Patient?.FirstName + " "+item.Patient?.LastName}</TableCell>
                      <TableCell align="center">{item.BloodPressureHigh}</TableCell>
                      <TableCell align="center">{item.BloodPressureLow}</TableCell>
                      <TableCell align="center">{item.PulseRate}</TableCell>
                      <TableCell align="center">{item.RespirationRate}</TableCell>
                      <TableCell align="center">{item.BodyTemperature}</TableCell>
                      <TableCell align="center">
                                <div>
                                    <span className={
                                        (item.StatusID === 1) ? "green-dot" : ((item.StatusID === 2) ? "yellow-dot" : ((item.StatusID === 3) ? "red-dot" : "offline-dot"))
                                    }></span>
                                    {/* {item.Status?.Status} */}
                                </div>
                      </TableCell>
                     
                      <TableCell align="center">{moment(item.CheckDate).format("DD/MM/YYYY")}</TableCell>
                      <TableCell align="center">
                                              {
                                                  <Button
                                                      variant='outlined'
                                                      color='warning'
                                                      component={RouterLink}
                                                      to={"/vitalsign/update/" + item.ID}
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
              to="/vitalsign/create"
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
                // sx = {{borderRadius: 3,'&:hover': {backgroundColor: '#70c4bc'}}}
              >
                Vital Signs Record
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
                  {`คุณต้องการลบข้อมูลสัญญาณชีพที่ ${vitalsign.filter((vtr) => (vtr.ID === deleteID)).at(0)?.ID} จริงหรือไม่`}
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
    