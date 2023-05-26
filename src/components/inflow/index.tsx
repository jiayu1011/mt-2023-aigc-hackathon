import {memo} from "react";
import style from './index.module.scss'

interface Props {

}

export const Inflow = memo((props: Props) => {
    console.log(props)

    return (
        <div className={style.container}>
            <div className={style.contentContainer}>
                你可以问我“今天吃什么呀”
            </div>
            <div className={style.recordContainer}>
                <div className={style.record}>
                    <img className={style.recordImage} src="https://p0.meituan.net/travelcube/671650a00cc5898ff0ea56e4155e21836051.png"/>
                </div>
            </div>
        </div>
    )
})
