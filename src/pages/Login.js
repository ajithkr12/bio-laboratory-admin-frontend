import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import bgLogin from "../assets/images/login-bg.jpg";
import logo from "../assets/images/logo.png"

import LoadingOverLay from "../components/loader/LoadingOverLay";



const Login = () =>  {

    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const {control,handleSubmit,formState: { errors },} = useForm();
    const [message, setMessage] = useState('');
    const [loading , setLoading] = useState(false)

    

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked)
      };

    const onSubmit = async(_data) => {
        setLoading(true)
        if(_data.email == 'acelabAdmin' && _data.password == 'admin@ACELAB'){
            localStorage.setItem('userId', 123);
            setLoading(false)
            navigate(`/research`);
        }else{
         setMessage("User Name and Password Incorrect")
         setLoading(false)

        }


    };
  return ( 
    <Grid container style={styles.mainContainer}>

        <Grid md={12} style={{width:'100%',height:'100%',display:"flex",alignItems:'center',justifyContent:"center",flexDirection:'column',position:'relative'}} item>
        {loading && <LoadingOverLay show={loading} />}
        <div></div>
        <div></div>

        <img src={logo} alt="logo" style={{ width: "240px" ,marginBottom:'10px'}} />

        <form onSubmit={handleSubmit(onSubmit)}>

        <Grid style={{alignItems:'center',display:'flex',flexDirection:"column",}}>
            <h1 style={{margin:'12px 0px',fontSize:'42px'}}>Login</h1>
        </Grid>

        <Grid style={{display:'flex',flexDirection:"column",width:'420px',columnGap:"10px",alignItems:'center',justifyContent:'center'}} >

            <div style={{marginTop:'8px',width:"100%"}}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                    <TextField
                        {...field}
                        id="outlined-basic" 
                        label="E mail"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        // helperText={errors.userName ? errors.userName.message : ''}
                    />
                    )}
                />
                <p style={{margin:"0px",color:'red',fontSize:'14px',lineHeight:'32px',height:"32px"}}>{errors.email ? errors.email.message : ''}</p>
            </div>
            <div style={{marginTop:'8px',width:"100%"}}>
            <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                    <TextField
                        {...field}
                        id="outlined-basic" 
                        label="Password"
                        variant="outlined"
                        type={checked ? "text" : "password"}
                        fullWidth
                        error={!!errors.password}
                        // helperText={errors.password ? errors.password.message : ''}
                    />
                    )}
                />
                <p style={{margin:"0px",color:'red',fontSize:'14px',lineHeight:'32px',height:"32px"}}>{errors.password ? errors.password.message : ''}</p>

                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} label="Show Your Password" />
            </div>

        </Grid>

        <Grid style={{display:'flex',justifyContent:"flex-end",}}>
            <Button variant="contained" type="submit">Login</Button>
        </Grid>

        <Grid style={{display:'flex',justifyContent:"center",marginTop:'8%',backgroundColor:'#FFD1D1',borderRadius:'23px'}}>
            <p style={{color:'red',fontSize:"16px",margin:'0px',lineHeight:'34px'}}>{message}</p>
        </Grid>

        </form>

        </Grid>

    </Grid>

  );}


export default Login;


const styles={
    mainContainer:{
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'4px 0px 4px 0px',
        height:'100vh',
        padding:'0%',
        margin:'0%'
    },

}