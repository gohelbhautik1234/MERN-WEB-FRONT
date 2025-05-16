import axios from 'axios'

// const Url=http://localhost:5000 //local
const axiosinstance=axios.create({
    baseURL:'https://mern-web-backend.vercel.app',
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