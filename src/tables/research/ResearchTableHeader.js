import React, { useContext } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {colors} from "../../constants/ConstantColors"

const ResearchTableHeader = (props) => {




  const {
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    TableHeaderArray,
  } = props;

  return (
    <TableHead style={useStyles.tableHead}>
      <TableRow style={useStyles.tableHead}>
     
        <>

      <TableCell style={useStyles.tableCellSymbal}></TableCell> 
      <TableCell style={useStyles.tableCellSymbal}></TableCell> 




        </>
        
        {TableHeaderArray.map((head, key) => (
          <TableCell
            key={key}
            align="center"
            style={useStyles.tableCellText}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ResearchTableHeader;


  // style START
  const useStyles = {
    tableHead : {
      backgroundColor: colors.table_head_bg,
      color:colors.table_head_font
    },
    tableCellText: {
      fontWeight: 700, 
      fontSize: "16px",
    },
    tableCellSymbal:{
      padding:"0px 0px",
      margin:"0px",
    },

  };
  // style END
