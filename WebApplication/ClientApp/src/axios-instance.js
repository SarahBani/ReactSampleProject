import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: ''
});

//instance.default.headers.common['Authorization'] = 'Auth Token dgdfgdfg';
//instance.default.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(requestConfig => {
    return requestConfig;
}, error => {
    console.log('axiosInstance request error');
    console.log(error);
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(responseConfig => {
    return responseConfig;
}, error => {
    console.log('axiosInstance response error');
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;