import axios from "axios";

export const setHeader = async (accessToken)=>{
    // console.log("accessToken :",accessToken)
    axios.interceptors.request.use(function (config) {
        config.headers.authorization = accessToken;
        config.headers.accept = "application/json, text/plain, */*"
        return config;
    });
}
