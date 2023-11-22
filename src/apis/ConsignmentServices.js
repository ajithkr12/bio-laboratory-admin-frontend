import {HTTP_REQUEST} from "./axios/AxiosBridge"
import { ConstantURL } from "../constants/ConstantURL";

const baseRoute = `${ConstantURL.BASE_URL}/consignments`;

const URL =(_route) =>{
    return `${baseRoute}${_route}`
}



export const addConsignment = async (_dataIn) => {
    console.log("get user Data")
    const response = await HTTP_REQUEST.Post(URL('/addConsignment'),
        _dataIn
    ,
    {}
    );
    return response

}

