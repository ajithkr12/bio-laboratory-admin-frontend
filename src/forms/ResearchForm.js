import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Autocomplete, } from "@mui/material";
import { Grid, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../constants/ConstantColors";

import { ContextConsumer } from "../utils/Context";
import ToastNotification from "../components/ToastNotification";
import { toast } from "react-toastify";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import "../App.css";
import LoadingOverLay from "../components/loader/LoadingOverLay";
const ResearchForm = (props) => {
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
      title: dataToEditForm?.title ?? "",
      description: dataToEditForm?.description ?? "",
      type: dataToEditForm?.type
        ? researchType[dataToEditForm.type]
        : researchType[0],
    },
  });

  const [imgUrl, setImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [progresspercent, setProgresspercent] = useState(0);

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

    if (!file) return;
    const timestampNow = Date.now();
    const storageRef = ref(storage, `files/${timestampNow}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setImgUrl(downloadURL);

          try {
            if (downloadURL) {
              const transformedData = {
                imgURL: downloadURL,
                title: data.title,
                description: data.description,
                type: data.type.id,
              };


              const docRef = await addDoc(
                collection(db, "research"),
                transformedData
              );
              if (docRef.id) {
                setLoading(false);
                initialFetch()
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

              // Reset form or perform any other necessary actions
              // e.target.reset();
              setImgUrl("");
            }
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
        });
      }
    );
  };

  // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
  const handleUpdateData = async (file, data) => {

    if (!file && !dataToEditForm.imgURL) return;

    var downloadURL="";
    const timestampNow = Date.now();
    if(file){
      const storageRef = ref(storage, `files/${timestampNow}`);
      const uploadTask =await uploadBytesResumable(storageRef, file);
      downloadURL = await getDownloadURL(uploadTask.ref);

      
    }

    const transformedData = {
      imgURL: file ? downloadURL : dataToEditForm.imgURL,
      title: data.title,
      description: data.description,
      type: data.type.id,
    };

    try {
      const docRef = await updateDoc(doc(db, "research", dataToEditForm.id),transformedData);
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
    var response
    if (isEditor !== true) {
      response = await handlePostData(data.picture[0], data);
    } else {
      response = await handleUpdateData(data.picture[0], data);
    }
  };

  useEffect(() => {
  }, [reset]);

  return (
    <Dialog open={openForm} maxWidth="md" fullWidth>
      <DialogTitle style={useStyles.dialogTitleStyle}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          {isEditor ? "Update Research" : "Add Research"}
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
                name="title"
                control={control}
                defaultValue=""
                rules={{
                  required: "title is required",
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
              <p style={useStyles.errorText}>
                {errors.title ? errors.title.message : ""}
              </p>
            </Grid>
            <Grid item md={12} style={useStyles.root}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Description is required" }}
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
              <p style={useStyles.errorText}>
                {errors.description ? errors.description.message : ""}
              </p>
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
                    options={researchType}
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
              <p style={useStyles.errorText}>
                {errors.type ? errors.type.message : ""}
              </p>
            </Grid>

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

            {isEditor === true || selectedFile ? (
              <div style={{}}>
                <p>Selected Image Preview:</p>
                <img
                  src={selectedFile || dataToEditForm.imgURL}
                  alt="Selected Preview"
                  style={{ width: "100%", height: "260px", objectFit: "cover" }}
                />
              </div>
            ) : null}
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

export default ResearchForm;

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
    padding: "6px 24px",
  },
  imageInput: {
    fontSize: "15px",
    // color:'#0964b0'
  },
};
// style END

const researchType = [
  { id: 0, name: "Endangered Species Ecology" },
  { id: 1, name: "Disease Ecology" },
];
