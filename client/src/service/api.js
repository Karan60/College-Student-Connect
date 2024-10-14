import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        'content-type': 'application/json'
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
    }else if (error.request){
        //request made but no response was receive
    }else{
        //something happend in setting up request that triggers an error
    }
}


