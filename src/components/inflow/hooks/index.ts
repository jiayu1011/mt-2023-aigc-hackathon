import {useCallback, useEffect, useRef, useState} from "react";


export const useSpeechRecognition = (resultCallback?: (content: string) => void) => {
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const [content, setContent] = useState<string | null>()
    const speechRecognitionRef = useRef<any>()

    useEffect(() => {
        const recognition = new ((window as any).webkitSpeechRecognition || (window as any).speechRecognition)()
        speechRecognitionRef.current = recognition
        recognition.lang = 'zh-CN'
        recognition.continuous = true
        recognition.interimResults = true
        recognition.onresult = (event: any) => {
            console.log(event.results)
            let temp = ''
            for (let i = 0; i < Object.keys(event.results).length; i++) {
                temp += event.results[i][0].transcript
            }
            resultCallback && resultCallback(temp)
            setContent(temp)
            console.log(temp)
        }
    })

    const start = useCallback(() => {
        if (!isRecord) {
            setIsRecord(true)
            speechRecognitionRef?.current?.start()
        }
    }, [isRecord])

    const stop = useCallback(() => {
        if (isRecord) {
            setIsRecord(false)
            speechRecognitionRef?.current?.stop()
        }
    }, [isRecord])

    const clearContent = useCallback(() => {
        setContent(null)
    }, [])

    const trigger = useCallback(() => {
        if (!isRecord) {
            start()
        } else {
            stop()
        }
    }, [isRecord, start, stop])

    return {trigger, start, stop, content, clearContent, isRecord}
}
