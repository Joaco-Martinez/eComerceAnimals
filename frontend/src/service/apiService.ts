/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import toast from "react-hot-toast"
import type { AxiosRequestConfig } from "axios"
const axiosRes = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/api" ,
})

const get = async (url:string,credentials:boolean = false, showSuccess:boolean = false, showFail:boolean = false) =>{
    try {
        const res = await axiosRes.get(url, {withCredentials:credentials})
        if (showSuccess){
            toast.success(res.data.message, { duration: 2000 });
        }
        if(res.data.content){
            return res.data.content
        }
        return res.data
        

    } catch (error: any) {
        if (showFail){
            toast.error(error.response.data.message, { duration: 2000 });
        }
        console.log(error)
    }
}


const post = async (
  url: string,
  data: unknown,
  credentials = false,
  showSuccess = false,
  showFail = false,
  config: AxiosRequestConfig = {}
) => {
  try {
    const res = await axiosRes.post(url, data, {
      withCredentials: credentials,
      ...config,
    });

    if (showSuccess) {
      toast.success(res.data.message, { duration: 2000 });
    }

    if (res.data.content) {
      return res.data.content;
    }

    return res.data;
  } catch (error: any) {
    if (showFail) {
      toast.error(error.response?.data?.message || "Error", { duration: 2000 });
    }
    console.log(error);
  }
};

const put = async (
  url: string,
  data: unknown,
  credentials = false,
  showSuccess = false,
  showFail = false,
  config: AxiosRequestConfig = {}
) => {
  try {
    const res = await axiosRes.put(url, data, {
      withCredentials: credentials,
      ...config,
    });

    if (showSuccess) {
      toast.success(res.data.message, { duration: 2000 });
    }

    if (res.data.content) {
      return res.data.content;
    }
    return res.data;
  } catch (error: any) {
    if (showFail) {
      toast.error(error.response?.data?.message || "Error", { duration: 2000 });
    }
    console.log(error);
  }
};

const del = async (url:string,  credentials:boolean = false, showSuccess:boolean = false, showFail:boolean = false) => {
    try {
        const res = await axiosRes.delete(url, {withCredentials:credentials})
         if (showSuccess){
            toast.success(res.data.message, { duration: 2000 });
        }
        
        if(res.data.content){
            return res.data.content
        }
        return res.data
    } catch (error:any) {
        if (showFail){
            toast.error(error.response.data.message, { duration: 2000 });
        }
        console.log(error)
    }
}

const patch = async (url:string, data:unknown, credentials:boolean = false,  showSuccess:boolean = false, showFail:boolean = false) => {
    try {
        const res = await axiosRes.patch(url, data, {withCredentials:credentials})
         if (showSuccess){
            toast.success(res.data.message, { duration: 2000 });
        }
        
        if(res.data.content){
            return res.data.content
        }
        return res.data
    } catch (error:any) {
        if (showFail){
            toast.error(error.response.data.message, { duration: 2000 });
        }
        console.log(error)
    }
}

const apiService = {
    get,
    post,
    put,
    del,
    patch
}
export default apiService