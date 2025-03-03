import axios from "axios"
 export const apiClient= axios.create({
    baseURL: 'https://dummyjson.com'
})

apiClient.interceptors.response.use(
    (res)=>{
        console.log(res);
        
return{
    data:res?.data,
    is_succes:res?.status === 200 ? true :false
}
    },
    (err)=>{
        console.log(err);
        
    }
)
let token = localStorage.getItem("access")
apiClient.interceptors.request.use(
    (conf)=>{
        conf.headers.set('Authorization', `Bearer ${token}`
        )
        console.log(conf);
        return conf
    },
    (err)=>{
        console.log(err.message);
        
    }
)