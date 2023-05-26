
import { useCallback,useState } from "react";
import axios from "axios";

const blobToBase64 =(blob:any) =>{
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
}

export const useGetAudio = ()=>{

    const [loading,setLoading] = useState(false)

    const runAsync = useCallback((chat:string)=>{
        const sid = new Date().getTime()+'a_whw'
        // 取音频文件成 arraybuffer
        setLoading(true)
        return axios.post('https://tts.vip.sankuai.com/api/v1/tts',{
            session_id:sid,
            text:chat,
            voice_name:'meimiyu',
            speed:50,
            volume:50,
            sample_rate:16000,
            audio_format:'wav'
        },{
        responseType:'arraybuffer',
        headers:{
            Token:'v1.951db38b25314bccb54466bee705fc28.86400000.1685104965453-1149628490354581520',
            SessionID:sid
        }
        }).then((res)=>{
            setLoading(false)
            const blob = new Blob([res?.data], { type: "audio/wav" })
            return blobToBase64(blob);
        }).catch(()=>{
            setLoading(false)
        })
       
    },[])

    return { runAsync,loading }
}

