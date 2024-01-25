import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { Grid, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../constants/ConstantColors";

import { ContextConsumer } from "../utils/Context";
import ToastNotification from "../components/ToastNotification";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import "../App.css";
import LoadingOverLay from "../components/loader/LoadingOverLay";
const MemberForm = (props) => {
  const { isEditor, openForm, setOpenForm, dataToEditForm ,initialFetch} = props;
  const { userData } = useContext(ContextConsumer);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: dataToEditForm?.name ?? "",
      designation: dataToEditForm?.designation ?? "",
      type: dataToEditForm?.type
        ? memberType[dataToEditForm.type]
        : memberType[0],
      email : dataToEditForm?.email ?? "",
      about : dataToEditForm?.about ?? "",
      designation : dataToEditForm?.designationId
      ? designationType[dataToEditForm.designationId]
      : designationType[0],
      dateSelector : dataToEditForm?.resignationYear ? new Date(dataToEditForm.resignationYear) : new Date()


      
    },
  });

  const [selectedFile, setSelectedFile] = useState("");


  const currentFormState = watch();
  const [loading, setLoading] = useState(false);

  const OnCancel = () => {
    setOpenForm(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handlePostData = async (file, data) => {

    
    if(data.type.id === 0){
      if (!file) return;
    }
    var downloadURL="";
    const date = data.dateSelector.toString();
    const timestampNow = Date.now();
    if(data.type.id === 0){
      const storageRef = ref(storage, `members/${timestampNow}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      downloadURL = await getDownloadURL(uploadTask.ref);

    }


    try {

        const transformedData = {
          imgURL: downloadURL,
          name: data.name,
          type: data.type.id,
          email : data.email,
          about : data.about,
          designationId : data.designation.id,
          designationName : data.designation.name,
          resignationYear : date
        };

        const docRef = await addDoc(collection(db, "members"),transformedData);
        if (docRef.id) {
          setLoading(false)
          initialFetch();
          toast.success("Successfully Added", {
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
        }

    } catch (error) {
      setLoading(false)
      toast.error(`Failed : ${error} `, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }


  };

  // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
  const handleUpdateData = async (data) => {

    if(data.type.id === 0){
      if (!data.picture[0] && !dataToEditForm.imgURL) return;
    }

    var downloadURL= null;
    const date = data.dateSelector.toString();
    const timestampNow = Date.now();
    if(data.type.id === 0 && data.picture[0]){
      const storageRef = ref(storage, `members/${timestampNow}`);
      const uploadTask =await uploadBytesResumable(storageRef, data.picture[0]);
      downloadURL = await getDownloadURL(uploadTask.ref);
      
    }

    const transformedData = {
      imgURL: downloadURL == null ? dataToEditForm.imgURL : downloadURL,
      name: data.name,
      type: data.type.id,
      email : data.email,
      about : data.about,
      designationId : data.designation.id,
      designationName : data.designation.name,
      resignationYear : date

    };
    try {
      const docRef = await updateDoc(doc(db, "members", dataToEditForm.id),transformedData);
      setLoading(false);
      initialFetch()
      toast.success("Successfully Updated", {
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
      
    } catch (error) {
      setLoading(false);
      toast.error(`Failed : ${error} `, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }


  };

  const onSubmit = async (data, e) => {
    setLoading(true);
    if (isEditor !== true) {
      await handlePostData(data.picture[0], data);
    } else {
      await handleUpdateData(data);
    }
  };

  useEffect(() => {
  }, [reset]);

  return (
    <Dialog open={openForm} maxWidth="md" fullWidth>
      <DialogTitle style={useStyles.dialogTitleStyle}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          {isEditor ? "Update Member" : "Add Member"}
        </Typography>

        <CloseIcon onClick={() => OnCancel()} />
      </DialogTitle>
      <ToastNotification />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid
            container
            style={{ maxHeight: 700, overflow: "auto", position: "relative" }}
          >
            {loading && <LoadingOverLay show={loading} />}
            <Grid item md={12} style={useStyles.root}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    // helperText={errors.userName ? errors.userName.message : ''}
                  />
                )}
              />
              <p style={useStyles.errorText}>
                {errors.name ? errors.name.message : ""}
              </p>
            </Grid>


            <Grid item md={12} style={useStyles.root}>
              <Controller
                name="designation"
                control={control}
                rules={{ required: "Designation is required" }}
                render={({ field: { value, onChange } }) => (
                  // <FormControl fullWidth>
                  <Autocomplete
                    id="designation"
                    options={designationType}
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
                        label="Designation"
                      />
                    )}
                  />
                )}
              />
              <p style={useStyles.errorText}>
                {errors.designation ? errors.designation.message : ""}
              </p>
            </Grid>





            <Grid item md={12} style={useStyles.root}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                // rules={{ required: "E-Mail is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    id="outlined-basic"
                    label="E-Mail"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    // helperText={errors.userName ? errors.userName.message : ''}
                  />
                )}
              />
              <p style={useStyles.errorText}>
                {errors.email ? errors.email.message : ""}
              </p>
            </Grid>

            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field: { value, onChange } }) => (
                  // <FormControl fullWidth>
                  <Autocomplete
                    id="type"
                    options={memberType}
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
                        label="Member Type"
                      />
                    )}
                  />
                )}
              />
              <p style={useStyles.errorText}>
                {errors.type ? errors.type.message : ""}
              </p>
            </Grid>
            {currentFormState.type.id === 1 && 

            <Grid item md={6} style={useStyles.root}>
              <Controller
                name="dateSelector"
                control={control}
                rules={{ required: 'Resignation Year is required' ,}}
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
                          label="Resignation Year"
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              <p style={useStyles.errorText}>{errors.dateSelector ? errors.dateSelector.message : ''}</p>
            </Grid>
}


            {currentFormState.type.id === 0 && 

            <Grid item md={12} style={useStyles.root}>
              <Controller
                name="about"
                control={control}
                defaultValue=""
                rules={{ required: "About is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    id="outlined-basic"
                    label="About"
                    variant="outlined"
                    multiline
                    rows={6}
                    fullWidth
                    error={!!errors.about}
                    // helperText={errors.userName ? errors.userName.message : ''}
                  />
                )}
              />
              <p style={useStyles.errorText}>
                {errors.about ? errors.about.message : ""}
              </p>
            </Grid>
}

            {/* <Grid item md={6} style={useStyles.imageInputBox}>
            </Grid> */}
            {currentFormState.type.id === 0 && 
            <Grid md={10} style={{display:'flex'}}>

            <Grid item md={6} style={useStyles.imageInputBox}>
              <input
                {...register("picture", {
                  required: isEditor ? false : "Picture is required",
                })}
                type="file"
                id="picture"
                onChange={onFileChange}
                style={useStyles.imageInput}
                accept="image/png , image/jpeg, image/webp"
              />
              <p style={useStyles.errorText}>
                {errors.picture ? errors.picture.message : ""}
              </p>
            </Grid>
            <Grid item md={6}>

            {isEditor === true || selectedFile ? (
              <div style={{}}>
                <img
                  src={selectedFile || dataToEditForm.imgURL}
                  alt="Selected Preview"
                  style={{ width: "140px", height: "140px", objectFit: "cover" ,borderRadius:'50%'}}
                />
              </div>
            ) : null}
             </Grid>

            </Grid>
            }
            {/* backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center"  */}
          </Grid>
        </DialogContent>

        <Grid controller>
          <Grid md={12} style={{ textAlign: "end" }} item>
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
  );
};

export default MemberForm;

// style START
const useStyles = {
  table: {
    border: "1px solid red",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: "20px",
  },
  td: {
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: "6px 6px",
    textAlign: "center",
  },
  errorTextTable: {
    margin: "0px",
    color: "red",
    fontSize: "14px",
    lineHeight: "26px",
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
  secondarybutton: {
    color: "black",
    border: "1px #eeeeee solid",
    backgroundColor: "#eeeeee",
    fontWeight: "500",
    padding: "6px 16px",
    textTransform: "none",
    margin: "12px 12px 12px 0px",
  },
  tabButton: {
    color: colors.primaryColor,
    backgroundColor: "#D3D3D3",
    border: "1px solid #FFFFFF",
    fontWeight: "500",
    padding: "12px 16px",
    textTransform: "none",
    // margin:"12px 0px 12px 0px",
    width: "33.33%",
    borderRadius: "0px",
    fontSize: "16px",
  },
  tabButtonActive: {
    color: "#D3D3D3",
    backgroundColor: colors.primaryColor,
    padding: "12px 16px",
    // margin:"12px 0px 12px 0px",
    width: "33.33%",
    borderRadius: "0px",
    border: "1px solid #FFFFFF",
  },
  primarybutton: {
    color: "white",
    border: "1px #d85668 solid",
    backgroundColor: "#d85668",
    fontWeight: "500",
    padding: "6px 16px",
    textTransform: "none",
    margin: "12px 12px 12px 0px",
  },
  errorText: {
    margin: "0px",
    color: "red",
    fontSize: "14px",
    lineHeight: "26px",
    height: "26px",
  },
  imageInputBox: {
    display: "flex",
    // alignItems:'center',
    justifyContent: "center",
    flexDirection: "column",
    padding: "6px 2px",
  },
  imageInput: {
    fontSize: "15px",
    // color:'#0964b0'
  },
};
// style END

const memberType = [
  { id: 0, name: "Current" },
  { id: 1, name: "Alumini" },
];


const designationType = [
  { id: 0, name: "Chief Scientist" },
  { id: 1, name: "Principal Scientist" },
  { id: 2, name: "Lab Assistant"},
  { id: 3 , name:"Project Field Assistant"},
  { id: 4 , name:"Field Assistant "},


  { id: 5, name: "Project JRF " },
  { id: 6, name: "PhD SRF " },
  { id: 7, name: "DBT RA "},
  { id: 8 , name:"Project SRF"},

  { id: 9, name: "DST Inspire Fellow" },
  { id: 10, name: "Project Asst II  " },
  { id: 11, name: "Project RA 1  "},
  { id: 12 , name:"Technical Assistant "},
  { id: 13 , name:"Project Based Student Trainee"},

  { id: 14 , name:"SR. Technical Officer"},
  { id: 15 , name:"Project Associate"},

  { id: 16 , name:"Senior Research Fellow"},
  { id: 17 , name:"Junior Research Fellow"}


];
