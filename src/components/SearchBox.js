import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const SearchBox = (props) => {

    const {setSearchTerm} =props;
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    // console.log(searchData)
    };



  return (
    <TextField
    size="small"
    className="inputRoundedSearch"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: `1px solid blue 0.1`,
      width: 260,
      fontSize: "14px",
    }}
    sx={{
      '& label.Mui-focused': {
        color: '#000034',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#707070',
        },
        '&:hover fieldset': {
          borderColor: '#000034',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#000034',
        },
      },
    }}
    onChange={handleInputChange}
    defaultValue=""
    placeholder="Search"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
  );
};

export default SearchBox;