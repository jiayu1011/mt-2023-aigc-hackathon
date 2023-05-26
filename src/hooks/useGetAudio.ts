import {useCallback, useState} from "react";
import axios from "axios";
import {MEITUAN_TTS_TOKEN} from "../configs";

const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export const useGetAudio = () => {

    const [loading, setLoading] = useState(false)

    const runAsync = useCallback((chat: string) => {
        const sid = new Date().getTime() + 'a_whw'
        // 取音频文件成 arraybuffer
        setLoading(true)
        return axios.post('https://tts.vip.sankuai.com/api/v1/tts', {
            session_id: sid,
            text: chat,
            voice_name: 'meimiyu',
            speed: 50,
            volume: 50,
            sample_rate: 16000,
            audio_format: 'wav'
        }, {
            responseType: 'arraybuffer',
            headers: {
                Token: MEITUAN_TTS_TOKEN,
                SessionID: sid
            }
        }).then((res) => {
            setLoading(false)
            const blob = new Blob([res?.data], {type: "audio/wav"})
            return blobToBase64(blob);
        }).catch(() => {
            setLoading(false)
        })

    }, [])

    return {runAsync, loading}
}

