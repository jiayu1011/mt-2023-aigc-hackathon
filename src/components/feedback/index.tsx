import React, {memo, ReactNode} from "react";
import style from './index.module.scss'

interface IProps {
    children: ReactNode
    isLoading: boolean
}


export const Feedback: React.FC<IProps> = memo((props) => {
    const {isLoading} = props
    const loadingStyle = isLoading? {style: {width: '120px'}}:null

    return (
        <div className={style.container} {...loadingStyle}>
            <div className={style.bubbleHead}></div>
            <div className={style.wrapper}>
                {props.children}
            </div>
        </div>
    )
})
