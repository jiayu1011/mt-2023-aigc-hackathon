import React from "react";
import style from "./index.module.scss";

export const Loading: React.FC = () => (
    <div className={style.loading}>
        <div className={style.loadingPoint}></div>
        <div className={style.loadingPoint}></div>
        <div className={style.loadingPoint}></div>
    </div>
)