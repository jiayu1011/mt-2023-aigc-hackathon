import style from './index.module.scss'
import React, {memo, useMemo} from "react";

interface InfoType {
    headImg: any
    name: string
    price?: string
    address?: string
}
interface IProps {
    info: InfoType,
    type: 'poi' | 'deal'
}

export const Card: React.FC<IProps> = memo((props) => {
    const {info, type} = props

    const poiCard = useMemo(() => (
        <div className={style.container}>
            <div className={style.leftBody}>
                <img className={style.headImg} src={info.headImg}></img>
            </div>
            <div className={style.centerBody}>
                <div className={style.name}>{info.name}</div>
                <div className={style.secondRow}>
                    <img className={style.star} alt='star' src='https://p0.meituan.net/ingee/d44d3a0f10a071c1153292d03f7bd54b948.png'/>
                    <div className={style.score}>5.0</div>
                    <div style={{marginLeft: '10px'}}>
                        <span>¥{50+Math.floor(Math.random()*50)}/人</span>
                    </div>
                    <div style={{marginLeft: '10px'}}>
                        <span>{3000+Math.floor(Math.random()*3000)}人评价</span>
                    </div>

                </div>

                <img className={style.recommendIcon} alt='rec' src='https://p0.meituan.net/ingee/579167f36616c98c684e6187991054643145.png'/>

                <div className={style.addressRow}>
                    <img className={style.addressIcon} alt='address' style={{height: '12px', width: '12px'}} src='https://p0.meituan.net/ingee/a599771fce63f844e95bc3226e05abba752.png'></img>
                    <div>{info.address}</div>
                </div>
            </div>
        </div>
    ), [info])

    const dealCard = useMemo(() => (
        <div className={style.container}>
            <div className={style.leftBody}>
                <img className={style.headImg} src={info.headImg}></img>
            </div>
            <div className={style.centerBody}>
                <div className={style.name}>{info.name}</div>
                <div className={style.secondRow}>
                    <span>周一至周五可用</span>
                    <span>·</span>
                    <span>包间不可用</span>
                </div>

                <div className={style.priceRow}>
                    <div className={style.priceIcon}>¥</div>
                    <div className={style.price}>{info.price}</div>
                    <div className={style.discount}>{(1+Math.random()*9).toFixed(1)}折</div>
                    <div className={style.realPrice}>¥{Math.floor(50+Math.random()*50)}</div>
                </div>
            </div>
        </div>
    ), [info])

    return (
        <>
            {type === 'poi'? poiCard : dealCard}
        </>
    )
})