import React from 'react'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate(`/`);
        };
    return (
    <div style={{justifyContent:'center',alignItems:'center',alignContent:'center',display:'flex',height:'100vh',flexDirection:'column'}}>
        <h1 style={{fontSize:'140px',margin:'0px'}}>404</h1>
        <h3 style={{fontSize:'40px',margin:'20px 0px'}}>Sorry, Page Not Found</h3>
        <button style={{backgroundColor:'#000000',color:"#ffffff",fontSize:'18px',padding:'10px 24px',borderRadius:'0px',border:'none'}}onClick={handleBackToHome}>Go Back Home</button>

    </div>
  )
}

export default PageNotFound