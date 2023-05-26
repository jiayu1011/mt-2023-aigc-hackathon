import {memo, useEffect} from "react";
import cx from "classnames"
import style from './index.module.scss'
import {useSpeechRecognition} from "./hooks";

interface Props {
    onChange?: (content: string) => void
}

export const Inflow = memo((props: Props) => {
    const {onChange} = props
    const {content, trigger, isRecord, clearContent} = useSpeechRecognition()

    useEffect(() => {
        if (!isRecord && content) {
            onChange && onChange(content)
        } else {
            clearContent()
        }
    }, [isRecord])

    return (
        <div className={style.container}>
            <div className={style.contentContainer}>
                {content || '...'}
            </div>
            <div className={style.recordContainer}>
                <div className={cx(style.record, isRecord ? style.hover : null)} onClick={trigger}>
                    <img className={style.recordImage}
                         src="https://p0.meituan.net/travelcube/671650a00cc5898ff0ea56e4155e21836051.png"/>
                </div>
            </div>
        </div>
    )
})
