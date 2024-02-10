import React, { useState,useContext } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ContextConsumer } from "../utils/Context";
import { useNavigate } from 'react-router-dom';

const MenuBar = (props) => {
  const navigate = useNavigate();
  const {menuBarOpen , setMenuBarOpen } = useContext(ContextConsumer);
  
  const handleClose = () => {
    setMenuBarOpen(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem('userId');
    setMenuBarOpen(false);
    navigate(`/`);
  };

  
  return (
    <Menu
    id="basic-menu"
    anchorEl={null}
    open={menuBarOpen}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
  </Menu>
  )
}

export default MenuBar