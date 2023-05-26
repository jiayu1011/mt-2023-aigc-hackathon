import React, {memo, ReactNode} from "react";
import style from './index.module.scss'

interface IProps {
    children: ReactNode
}


export const Feedback: React.FC<IProps> = memo((props) => {

    return (
        <div className={style.container}>
            <div className={style.bubbleHead}></div>
            <div className={style.wrapper}>
                {props.children}
            </div>
        </div>
    )
})
