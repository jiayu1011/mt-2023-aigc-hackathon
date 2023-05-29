import React, {useEffect, useRef, useState} from 'react';
import * as PIXI from "pixi.js";

interface IPixiManager {
    options?: PIXI.IApplicationOptions
    success?: (pixi: PIXI.Application) => void
    canvasStyle?: any
    render?: (pixi: PIXI.Application) => React.ReactNode
}

export const PixiManager: React.FC<IPixiManager> = (props) => {
    const {options, canvasStyle, success, render} = props

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [pixi, setPixi] = useState<PIXI.Application>()

    useEffect(() => {
        (window as any).PIXI = PIXI
        if (!canvasRef.current) return
        const pixiApp = new PIXI.Application({
            view: canvasRef.current,
            resizeTo: window,
            transparent: true,
            ...options
        })

        setPixi(pixiApp)
        success && success(pixiApp)

    }, [])


    return <div style={{position: 'relative'}}>
        <canvas ref={canvasRef} style={{...canvasStyle}}></canvas>
        {pixi && render && render(pixi)}
    </div>
}
