import React, { useContext ,useEffect} from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {Stack,Avatar,Box,} from "@mui/material";
import { ContextConsumer } from "../utils/Context";
import logo from '../../src/assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import {colors} from "../constants/ConstantColors"
import { diamention } from "../constants/ConstantDiamentions";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,

  }),
  ...(open && {
    marginLeft: diamention.drawerWidth,
    width: `calc(100% - ${diamention.drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props) => {

  const {
    sideMenuOpen,
    setSideMenuOpen,
    notificationOpen,
    setNotificationOpen,
    userData
  } = useContext(ContextConsumer);

  console.log("USER NAV",userData)


  const handleDrawerOpen = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  const handleNotificationOpen = () => {
    // setNotificationOpen(!notificationOpen);
  };
  const handleLogout = () => {
    console.log("USER LOGOUT")
  };

  useEffect(() => {
    if(userData === undefined){
      return
    }
  }, [userData]);

  return (
    <AppBar
      position="fixed"
      open={sideMenuOpen}
      elevation={0}
      style={{ background: colors.navbar_bg, border: "none", zIndex: 1300,height:"6vh",justifyContent:'center'}}

    >
      <Toolbar>
        <IconButton
          color={"blue"}
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon style={{color:colors.nav_bar_menu_icon}}/>
        </IconButton>


            <Box sx={{ flexGrow: 1,}}>
            {/* <img src={logo} alt="logo" style={{ width: "104px" }} /> */}
            <p style={{color:'green'}}>Animal Conservation Ecology Lab</p>
            </Box>

  



        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Box
            style={{
              backgroundColor: colors.navbar_profile_bg,
              borderRadius: '50%',
              padding:1
            }}
          >
            <Avatar
              alt="profile user"
              sx={{
                width: 36,
                height: 36,
                color: colors.navbar_profile_icon,
                background: colors.navbar_profile_bg,
              }}
            />
          </Box>
          {/* <Box>
              <>
                <Typography
                  style={{ fontSize: "14px" }}
                  sx={{ color: colors.navbar_font }}
                >
                  {userData ? userData.email :''}
                </Typography>
                <Typography
                  style={{ fontSize: "10px" }}
                  sx={{ color: colors.navbar_font }}
                >
                 Admin -  {userData ? userData.hubId :''}

                </Typography>
              </>
          
          </Box> */}
        </Stack>
        <div style={{ width: 40 }} />
      </Toolbar>
    </AppBar>
    
  );

};
export default Header;
