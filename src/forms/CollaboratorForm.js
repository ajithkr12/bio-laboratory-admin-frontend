import React , {useContext,useEffect,useState} from 'react'
import { useForm, Controller } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Autocomplete,FormControl } from '@mui/material';
import { Grid,Typography,TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlinePlus,AiFillDelete } from 'react-icons/ai';
import IconButton from "@mui/material/IconButton";
import { colors } from '../constants/ConstantColors';

import { addConsignment } from '../apis/ConsignmentServices';
import { ContextConsumer } from '../utils/Context';
import ToastNotification from '../components/ToastNotification';
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { collection, addDoc, updateDoc ,doc} from "firebase/firestore";

import {db,storage} from '../firebase';

import { dateStringFormaterToIST,dateStringFormaterToUST} from '../services/DateTimeServices';
const CollaboratorForm = (props) => {

  const {isEditor,openForm,setOpenForm,dataToEditForm} = props;
  const {userData} = useContext(ContextConsumer);
  const todayDate = new Date()
  const {control,handleSubmit,setValue,formState: { errors },reset,watch} = useForm({
    defaultValues: { 
    "collaboratorName":dataToEditForm?.collaboratorName ?? "",
    "about":dataToEditForm?.about ?? "",
    "organization": dataToEditForm?.organization ?? "",
    "designation": dataToEditForm?.designation ?? "",
    },
  });  

  const [errorMeassage ,setErrorMeassage] = useState("")
  const currentFormState = watch();
  const [selectedTab, setSelectedTab] = useState(1);

  const OnCancel = () => {
    setOpenForm(false);
  };
  const onSubmit = async(data) => {

    const transformedData = {
      "collaboratorName" : data.collaboratorName,
      "about" : data.about,
      "organization" : data.organization,
      "designation" : data.designation,

    };

    if(isEditor == true){
      console.log("edit")
      try {
        console.log("edit")
        const docRef = await updateDoc(doc(db, "collaborator",dataToEditForm.id), transformedData);
        console.log("Document written with ID: ", docRef.id);
        // e.target.reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{
      try {
        const docRef = await addDoc(collection(db, "collaborator"), transformedData);
        console.log("Document written with ID: ", docRef.id);
        // e.target.reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }


  
    
  }


  useEffect(() => {

    console.log("RUN")

  }, [reset, currentFormState]);



  return (
    <Dialog open={openForm}  maxWidth="md" fullWidth>
        <DialogTitle style={useStyles.dialogTitleStyle}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {isEditor ? "Update Collaborator" : "Add Collaborator"}
            </Typography>

            <CloseIcon onClick={() => OnCancel()} />
        </DialogTitle>
        <ToastNotification />

        <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent dividers>

                <Grid container style={{ maxHeight: 700, overflow: "auto" }}>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="collaboratorName"
                            control={control}
                            defaultValue=""
                            rules={{ 
                              required:"collaboratorName is required"
                            }}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="title"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                error={!!errors.collaboratorName}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.collaboratorName ? errors.collaboratorName.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="about"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'about is required' ,}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="About"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                                error={!!errors.about}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.about ? errors.about.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="organization"
                            control={control}
                            defaultValue=""
                            rules={{ required: false}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Organization Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.organization}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.organization ? errors.organization.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="designation"
                            control={control}
                            defaultValue=""
                            rules={{ required: false}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Designation"
                                variant="outlined"
                                fullWidth
                                error={!!errors.designation}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.designation ? errors.designation.message : ''}</p>
                    </Grid>



                </Grid>
        </DialogContent>

              <Grid controller>
                <Grid md={12} style={{ textAlign:'end' }} item>
                    <Button
                        onClick={() => OnCancel()}
                        style={useStyles.secondarybutton}   
                    >
                        Cancel
                    </Button>
                    <Button type="submit" style={useStyles.primarybutton}>
                        {isEditor ? "Update" : "Save"}
                    </Button>
                </Grid>
              </Grid>
              
            

        </form>




    </Dialog>
  )
}

export default CollaboratorForm;



// style START
const useStyles = {


  table:{
    border: "1px solid red",
    borderCollapse: "collapse"
  },
  th:{
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: "20px"
  
  },
  td:{
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: "6px 6px",
    textAlign:'center'
  
  },
  errorTextTable:{
    margin:"0px",
    color:'red',
    fontSize:'14px',
    lineHeight:'26px',
  },




  dialogTitleStyle: {
    display: "flex",
  },
  root: {
    padding: "8px 6px",
  },
  textfield: {
    width: "100%",
    fontSize: "14px",
  },
  errortext: {
    color: "red",
    margin: "3px 0px",
    fontSize: "12px",
  },
  secondarybutton:{
    color:"black",
    border:"1px #eeeeee solid",
    backgroundColor:"#eeeeee",
    fontWeight:"500",
    padding:"6px 16px",
    textTransform:"none",
    margin:"12px 12px 12px 0px"
  },
  tabButton:{
    color:colors.primaryColor,
    backgroundColor:"#D3D3D3",
    border:"1px solid #FFFFFF",
    fontWeight:"500",
    padding:"12px 16px",
    textTransform:"none",
    // margin:"12px 0px 12px 0px",
    width:"33.33%",
    borderRadius:'0px',
    fontSize:'16px',
  },
  tabButtonActive:{
    color:"#D3D3D3",
    backgroundColor:colors.primaryColor,
    padding:"12px 16px",
    // margin:"12px 0px 12px 0px",
    width:"33.33%",
    borderRadius:'0px',
    border:"1px solid #FFFFFF",

  },
  primarybutton:{
    color:"white",
    border:"1px #d85668 solid",
    backgroundColor:"#d85668",
    fontWeight:"500",
    padding:"6px 16px",
    textTransform:"none",
    margin:"12px 12px 12px 0px"
  },
  errorText:{
    margin:"0px",
    color:'red',
    fontSize:'14px',
    lineHeight:'26px',
    height:"26px"
  }
};
// style END

const publicationType = [
  { id: 0, name: 'Peer'},
  { id: 1, name: 'Books' },

];








{/* <Grid item md={2} style={useStyles.root}>
<Controller
    name="serviceId"
    control={control}
    rules={{ required: 'Service Type is required' }}
    render={({ field: { value, onChange } }) => (
      // <FormControl fullWidth>
        <Autocomplete
          disableClearable
          id="serviceId"
          options={services}
          value={value}
          getOptionLabel={(option) =>
            option.name !== null ? option.name : ""
          }
          style={useStyles.textfield}
          onChange={async (event, newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              InputProps={{
                ...params.InputProps,
                // type: "search",
              }}
              // InputLabelProps={{ shrink: true }}
              label="Service Type"

            />
          )}
        />
      // </FormControl>
    )}
  />
  <p style={useStyles.errorText}>{errors.serviceType ? errors.serviceType.message : ''}</p>
</Grid> */}