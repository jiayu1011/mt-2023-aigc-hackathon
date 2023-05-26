import {useCallback, useEffect, useState} from "react";
import * as PIXI from "pixi.js";
import {Live2DModel, MotionPriority} from "pixi-live2d-display";
import {useMount} from "ahooks";

type MotionType = 'Flat' | 'Happy' | 'Surprise' | 'Despair' | 'Sad' | 'Why' | 'Care'


export const useLive2DModel = () => {

    const [model, setModel] = useState<any>() // live2d model

    const [isMotionFinished, setIsMotionFinished] = useState<boolean>(true)
    const [isAudioFinished, setIsAudioFinished] = useState<boolean>(true)

    const initLive2DModel = async (pixiApp: PIXI.Application) => {
        if (!pixiApp) return

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

    useEffect(() => {
        if (!model) return

        model.internalModel.motionManager.once('motionFinish', () => {
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

    const motion = useCallback( (type: MotionType) => {
        if (!model) return

        setIsMotionFinished(false)
        stopAllMotion()
        model.motion(type)
    },[model])

    const motionWithAudio = (type: MotionType, audioB64: ArrayBuffer) => {
        if (!model) return

        setIsMotionFinished(false)
        stopAllMotion()
        model.motion(type, 0, MotionPriority.NORMAL, audioB64)
    }

    return {
        init:initLive2DModel,
        motion,
        motionWithAudio,
        stopAllMotion,
        model
    }
}