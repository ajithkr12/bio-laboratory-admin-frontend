import {HTTP_REQUEST} from "./axios/AxiosBridge"
import { ConstantURL } from "../constants/ConstantURL";

const baseRoute = `${ConstantURL.BASE_URL}/user`;

const URL =(_route) =>{
    return `${baseRoute}${_route}`
}



export const getUserDataFromAuthToken = async (_dataIn) => {
    console.log("get user Data")
    const response = await HTTP_REQUEST.Get(URL('/getUserDataFromAuthToken'));
    return response

}