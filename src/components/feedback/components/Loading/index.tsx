import React from "react";
import style from "./index.module.scss";
import cx from 'classnames'

export const Loading: React.FC = () => (
    <div className={style.loading}>
        <div className={cx(style.loadingPoint, style.loadingPoint1)}></div>
        <div className={cx(style.loadingPoint, style.loadingPoint2)}></div>
        <div className={cx(style.loadingPoint, style.loadingPoint3)}></div>
    </div>
)