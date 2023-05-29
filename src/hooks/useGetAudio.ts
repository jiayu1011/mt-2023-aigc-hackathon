import {useCallback, useState} from "react";
import axios from "axios";
import {ALIYUN_TTS_APP_KEY, ALIYUN_TTS_TOKEN, MEITUAN_TTS_TOKEN} from "../configs";

const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

const getAliyunTTSAudio = (content: string) => {
    const format = 'wav'
    const voice = 'qingqing'
    const sample_rate = 16000;
    const url = `https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts`

    const params = {
        appkey: ALIYUN_TTS_APP_KEY,
        token: ALIYUN_TTS_TOKEN,
        format,
        voice,
        text: content,
        sample_rate,
        volume: 100
    };

    return axios.post(url, params, {responseType: 'arraybuffer',})
}

const getMeituanTTSAudio = (content: string) => {
    const sid = new Date().getTime() + 'a_whw'
    return axios.post('https://tts.vip.sankuai.com/api/v1/tts', {
        session_id: sid,
        text: content,
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
    })
}

/**
 * 文字转语音
 * @param type aliyun、meituan，需要在对应云服务控制后台获取当日有效的token
 */
export const useGetAudio = (type: string = 'meituan') => {

    const [loading, setLoading] = useState(false)

    const runAsync = useCallback((chat: string) => {

        const getTTSAudio = type === 'aliyun' ? getAliyunTTSAudio : getMeituanTTSAudio
        setLoading(true)
        // 取音频文件成 arraybuffer
        return getTTSAudio(chat).then((res) => {
            setLoading(false)
            const blob = new Blob([res?.data], {type: "audio/wav"})
            return blobToBase64(blob);
        }).catch(() => {
            setLoading(false)
        })

    }, [])

    return {runAsync, loading}
}

