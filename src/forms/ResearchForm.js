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

const ResearchForm = (props) => {

  const {isEditor,openForm,setOpenForm} = props;
  const {userData} = useContext(ContextConsumer);

  const {control,handleSubmit,setValue,formState: { errors },reset,watch} = useForm({
    defaultValues: { 
    "heading":"",
    "description":"",
    "imageURL":"",
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
      "heading" : data.heading,
      "description" : data.description,
      "imageURL" : data.imageURL,

    };

    const postData =  {
      ...transformedData,

    };
    

    const response = await addConsignment({...postData});
    console.log("response>>",response);

    if (response.success === true) {
      console.log("Done");
      toast.success("Successfully Create Consignment", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        setOpenForm(false);
      }, 2000);
    }else{
      console.log("Not");
      toast.error(`Failed : ${response.message} `, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
  }







  useEffect(() => {

    console.log("RUN")

  }, [reset, currentFormState]);



  return (
    <Dialog open={openForm}  maxWidth="md" fullWidth>
        <DialogTitle style={useStyles.dialogTitleStyle}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {isEditor ? "Update Research" : "Add Research"}
            </Typography>

            <CloseIcon onClick={() => OnCancel()} />
        </DialogTitle>
        <ToastNotification />

        <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent dividers>

                <Grid container style={{ maxHeight: 700, overflow: "auto" }}>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="heading"
                            control={control}
                            defaultValue=""
                            rules={{ 
                              required:"heading is required"
                            }}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Heading"
                                variant="outlined"
                                fullWidth
                                error={!!errors.heading}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.heading ? errors.heading.message : ''}</p>
                    </Grid>
                    <Grid item md={12} style={useStyles.root}>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Description is required' , pattern: {value: /^[0-9]*$/,message: 'Please enter only numbers',}}}
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
                            name="imageURL"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Image is required' ,}}
                            render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                id="outlined-basic" 
                                label="Image"
                                variant="outlined"
                                fullWidth
                                error={!!errors.imageURL}
                                // helperText={errors.userName ? errors.userName.message : ''}
                            />
                            )}
                        />
                        <p style={useStyles.errorText}>{errors.imageURL ? errors.imageURL.message : ''}</p>
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

export default ResearchForm;



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

const services = [
  { id: 1, name: 'Priority' },
  { id: 2, name: 'Standard' },
  { id: 3, name: 'Swift' },

];

const travelMethod = [
  { id: 1, name: 'Air' },
  { id: 2, name: 'Surface' },
];

const conformation = [
  { id: 0, name: 'Yes' },
  { id: 1, name: 'No' },
];

const payment = [
  { id: 1, name: 'Credit' },
  { id: 2, name: 'Paid' },
  { id: 3, name: 'To Paid' },
  { id: 4, name: 'COD' },



];

const type = [
  { id: 1, name: 'Non DOX' },
  { id: 2, name: 'DOX' },

];

const weight = [
  { id: 1, name: 'Actual Weight' },
  { id: 2, name: 'Volumetric Weight' },

];



const creditClient = [
  { id: 1, name: 'client-123' },
  { id: 2, name: 'client-234' },

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