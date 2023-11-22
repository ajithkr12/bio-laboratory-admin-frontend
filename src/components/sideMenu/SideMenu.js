import React, { useContext } from "react";
import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ContextConsumer } from "../../utils/Context";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import appRoutes from "../../routes/appRoutes";
import { colors } from "../../constants/ConstantColors";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const SideMenu = () => {
  const { mainPage, setMainPage, sideMenuOpen, setSideMenuOpen, megaMenu } =
    useContext(ContextConsumer);

  return (
    <Drawer
      variant="persistent"
      open={sideMenuOpen}
      anchor="left"
      sx={{
        width: 340,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 340,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colors.sideBar_bg,
          // color: "#ffffff",
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
            {/* <Avatar src={assets.images.logo} /> */}
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default SideMenu;

// const TopSection = ({ megaMenu, mainPage, setMainPage }) => (
//     <List>
//       {megaMenu.list.map(
//         (item, index) =>
//           item.show &&
//           !item.showInBottomMenu && (
//             <ListItem key={item.name}>
//               <ListItemButton
//                 style={{
//                   backgroundColor: item.route === mainPage ? "#9898e3" : "#ffff",
//                   // borderRadius: "10px",
//                 }}
//                 onClick={() => {
//                   console.log("item.route:", item.route);
//                   setMainPage(item.route);
//                 }}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </ListItemButton>
//             </ListItem>
//           )
//       )}
//     </List>
//   );
