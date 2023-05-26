import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Live2DModel, MotionPriority} from "pixi-live2d-display";
import * as PIXI from 'pixi.js'
import {Live2D} from "./components/Live2D";


type MotionType = 'Flat' | 'Happy' | 'Surprise' | 'Despair' | 'Sad' | 'Why' | 'Care'


interface Props {

}

export const Person = forwardRef((props: Props, ref: any) => {

    // const {} = props

    const [model, setModel] = useState<any>()


    const init = async () => {
        if (!window) return

        (window as any).PIXI = PIXI

        const canvas = document.getElementById('canvas')
        if (!canvas) return

        const pixiApp = new PIXI.Application({
            view: canvas as HTMLCanvasElement,
            resizeTo: window,
            transparent: true
        })

        const current = pixiApp
        if (!current) return

        const model = await Live2DModel.from(process.env.REACT_APP_MODEL_PATH || '')

        console.log('model', model)

        current.stage.addChild(model)

        model.anchor.set(0.5, 0.5)

        const modelAspectRatio = model.width / model.height
        const screenAspectRatio = current.view.width / current.view.height
        let scale = 1
        if (screenAspectRatio > modelAspectRatio) {
            scale = current.view.height / model.height
        } else {
            scale = current.view.width / model.width
        }

        // 全身
        // model.scale.set(scale * 1)
        // model.position.set(current.view.width / 2, current.view.height / 2)

        // 半身
        model.scale.set(scale * 1.6)
        model.position.set(current.view.width*0.4, current.view.height*0.85)

        setModel(model)
    }


    useEffect(() => {
        init()
    }, [])

    const motion = (type: MotionType) => {


    }

    // 暴露方法
    useImperativeHandle(ref, () => ({
        hello,
        motion
    }), [])

    return (
        <div>
            <Live2D/>
        </div>
    )
})


const hello = () => {
    console.log(111)
}
