import React, {ReactNode} from "react";

import style from './index.module.scss'

interface IProp {
    renderItem: (item: any, index: number) => ReactNode,
    data: any[]
}
export const List: React.FC<IProp> = (props) => {
    const {renderItem, data} = props

    return (
        <div className={style.container}>
            {data.map((item: any, index: number) => <div className={style.item}>{renderItem(item, index)}</div>)}
        </div>
    )
}