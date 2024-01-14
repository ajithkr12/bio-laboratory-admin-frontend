import React, { useContext } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";




const PublicationTableBodyRender = (props) => {


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

  function shortenAfterDot(sentence) {
    let dotCount = 0;
    let shortenedSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        shortenedSentence += sentence[i];
        if (sentence[i] === '.') {
            dotCount++;
        }
        if (dotCount > 0 && shortenedSentence.length > (12 + dotCount)) {
            shortenedSentence = shortenedSentence.trim() + "...";
            break;
        }
    }
    return shortenedSentence;
}


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
                {data.title}            
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellText}>
              {shortenAfterDot(data.description)}
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellText}>
              {data.year}
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellTextDec}>
              {shortenAfterDot(data.link)}
            </TableCell>

            <TableCell align="center" style={useStyles.tableCellText}>
              {data.link}
            </TableCell>

          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};



export default PublicationTableBodyRender;


  // style START
  const useStyles = {
    tableCellText: {
      fontWeight: 500,
      fontSize: "16px",
      padding: "12px 4px",
      color: "#000000",
      whiteSpace: "nowrap",
    },
    tableCellTextDec: {
      fontWeight: 500,
      fontSize: "16px",
      padding: "12px 4px",
      color: "#000000",
      whiteSpace: "nowrap",
    },
    tableCellSymbal: {
      padding: "0px 0px",
      margin: "0px",
      textAlign:"center"
    },
  };
  // style END
