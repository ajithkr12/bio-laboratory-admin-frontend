import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { Grid } from "@mui/material";

import { ContextConsumer } from "../utils/Context";
import { AiOutlinePlus } from 'react-icons/ai';


import LoadingOverLay from "../components/loader/LoadingOverLay";

import SearchBox from "../components/SearchBox";
import { colors } from "../constants/ConstantColors";

import GalleryForm from "../forms/GalleryForm"
import {db} from '../firebase';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";
import DeleteConfirmation from "../components/DeleteConfirmation";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";



const MessageList = (props) => {

  // const {searchTerm} = props;
  const {userData } = useContext(ContextConsumer);

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);





  const handleOpenForm = () => {
    setOpenForm(true);
  };


  const DeleteClick = async (event) => {
    setDeleteSelected(event.id);
    setOpenDeleteConfirmation(true);
    console.log("Single Delete : ", event.id);

  };


  const ConfirmationDeleteButtonClick = async (id) => {
    await deleteDoc(doc(db, "gallery",id));
    initialFetch();
    setOpenDeleteConfirmation(false);
  };




  // #############################################################

  const initialFetch = async () => {

    setLoading(true);
    await getDocs(collection(db,"contact"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            setFetchData(newData);                
    })
    setLoading(false);
  };

  useEffect(() => {
    initialFetch();
  }, []);



  // #############################################################

  return (
<>

    <Grid md={12} style={styles.toolContainer}>
    <div style={{display:'flex',alignItems:'center'}}>
      <SearchBox setSearchTerm={setSearchTerm} />

    </div>
  </Grid>

<Grid style={styles.tableContainer} container>
{loading && <LoadingOverLay show={loading} />}


                          {fetchData.map((item, index) => {
                            return(

      <Grid md={12} style={{width: "100%",position:'relative',padding:'4px',borderBottom:'1px solid #000000'}} >
          <h4>Name &emsp;:&emsp;{item.name}</h4>
          <h4>Email &emsp;:&emsp;{item.email} </h4>
          <h4>Organization &emsp;:&emsp;{item.organization}</h4>
          <h4>Subject &emsp;:&emsp;{item.subject}</h4>
          <h4>Message &emsp;:&emsp;{item.message}</h4>


        {/* <IconButton style={{position:'absolute',top:'8px',left:'8px',backgroundColor:'#ffffff'}} onClick={() => DeleteClick(item)}>
          <DeleteIcon style={{ color: "#d61355",fontSize:'22px' }} />
        </IconButton> */}
      </Grid>

      )}
                          )}

    </Grid>
  {openDeleteConfirmation && (
          <DeleteConfirmation
            message={"You want to delete selected item ?"}
            OpenStatus={openDeleteConfirmation}
            setOpenDeleteConfirmation={setOpenDeleteConfirmation}
            id={deleteSelected}
            ConfirmationDeleteButtonClick={ConfirmationDeleteButtonClick}
          />
        )}
    </>
  );
};

export default MessageList;

const styles = {

  toolContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent:'space-between',
    marginTop:'16px'
  },
  tableContainer:{
    marginTop:'12px',
    display:'flex',
    overflow: "hidden" ,

  }
};

