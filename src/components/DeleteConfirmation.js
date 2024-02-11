import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const DeleteConfirmation = (props) => {
  
  var { 
    id, 
    ConfirmationDeleteButtonClick,
    OpenStatus,
    setOpenDeleteConfirmation , 
  } = props;


  // const [loading, setLoading] = useState(false);

  // Local Functions START
  const handleCancelClick = () => {
    setOpenDeleteConfirmation(false);
  };


  // Local Functions END

  return (
    <Dialog open={OpenStatus} maxWidth="xs" fullWidth>

      <DialogTitle style={useStyles.dialogtitlestyle}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Confirm Deletion
        </Typography>
        <CloseIcon onClick={handleCancelClick} />
      </DialogTitle>

      <DialogContent>
        <Typography>
          {props.message}
        </Typography>
      </DialogContent>

      <DialogActions style={useStyles.dialogaction}>

        <Button onClick={handleCancelClick} style={useStyles.secondarybutton}>
          Cancel
        </Button>

        <Button
          onClick={() => ConfirmationDeleteButtonClick(id)}
          style={useStyles.primarybutton}

        >
          Yes,delete it
        </Button>

      </DialogActions>
    </Dialog>
  );
};


// style START
const useStyles = {
  dialogaction: {
    padding: "18px",
  },
  dialogtitlestyle: {
    display: "flex",
  },
  secondarybutton: {
    color: "black",
    border: "1px #eeeeee solid",
    backgroundColor: "#eeeeee",
    fontWeight: "500",
    padding: "8px 16px",
    textTransform: "none",
  },
  primarybutton: {
    color: "white",
    border: "1px #d85668 solid",
    backgroundColor: "#d85668",
    fontWeight: "500",
    padding: "8px 16px",
    textTransform: "none",
  },
};
// style END


export default DeleteConfirmation;
