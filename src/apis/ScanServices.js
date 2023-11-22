import {HTTP_REQUEST} from "./axios/AxiosBridge"
import { ConstantURL } from "../constants/ConstantURL";

const baseRoute = `${ConstantURL.BASE_URL}/scans`;

const URL =(_route) =>{
    return `${baseRoute}${_route}`
}



export const checkDocAlreadyOutScanned = async (_dataIn) => {
    console.log(" Data",_dataIn)
    const response = await HTTP_REQUEST.Get(URL('/checkDocAlreadyOutScanned'),
        {}
    ,
    {
       docNumber :  _dataIn
    }
    );
    return response

}

export const checkDocAlreadyInScanned = async (_dataIn,_hubId) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Get(URL('/checkDocAlreadyInScanned'),
        {}
    ,
    {
        docNumber : _dataIn,
        hubId: _hubId
    }
    );
    return response

}




export const getScanDetailsWithDocNumber = async (_dataIn) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Get(URL('/getScanDetailsWithDocNumber'),
    {}
    ,
    {
        docNumber : _dataIn
    }
    );
    return response

}





export const addBulkInScan = async (_dataIn) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Post(URL('/addBulkInScan'),

    _dataIn
    ,
    {
    }
    );
    return response

}

export const addBulkOutScan = async (_dataIn) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Post(URL('/addBulkOutScan'),

    _dataIn
    ,
    {
    }
    );
    return response

}



export const getInventoryWithHubId = async (_dataIn) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Get(URL('/getInventoryWithHubId'),
        {}
    ,
    {
        hubId : _dataIn
    }
    );
    return response

}

export const getMissingConsignmentWithHubId = async (_dataIn) => {
    console.log(" Data")
    const response = await HTTP_REQUEST.Get(URL('/getMissingConsignmentWithHubId'),
        {}
    ,
    {
        hubId : _dataIn
    }
    );
    return response

}