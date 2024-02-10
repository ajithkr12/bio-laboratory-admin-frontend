
import { useEffect, useState,useContext } from 'react';
import { getOneUsers } from "../apis/userServices";
import { ContextConsumer } from "../utils/Context";


export const Authenticated = () => { 

    const [authData, setAuthData] = useState({ isAuth: null, userRole: null });
    const {setLoginUser  } = useContext(ContextConsumer);
  
  
    useEffect(() => {
      const fetchData = async () => {
  
  
        const userId = localStorage.getItem('userId');
        if (!userId) {
          // If userId is not found in localStorage, the user is not authenticated.
          setAuthData({ isAuth: false, userRole: null });
          return
        }
  
        try {
          const response = await getOneUsers(userId);
          console.log("AAAAAAAAAAAAAAAAAAAA",response);  
          setLoginUser(response.data[0])  
          setAuthData({ isAuth: false, userRole: null });

          if(response.status === 200) {
            console.log("noice");
            setAuthData({ isAuth: true, userRole: response.data[0].RoleType }); // Assuming the user role is in the response

          }     
        }
        catch(e) {
          console.log(e);
          setAuthData({ isAuth: false, userRole: null });

        }
      };          
  
     fetchData();
   }, []);      
  
    return authData;
  };
  