import axios from "axios";

const Get = async (uri , body,params={}) => {
    try {
        const response = await axios.get(uri, {
            params:{
                ...params 
            }
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          // The error comes from the server
          console.log("Server Error URI :", uri);
          console.log("Server Error data :", error.response.data);
          return error.response.data;
        } else {
          // The error is not from the server
          console.log("Axios Error URI :", uri);
          console.log("Axios Error message:", error.message);
          return {
            success: false,
            data: error.message,
          };
        }
      }
};

const Post = async (uri, body,params = {}) => {
  try {
    const response = await axios.post(uri, { ...body },{ params });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The error comes from the server
      console.log("Server Error URI :", uri);
      console.log("Server Error data :", error.response.data);
      
      return error.response.data;
      
    } else {
      // The error is not from the server
      console.log("Axios Error URI :", uri);
      console.log("Axios Error message:", error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }
};

const Delete = async (uri,params={}) => {
  try {
    const response = await axios.patch(uri,{
      params:{
          ...params 
      }
  });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The error comes from the server
      console.log("Server Error URI :", uri);
      console.log("Server Error data :", error.response.data);
      
      return error.response.data;
      
    } else {
      // The error is not from the server
      console.log("Axios Error URI :", uri);
      console.log("Axios Error message:", error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }
  
};

const Patch = async (uri,body,params={}) => {

  try {
    const response = await axios.patch(uri, { ...body },{
      params:{
          ...params 
      }
  });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The error comes from the server
      console.log("Server Error URI :", uri);
      console.log("Server Error data :", error.response.data);
      
      return error.response.data;
      
    } else {
      // The error is not from the server
      console.log("Axios Error URI :", uri);
      console.log("Axios Error message:", error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }
};

export const HTTP_REQUEST = {
  Get,
  Post,
  Delete,
  Patch,
};
