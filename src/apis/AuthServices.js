import {HTTP_REQUEST} from "./axios/AxiosBridge"
import { ConstantURL } from "../constants/ConstantURL";

const baseRoute = `${ConstantURL.BASE_URL}/auth`;

const URL =(_route) =>{
    return `${baseRoute}${_route}`
}

export const userLogin = async (_dataIn) => {
    console.log("login Data",_dataIn)
    const response = await HTTP_REQUEST.Post(URL('/login'),{ 

        email: _dataIn.email,
        password: _dataIn.password,

    },
    {}
    );
    return response

}
