import {memo, useCallback, useEffect, useState} from "react";
import cx from "classnames"
import style from './index.module.scss'
import {useSpeechRecognition} from "../../hooks/useSpeechRecognition";

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
                    {!isRecord && <img className={style.recordImage}
                                       src="record-static.png"/>}
                    {isRecord && <div style={{width: 60, height: 60, overflow: 'hidden', position: 'relative'}}>
                        <img style={{height: 120, top: -30, left: -50, position: 'absolute'}} src="./record.gif"/>
                    </div>}
                </div>
            </div>
        </div>
    )
})
