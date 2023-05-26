
import { useCallback,useState } from "react";
import axios from "axios";



export const useGetChatGPT = ()=>{
    const [loading,setLoading] = useState(false)

    const runAsync = useCallback((chat:string)=>{
        // 取音频文件成 arraybuffer
        setLoading(true)
        return axios({
            method:'GET',
            url:`http://10.147.20.79:5001/chat?message=${chat}`,
            timeout: 60 * 5 * 1000
          }).then((res)=>{
            return res?.data
        }).catch(()=>{
            setLoading(false)
        })
       
    },[])

    return { runAsync,loading }
}

