import React , {useContext,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/sideMenu/SideMenu";
// import Topbar from "../common/Topbar";
import { ContextConsumer } from '../utils/Context';
const MainPage = () => {
  const sidebarWidth =340;
  const {mainPage,setMainPage, sideMenuOpen, setSideMenuOpen, megaMenu ,setMegaMenu,userData ,setUserData} = useContext(ContextConsumer);
  const navigate = useNavigate();




  // const userDataFetch = async (_data) => {
  //   const _token = localStorage.getItem("token");
  //   console.log(_token)
  //   if(_token)
  //   {
  //     setHeader(_token)
  //     const response = await getUserDataFromAuthToken()
  //     if(response.success){
  //       console.log("response : ",response.message)
  //       setUserData(response.message)

  //     }
  //     else{
  //       navigate("/login");
  //     }
  //   }
  //   else{
  //     navigate("/login");
  //   }
  // };


  // useEffect(() => {

  //   userDataFetch()

  //   // EditorDataInitializer();
  // }, []);



  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box
        component="nav"
        sx={{
          width: sideMenuOpen ? sidebarWidth : 0,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: sideMenuOpen ? `calc(100% - ${sidebarWidth})` : "100%",
          height: "100vh",
          backgroundColor: "#ffffff"
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainPage;