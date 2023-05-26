import {memo, ReactNode} from "react";
import style from './index.module.scss'

interface Props {
    children: ReactNode
}


export const Feedback = memo((props: Props) => {

    return (
        <div className={style.container}>
            <div className={style.bubbleHead}></div>
            <div className={style.wrapper}>
                {props.children}
            </div>
        </div>
    )
})
