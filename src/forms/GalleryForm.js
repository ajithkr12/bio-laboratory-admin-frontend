import React , {useContext,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Grid,Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { colors } from '../constants/ConstantColors';

import { ContextConsumer } from '../utils/Context';
import ToastNotification from '../components/ToastNotification';
import { toast } from "react-toastify";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {db,storage} from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import "../App.css"
import LoadingOverLay from '../components/loader/LoadingOverLay';
import Resizer from "react-image-file-resizer";

const GalleryForm = (props) => {

  const {openForm,setOpenForm,initialFetch} = props;
  const {userData} = useContext(ContextConsumer);

  const {register,control,handleSubmit,setValue,formState: { errors },reset,watch} = useForm({
    defaultValues: { 

    },
  });  

  const [imgUrl, setImgUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const [progresspercent, setProgresspercent] = useState(0);

  const currentFormState = watch();
  const [loading , setLoading] = useState(false)

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
  
    try {
      // Resize the image
      const resizedFile = await new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1024,
          1024,
          'JPEG', // Output format: 'PNG'
          80, // Quality: 100 (highest)
          0,
          (resizedFile) => {
            resolve(resizedFile);
          },
          'file' // Output type: 'file' to get the file object directly
        );
      });
  
      // Upload the resized image to Firebase Storage
      const storageRef = ref(storage, `gallery/${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, resizedFile);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log('Image uploaded:', downloadURL);
      setImgUrl(downloadURL);
  
      // If image URL is set, proceed to add data to Firestore
      if (downloadURL) {
        const transformedData = {
          imgURL: downloadURL,
          // Add other data as needed
        };
  
        const docRef = await addDoc(collection(db, "gallery"), transformedData);
        if (docRef.id) {
          setLoading(false);
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
          setImgUrl('');
          setTimeout(() => {
            setOpenForm(false);
          }, 2000);
        }
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
  };
  


  const onSubmit = async(data, e) => {
      setLoading(true)
      await handlePostData(data.picture[0],data);

  }


  useEffect(() => {


  }, [reset]);



  return (
    <Dialog open={openForm}  maxWidth="md" fullWidth>
        <DialogTitle style={useStyles.dialogTitleStyle}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    Add Images
            </Typography>

            <CloseIcon onClick={() => OnCancel()} />
        </DialogTitle>
        <ToastNotification />

        <form onSubmit={handleSubmit(onSubmit)}>

        <DialogContent dividers>

                <Grid container style={{ maxHeight: 700, overflow: "auto",position:'relative' }}>
                  {loading && <LoadingOverLay show={loading}/>}


                    <Grid item md={6} style={useStyles.imageInputBox}>
                      <input
                        {...register("picture", {
                            required: "Picture is required",
                            })}
                        type="file"
                        id="picture"
                        onChange={onFileChange}
                        style={useStyles.imageInput}
                        accept="image/png , image/jpeg, image/webp"
                      />
                        <p style={useStyles.errorText}>{errors.picture ? errors.picture.message : ''}</p>
                    </Grid>

                    {selectedFile ? (
        <div style={{}}>
          <p>Selected Image Preview:</p>
          <img src={selectedFile} alt="Selected Preview" style={{width:'100%',height:'260px',objectFit: "cover" }} />
        </div>
      ):null}
{/* backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center"  */}

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
                        Save
                    </Button>
                </Grid>
              </Grid>
              
            

        </form>




    </Dialog>
  )
}

export default GalleryForm;



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
  },
  imageInputBox:{
    display:'flex',
    // alignItems:'center',
    justifyContent:'center',
    flexDirection: "column",
    padding :'6px 24px'
  },
  imageInput:{
    fontSize:'15px',
    // color:'#0964b0'
  }
};
// style END

