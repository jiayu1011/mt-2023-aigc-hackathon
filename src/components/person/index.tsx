import {memo} from "react";
import style from './index.module.scss'

interface Props {

}

export const Person = memo((props: Props) => {
    console.log(props)

    return (
        <div className={style.container}>
            Person
        </div>
    )
})
