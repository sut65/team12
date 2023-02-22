
import './App.css';
import SignIn from './components/SignIn';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import VideoLabelSharpIcon from '@mui/icons-material/VideoLabelSharp';
import Home from './components/Home';
import ManageBed from './components/managebed/ManageBed';
import ManageBedCreate from './components/managebed/ManageBedCreate';
import ManageBedUpdate from './components/managebed/ManageBedUpdate';
import MedicalSlip from './components/medicalslip/MedicalSlip';
import MedicalSlipCreate from './components/medicalslip/MedicalSlipCreate';
import  Employee from './components/employee/Employee';
import EmployeeCreateNew from './components/employee/EmployeeCreateNew';
import EmployeeEdit from './components/employee/EmployeeEdit';
import LabXray from './components/labxray/LabXray';
import LabXrayCreate from './components/labxray/LabXrayCreate';
import LabXrayUpdate from './components/labxray/LabXrayUpdate';
import BoyIcon from '@mui/icons-material/Boy';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Patient from './components/Patient/PatientList';
import PatientCreate from './components/Patient/PatientCreate';
import PatientEdit from './components/Patient/PatientEdit';
import Prescription from './components/Prescription/PrescriptionList';
import PrescriptionDelete from './components/Prescription/PrescriptionDelete';
import PrescriptionCreate from './components/Prescription/PrescriptionCreate';
import PrescriptionEdit from './components/Prescription/PrescriptionEdit';
import MST from './components/mst/MST';
import MSTCreateNew from './components/mst/MSTCreateNew';
import MSTEdit from './components/mst/MSTEdit';
import SFT from './components/sft/SFT';
import SFTCreateNew from './components/sft/SFTCreateNew';
import SFTEdit from './components/sft/SFTEdit';
import VitalSignsCreate from './components/vitalsigns/VitalSignsCreate';
import VitalSignsList from './components/vitalsigns/VitalSignsList';
import RequisitionList from './components/requisition/RequisitionList';
import RequisitionCreate from './components/requisition/RequisitionCreate';
import VitalSignsEdit from './components/vitalsigns/VitalSignsEdit';
import RequisitionEdit from './components/requisition/RequisitionEdit';
import PrincipalDiagnosisUpdate from './components/PrincipalDiagnosis/principalUpdate';
import NongGeeCreate from './components/PrincipalDiagnosis/NongGeeCreate';
import PrincipalDiagnosis from './components/PrincipalDiagnosis/principaldiagnosis';
import Er_Record from './components/ErRecord/ErRecord';
import ErRecordCreate from './components/ErRecord/ErRecordCreate';
import ErRecordUpdate from './components/ErRecord/ErRecordUpdate';
import ORrecord from './components/operatingrecord/ORrecord';
import ORrecordCreate from './components/operatingrecord/ORrecordCreate';
import ORrecordUpdate from './components/operatingrecord/ORrecordUpdate';
import ProblemReport from './components/reportproblem/ProblemReport';
import ProblemReportCreate from './components/reportproblem/ProblemReportCreate';
import ProblemReportUpdate from './components/reportproblem/ProblemReportUpdate';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
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
})

const menu = [
  { name: "  หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/home" , role: "Nurse"},
  { name: "  หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/home" , role: "HumanResourse"},
  { name: "  หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/home" , role: "Doctor"},
  { name: "  หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/home" , role: "Accounting"},
  { name: "  หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/home" , role: "Pharmacist"},
  { name: "  จัดการเตียงคนไข้", icon: <BedroomChildIcon color="primary" />, path: "/managebed" ,role: "Nurse"},
  { name: "  บันทึกค่ารักษา", icon: <LocalHospitalIcon color="primary"/>, path: "/medicalslip",role: "Nurse"},
  { name: "  พนักงาน", icon: <BadgeOutlinedIcon color="primary"/>, path: "/employee" ,role: "HumanResourse"},
  { name: "  แลปเอกซเรย์", icon: <VideoLabelIcon color="primary"/>, path: "/labxray" ,role: "Doctor"},
  { name: "  ลงทะเบียนผู้ป่วย", icon: <BoyIcon color="primary"/>, path: "/patients/list" ,role: "Nurse"},
  { name: "  ใบสั่งยา", icon: <ReceiptLongIcon color="primary"/>, path: "/prescription/list",role: "Pharmacist"},
  { name: "  คำร้องขอย้ายรพ.", icon: <TrendingFlatIcon color="primary"/>, path: "/mst" ,role: "Nurse"},
  { name: "  เเจ้งรายการอาหารผู้ป่วย", icon: <RestaurantIcon color="primary"/>, path: "/sft" ,role: "Doctor"},
  { name: "อุปกรณ์ทางการเเพทย์", icon: <MedicationLiquidIcon color="primary" />, path: "/requisition", role: "Nurse"},
  { name: "บันทึกสัญญาณชีพ", icon: <AssignmentSharpIcon color="primary" />, path: "/vitalsign", role: "Nurse"},
  { name: "  บันทึกเข้าใช้ห้องผ่าตัด", icon: <MonitorHeartIcon color="primary"/>, path: "/orrecord" ,role: "Nurse"},
  { name: "  แจ้งซ่อมบำรุง", icon: <BuildCircleIcon color="primary"/>, path: "/problemreport" ,role: "Nurse"},
  { name: " การจองห้องพิเศษ", icon: <BadgeOutlinedIcon color="primary"/>, path: "/errecord" ,role: "Nurse"},
  { name: " บันทึกผลการวินิจฉัย", icon: <BadgeOutlinedIcon color="primary"/>, path: "/principaldiagnosis" ,role: "Doctor"},
  

];
function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  //const [email, setEmail] = useState<string | null>();
  const [role, setRole] = useState<String| null>();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    //const email= localStorage.getItem("email");
    const role = localStorage.getItem("role")
    //console.log(email)
    if (token) {
      setToken(token);
      setRole(role);
    }
  }, []);
  

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                G12 : ระบบจัดการผู้ป่วยใน
              </Typography>
              <Button variant="outlined" color="inherit" onClick={signout}>
                Log out
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => (
                 //email == item.email &&
                 role == item.role &&
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>

              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home/>} />
                <Route  path="/managebed" element={<ManageBed />} />
                <Route  path="/managebed/create" element={<ManageBedCreate />} />
                <Route  path="/managebed/update" element={<ManageBedUpdate />} />
                <Route  path="/medicalslip" element={<MedicalSlip />} />
                <Route  path="/medicalslip/create" element={<MedicalSlipCreate />} />
                
                <Route  path="/employee" element={<Employee />} />
                <Route  path="/employee/create" element={<EmployeeCreateNew />} />
                <Route  path="/employee/update/:id" element={<EmployeeEdit />} />
                <Route  path="/labxray" element={<LabXray />} />
                <Route  path="/labxray/create" element={<LabXrayCreate />} />
                <Route  path="/labxray/update/:id" element={<LabXrayUpdate />} />
                <Route path="/patients/list" element={<Patient/>} />
                <Route path="/patient/create" element={<PatientCreate/>} />
                <Route path="/patient/edit" element={<PatientEdit/>} />
                <Route path="/prescription/list" element={<Prescription/>} />
                <Route path="/prescription/delete" element={<PrescriptionDelete/>} />
                <Route path="/prescription/create" element={<PrescriptionCreate/>} />
                <Route path="/prescription/edit" element={<PrescriptionEdit/>} />
                <Route  path="/mst" element={<MST />} />
                <Route  path="/mst/create" element={<MSTCreateNew />} />
                <Route  path="/mst/update/:id" element={<MSTEdit />} />
                <Route  path="/sft" element={<SFT />} />
                <Route  path="/sft/create" element={<SFTCreateNew />} />
                <Route  path="/sft/update/:id" element={<SFTEdit />} />
                <Route path="/requisition" element={<RequisitionList />} />
                <Route path="/requisition/create" element={<RequisitionCreate />} />
                <Route path="/requisition/update/:id" element={<RequisitionEdit />} />
                <Route path="/vitalsign" element={<VitalSignsList />} />
                <Route path="/vitalsign/create" element={<VitalSignsCreate />} />
                <Route path="/vitalsign/update/:id" element={<VitalSignsEdit />} />
                <Route path="/principaldiagnosis" element={<PrincipalDiagnosis/>} />
                <Route path="/principaldiagnosis/create" element={<NongGeeCreate/>} />
                <Route path="/principaldiagnosis/update/:id" element={<PrincipalDiagnosisUpdate/>} />
                <Route path="/errecord" element={<Er_Record/>} />
                <Route path="/errecord/create" element={<ErRecordCreate/>} />
                <Route path="/errecord/update/:id" element={<ErRecordUpdate/>} />
                <Route  path="/orrecord" element={<ORrecord />} />   
                <Route  path="/orrecord/create" element={<ORrecordCreate />} />
                <Route  path="/orrecord/update" element={<ORrecordUpdate />} /> 
                <Route  path="/problemreport" element={<ProblemReport />} /> 
                <Route  path="/problemreport/create" element={<ProblemReportCreate />} /> 
                <Route  path="/problemreport/update" element={<ProblemReportUpdate />} /> 
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
