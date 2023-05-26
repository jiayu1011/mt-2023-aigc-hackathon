import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {useModel} from "./hooks/useModel";
import {useMount} from "ahooks";
import {Live2DModel, MotionPriority} from "pixi-live2d-display";
import style from './index.module.scss'
import * as PIXI from "pixi.js";

type MotionType = 'Flat' | 'Happy' | 'Surprise' | 'Despair' | 'Sad' | 'Why' | 'Care'

interface IProps {

}
export const Person = forwardRef((props: IProps, ref) => {

    // const {init, model, motionManager} = useModel()

    const [model, setModel] = useState<any>() // live2d model

    const [isMotionFinished, setIsMotionFinished] = useState<boolean>(true)
    const [isAudioFinished, setIsAudioFinished] = useState<boolean>(true)

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

        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json')

        console.log('model', model)

        pixiApp.stage.addChild(model)

        model.anchor.set(0.5, 0.5)

        const modelAspectRatio = model.width / model.height
        const screenAspectRatio = pixiApp.view.width / pixiApp.view.height
        let scale = 1
        if (screenAspectRatio > modelAspectRatio) {
            scale = pixiApp.view.height / model.height
        } else {
            scale = pixiApp.view.width / model.width
        }


        // 全身
        // model.scale.set(scale * 1)
        // model.position.set(pixiApp.view.width / 2, pixiApp.view.height / 2)

        // 半身
        model.scale.set(scale * 1.6)
        model.position.set(pixiApp.view.width*0.4, pixiApp.view.height*0.85)

        setModel(model)
    }

    useMount(async () => {
        await init()
    })

    useEffect(() => {
        if (!model) return

        model.internalModel.motionManager.on('motionFinish', () => {
            console.log('motionFinish')
            setIsMotionFinished(true)
        })
    }, [model])



    useEffect(() => {
        if (!isMotionFinished || !isAudioFinished) return

        motion('Flat')
    }, [isMotionFinished, isAudioFinished])


    const stopAllMotion = () => {
        if (!model) return
        model.internalModel.motionManager.stopAllMotions()
    }

    const motion = (type: MotionType) => {
        if (!model) return

        setIsMotionFinished(false)
        stopAllMotion()
        model.motion(type, 0)
    }

    const motionWithAudio = (type: MotionType, audioB64: ArrayBuffer) => {
        if (!model) return

        setIsMotionFinished(false)
        stopAllMotion()
        model.motion(type, 0, MotionPriority.NORMAL, audioB64)
    }

    useImperativeHandle(ref, () => ({
        motion: motion,
        motionWithAudio: motionWithAudio,
    }))

    return (
        <canvas id='canvas'></canvas>
    )
})


