import {memo, useCallback, useEffect, useState} from "react";
import cx from "classnames"
import style from './index.module.scss'
import {useSpeechRecognition} from "./hooks";

interface Props {
    onChange?: (content: any) => void
}

export const Inflow = memo((props: Props) => {
    const {onChange} = props
    const [isRecord, setIsRecord] = useState<boolean>(false)
    const {content, start, stop, clearContent} = useSpeechRecognition()

    const onRecordClick = useCallback(() => {
        if (isRecord) {
            stop()
            onChange && onChange(content)
        } else {
            clearContent()
            start()
        }
        setIsRecord(!isRecord)
    }, [isRecord, content])

    return (
        <div className={style.container}>
            <div className={style.contentContainer}>
                {content || '...'}
            </div>
            <div className={style.recordContainer}>
                <div className={cx(style.record, isRecord ? style.hover : null)} onClick={onRecordClick}>
                    <img className={style.recordImage}
                         src="https://p0.meituan.net/travelcube/671650a00cc5898ff0ea56e4155e21836051.png"/>
                </div>
            </div>
        </div>
    )
})
