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
import { collection, addDoc } from "firebase/firestore";

import {db,storage} from '../firebase';

import { dateStringToYear ,dateStringFormater} from '../services/DateTimeServices';
const PublicationForm = (props) => {

  const {isEditor,openForm,setOpenForm,dataToEditForm} = props;
  const {userData} = useContext(ContextConsumer);

  const {control,handleSubmit,setValue,formState: { errors },reset,watch} = useForm({
    defaultValues: { 
    "title":dataToEditForm?.title ?? "",
    "description":dataToEditForm?.description ?? "",
    "link": dataToEditForm?.link ?? "",
    "type": publicationType[0]
    },
  });  

  const [errorMeassage ,setErrorMeassage] = useState("")
  const currentFormState = watch();
  const [selectedTab, setSelectedTab] = useState(1);

  const OnCancel = () => {
    setOpenForm(false);
  };
  const onSubmit = async(data) => {
    const date = dateStringFormater(data.dateSelector);
    console.error("data.dateSelector ", data.dateSelector);

    const transformedData = {
      "title" : data.title,
      "description" : data.description,
      "link" : data.link,
      "type" : data.type.id,
      "year" : date

    };

    try {
      const docRef = await addDoc(collection(db, "publication"), transformedData);
      console.log("Document written with ID: ", docRef.id);
      // e.target.reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
    
  }


  useEffect(() => {

    console.log("RUN")

  }, [reset, currentFormState]);



  return (
    <Dialog open={openForm}  maxWidth="md" fullWidth>
        <DialogTitle style={useStyles.dialogTitleStyle}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {isEditor ? "Update Publication" : "Add Publication"}
            </Typography>

            <CloseIcon onClick={() => OnCancel()} />
        </DialogTitle>
        <ToastNotification />

        <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent dividers>

                <Grid container style={{ maxHeight: 700, overflow: "auto" }}>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            rules={{ 
                              required:"title is required"
                            }}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="title"
                                variant="outlined"
                                fullWidth
                                error={!!errors.title}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.title ? errors.title.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Description is required' ,}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={6}
                                error={!!errors.description}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.description ? errors.description.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="link"
                            control={control}
                            defaultValue=""
                            rules={{ required: false}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Referense Link"
                                variant="outlined"
                                fullWidth
                                error={!!errors.link}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.link ? errors.link.message : ''}</p>
                    </Grid>

                    <Grid item md={6} style={useStyles.root}>
                      <Controller
                          name="type"
                          control={control}
                          rules={{ required: "Type is required" }}
                          render={({ field: { value, onChange } }) => (
                            // <FormControl fullWidth>
                            <Autocomplete
                              id="type"
                              options={publicationType}
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
                                  }}
                                  InputLabelProps={{ shrink: true }}
                                  label="Research Type"
                                />
                              )}
                            />
                          )}
                        />
                        <p style={useStyles.errorText}>{errors.type ? errors.type.message : ''}</p>
                    </Grid>

                    <Grid item md={6} style={useStyles.root}>
              <Controller
                name="dateSelector"
                control={control}
                rules={{ required: 'Year is required' ,}}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      // label="Date "
                      inputFormat="MM/DD/YYYY"
                      style={useStyles.textfield}
                      value={value}
                      onChange={(date) => onChange(date?._d)}
                      renderInput={(params) => (
                        <TextField
                        size="small"
                          {...params}
                          InputLabelProps={{ shrink: true }}
                          label="Date"
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              <p style={useStyles.errorText}>{errors.dateSelector ? errors.dateSelector.message : ''}</p>
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

export default PublicationForm;



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