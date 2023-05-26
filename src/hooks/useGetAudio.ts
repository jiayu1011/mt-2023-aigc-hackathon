
import { useCallback } from "react";
import axios from "axios";

export const useGetAudio = ()=>{
    const run = useCallback((chat:string ,modal:any, cb?:any)=>{
        const sid = new Date().getTime()+'a_whw'
        // 取音频文件成 arraybuffer
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
            Token:'v1.a810f361dd6b4aa1898dd266f3a19cd1.86400000.1685017682279-1149628490354581520',
            SessionID:sid
        }
        }).then((res)=>{
            return res?.data;
        })
    },[])

    return { run }
}

