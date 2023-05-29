import {useCallback, useEffect, useRef, useState} from "react";


export const useSpeechRecognition = (resultCallback?: (content: string) => void) => {
    const [content, setContent] = useState<any>()
    const speechRecognitionRef = useRef<any>()

    useEffect(() => {
        const recognition = new ((window as any).webkitSpeechRecognition || (window as any).speechRecognition)()
        speechRecognitionRef.current = recognition
        recognition.lang = 'zh-CN'
        recognition.continuous = true
        recognition.interimResults = true
        recognition.onresult = (event: any) => {
            // console.log(event.results)
            let temp = ''
            for (let i = 0; i < Object.keys(event.results).length; i++) {
                temp += event.results[i][0].transcript
            }
            resultCallback && resultCallback(temp)
            setContent(temp)
        }
    }, [resultCallback])

    const start = useCallback(() => {
        speechRecognitionRef?.current?.start()
    }, [])

    const stop = useCallback(() => {
        speechRecognitionRef?.current?.stop()
    }, [])

    const clearContent = useCallback(() => {
        setContent(null)
    }, [])

    return {start, stop, content, clearContent}
}
