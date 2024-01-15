import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import CollaboratorTableHeader from "../tables/collaborator/CollaboratorTableHeader";
import CollaboratorTableBodyRender from "../tables/collaborator/CollaboratorTableBodyRender";
import { ContextConsumer } from "../utils/Context";
import { AiOutlinePlus } from 'react-icons/ai';


import LoadingOverLay from "../components/loader/LoadingOverLay";

import SearchBox from "../components/SearchBox";
import { colors } from "../constants/ConstantColors";

import CollaboratorForm from "../forms/CollaboratorForm"
import {db} from '../firebase';
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";
import DeleteConfirmation from "../components/DeleteConfirmation";

CollaboratorTableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  // orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// Props for table END

const CollaboratorList = (props) => {
  const TableHeaderArray = [
    "Sl No",
    "Collaborator Name",
    "Organization",
    "Designation",
    "About",
    // "PDF"
  ];
  // const {searchTerm} = props;
  const {userData } = useContext(ContextConsumer);

  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [dataToEditForm, setDataToEditForm] = useState([]);

  const [fetchData, setFetchData] = useState([]);
  const [filteredFetchData, setFilteredFetchData] = useState([]);

  const [selected, setSelected] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState();


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const [searchTerm, setSearchTerm] = useState("");
  const [isEditor , setIsEditor] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);





  const handleOpenForm = () => {
    setDataToEditForm([]);
    setIsEditor(false)
    setOpenForm(true);
  };




  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const isSelected = (data_id) => {
    return selected.indexOf(data_id) !== -1;
  };

  const OpenDetailedClick = (event) => {
    console.log("next page", event);
    // setLoginUser(event)
    // navigate(`/${event.id}`);
    navigate(`/device-list/${event.id}`);
  };






  const EditClick = (event) => {
    console.log("edit : ", event);
    setIsEditor(true)
    setDataToEditForm(event);
    setOpenForm(true);
  };

  const DeleteClick = async (event) => {
    setDeleteSelected(event.id);
    setOpenDeleteConfirmation(true);
    console.log("Single Delete : ", event.id);

  };


  const ConfirmationDeleteButtonClick = async (id) => {
    await deleteDoc(doc(db, "collaborator",id));
    initialFetch();
    setOpenDeleteConfirmation(false);
  };



 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // #############################################################

  const initialFetch = async () => {

    setRowsPerPage(0);
    setLoading(true);
    await getDocs(collection(db, "collaborator"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            setFetchData(newData);                
    })
    setRowsPerPage(12);
    setLoading(false);
  };

  useEffect(() => {
    initialFetch();
  }, []);


  // );
  const _finalFetchData = useMemo(() => {
    // Apply search filter if searchTerm is provided
    const _filteredFetchData = searchTerm
      ? fetchData.filter((data) => {
          const searchTermLower = searchTerm.toLowerCase();

          // Check if searchTerm contains only numeric characters for phone search
          if (
            /^[a-zA-Z0-9\s]+$/.test(searchTerm) &&
            data.title &&
            data.title.toLowerCase().includes(searchTerm)
          ) {
            return true;
          }


          return false;
        })
      : [...fetchData];
    setFilteredFetchData(_filteredFetchData);
    return stableSort(_filteredFetchData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, searchTerm, fetchData]);

  // #############################################################

  return (
<>

    <Grid md={12} style={styles.toolContainer}>
    <div style={{display:'flex',alignItems:'center'}}>
      <SearchBox setSearchTerm={setSearchTerm} />

    </div>
    <div>
      


      <Button variant="outlined" startIcon={<AiOutlinePlus />} onClick={() => handleOpenForm()} style={{color:colors.primaryColor,borderColor:colors.primaryColor}}>
        Add Collaborator
      </Button>
    </div>


  </Grid>

<Grid md={12} style={styles.tableContainer}>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      {loading && <LoadingOverLay show={loading} />}

      <TableContainer
        style={{
          table: {
            border: "1px solid #f5f5f7",
            borderRadius: "10px",
          },
        }}
      >
        <Table
          // style={{"position": "relative"}}
          sx={{ minWidth: 720 }}
          aria-labelledby="tableTitle"
          size="medium"
          style={{
            table: {
              border: "1px solid #f5f5f7",
              borderRadius: "10px",
            },
          }}
        >
          <CollaboratorTableHeader
            TableHeaderArray={TableHeaderArray}
            numSelected={selected.length}
            rowCount={fetchData.length}
          />

          <CollaboratorTableBodyRender
            bodyData={_finalFetchData}
            DeleteClick={DeleteClick}
            EditClick={EditClick}
            OpenDetailedClick={OpenDetailedClick}
            isSelected={isSelected}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12]}
        component="div"
        count={filteredFetchData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


    </div>
    </Grid>
    {openForm && 
        <CollaboratorForm 
            openForm = {openForm}
            setOpenForm = {setOpenForm}
            isEditor = {isEditor}
            dataToEditForm = {dataToEditForm}
        />
    }
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

export default CollaboratorList;

const styles = {

  toolContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent:'space-between',
    marginTop:'16px'
  },
  tableContainer:{
    marginTop:'12px',

  }
};

