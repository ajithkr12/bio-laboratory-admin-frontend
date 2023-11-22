import React , {useContext,useEffect} from 'react'

import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { ContextConsumer } from "../../utils/Context";
import { colors } from '../../constants/ConstantColors';

const SidebarItem = (props) => {
  const {item} = props

  const {mainPage,setMainPage, sideMenuOpen, setSideMenuOpen, megaMenu ,setMegaMenu,appState} = useContext(ContextConsumer);


 
  
  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: colors.sideBar_item_bg_hover,
            color:colors.sideBar_font_hover
          },
          backgroundColor: appState === item.state ? colors.sideBar_item_bg_active : "unset",
          paddingY: "12px",
          paddingX: "24px",
          color:colors.sideBar_font

        }}
      >
        <ListItemIcon sx={{
          color: colors.sideBar_font
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;