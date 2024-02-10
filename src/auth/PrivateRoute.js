
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoutes = () => {
  const userId = localStorage.getItem('userId');



if(userId == 123){
  return <Outlet />
}else{
  return <Navigate to="/" />
}

};

export default PrivateRoutes;
