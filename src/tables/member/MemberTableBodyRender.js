import React, { useContext } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import dummy from "../../assets/images/dummy.png"



const MemberTableBodyRender = (props) => {


  const {
    bodyData,
    DeleteClick,
    EditClick,
    isSelected,
  } = props;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
      fontSize: "6px",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#FFFFFF",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  console.log("data : ", bodyData);


  return (
    <TableBody>
      {bodyData.map((data, index) => {
        const isItemSelected = isSelected(data.id);
        const labelId = `enhanced-table-checkbox-${data.id}`;


        return (
          <StyledTableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={data.Id}
            selected={isItemSelected}
            style={{ }}
          >

            
            <TableCell style={useStyles.tableCellSymbal}>
              <IconButton onClick={() => DeleteClick(data)}>
                <DeleteIcon style={{ color: "#d61355" }} />
              </IconButton>
            </TableCell>


              <TableCell style={useStyles.tableCellSymbal}>
                <IconButton onClick={() => {EditClick(data)}}>
                  <EditIcon style={{ color: "#5ebb96" }} />
                </IconButton>
              </TableCell>


            <TableCell align="center" style={useStyles.tableCellText}>
              {index+1}
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellText}>
                {data.name}            
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellText}>
              {data.designationName}
            </TableCell>


            <TableCell align="center" style={useStyles.tableCellText}>
              {data.about}
            </TableCell>
            <TableCell align="center" style={useStyles.tableCellText}>
              {data.email}
            </TableCell>
            <TableCell align="center" style={useStyles.tableCellText}>
              <img src={data.imgURL ? data.imgURL : dummy} alt="research image" width="40" height="40" style={{ borderRadius: '20px' }}/>
            </TableCell>

          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};



export default MemberTableBodyRender;


  // style START
  const useStyles = {
    tableCellText: {
      fontWeight: 500,
      fontSize: "16px",
      padding: "12px 6px",
      // borderRight:"1px solid #B3B3B3",
      color: "#000000",
      // whiteSpace: "nowrap",
    },
    tableCellSymbal: {
      padding: "0px 0px",
      margin: "0px",
      textAlign:"center"
      // borderRight:"1px solid #B3B3B3",
    },
  };
  // style END
