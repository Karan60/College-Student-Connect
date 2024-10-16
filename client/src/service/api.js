import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:20000,
    headers:{
        'content-type': 'application/json',
        withCredentials: true,
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        //step global loader here
        return processResponse(response);
    },
    function(error) {
        //step global loader here
        return Promise.reject(processError(error));
    }
)

//////////////
//if success -> return {isSucess: true, data: object }
//if fail -> return {isFailure: true, status: string, msg:string, code:int }
/////////////
const processResponse = (response) => {
    if(response?.status === 200) {
        return { isSucess: true, data: response.data}
    }else {
        return {
            isFailure:true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError =(error)=>{
    if(error.response){
        //request made and server rerver responded with a status oyher
        //that falls out of the range 2.x.x
        console.log('ERROR IN RESPONSE:', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.reponseFailure,
            code: error.response.status
        }
    }else if (error.request){
        //request made but no response was receive
        console.log('ERROR IN REQUEST:', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: "NO_RESPONSE"
        }
    }else{
        //something happend in setting up request that triggers an error
        console.log('ERROR IN NETWORK:', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: "NETWORK_ISSUE"
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent){
                if (showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent){
                if (showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export{ API };