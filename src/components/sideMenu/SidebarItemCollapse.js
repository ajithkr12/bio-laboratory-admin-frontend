import React , {useState,useContext,useEffect} from 'react'

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { ContextConsumer } from "../../utils/Context";
import { colors } from '../../constants/ConstantColors';

const SidebarItemCollapse = (props) => {
  const {item} = props
  const [open, setOpen] = useState(false);

  // const { appState } = useSelector((state: RootState) => state.appState);
  const {mainPage,setMainPage, sideMenuOpen, setSideMenuOpen, megaMenu ,setMegaMenu,appState} = useContext(ContextConsumer);


const handleClick = () => {
  setOpen(!open);
  // setMainPage(item)
};

// useEffect(() => {
//   if (appState.includes(item.state)) {
//     setOpen(true);
//   }
// }, [appState, item]);



  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={handleClick}
          sx={{
            "&: hover": {
              backgroundColor: colors.sideBar_item_bg_hover,
              color:colors.sideBar_font_hover
            },
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
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;