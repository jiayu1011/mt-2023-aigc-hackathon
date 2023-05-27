import style from './index.module.scss'
import React from "react";

interface InfoType {
    headImg: any
    name: string
    price?: string
    address?: string
}
interface IProps {
    info: InfoType
}

export const Card: React.FC<IProps> = (props) => {
    const {info} = props

    return (
        <div className={style.container}>
            <div className={style.leftBody}>
                <img className={style.headImg} src={info.headImg}></img>
            </div>
            <div className={style.rightBody}>
                <div>{info.name}</div>
                <div>{info.address}</div>
                <span>¥</span><span>{info.price}</span>
            </div>
        </div>
    )
}