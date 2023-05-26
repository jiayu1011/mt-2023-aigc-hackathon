import style from './index.module.scss'
import React from "react";

interface InfoType {
    headImg: any
    name: string
    limitDes: string
    mainDes: string
    price: string
    discount: string
    realPrice: string
    salesCount: string
}
interface IProps {
    info: InfoType
}

export const Card: React.FC<IProps> = (props) => {
    const {info} = props

    return (
        <div className={style.container}>
            <div className={style.leftBody}>
                <div className={style.headImg}></div>
            </div>
            <div className={style.centerBody}>
                <div>{info.name}</div>
                <div>{info.limitDes}</div>
                <div>{info.mainDes}</div>
                <div>
                    <div><span>¥</span><span>{info.price}</span></div>
                    <div>
                        <div>{info.discount}</div>
                    </div>
                    <div><span>¥</span><span>{info.realPrice}</span></div>
                </div>
            </div>
            <div className={style.rightBody}>
                <div></div>
                <div><span>半年售</span><span>{info.salesCount}</span></div>
            </div>
        </div>
    )
}