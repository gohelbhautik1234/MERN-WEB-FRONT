import axios from 'axios'

const axiosinstance=axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        "Content-Type":"application/json",
    },
})

//interceptor to attcach localstorage token,
axiosinstance.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');

    if(token)
    {
        config.headers.Authorization=`${token}`
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

export default axiosinstance;