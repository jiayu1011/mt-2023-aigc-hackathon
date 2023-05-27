import {useCallback, useEffect, useState} from "react";
import * as PIXI from "pixi.js";
import {Live2DModel, MotionPriority} from "pixi-live2d-display";


type MotionType = 'Flat' | 'Happy' | 'Surprise' | 'Despair' | 'Sad' | 'Why' | 'Care'


export const useLive2DModel = () => {

    const [model, setModel] = useState<Live2DModel>() // live2d model

    const [isMotionFinished, setIsMotionFinished] = useState<boolean>(true)
    const [isAudioFinished, setIsAudioFinished] = useState<boolean>(true)
    const [needsResetMotion, setNeedsResetMotion] = useState<boolean>(false)

    const init = async (pixiApp: PIXI.Application) => {
        if (!pixiApp) return

        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json')

        console.log('model', model)

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
        model.scale.set(scale)
        model.position.set(pixiApp.view.width*0.4, pixiApp.view.height / 2)

        // 半身
        // model.scale.set(scale * 1.6)
        // model.position.set(pixiApp.view.width*0.4, pixiApp.view.height*0.85)

        model.internalModel.motionManager.on('motionFinish', () => {
            console.log('motion finish')
            setIsMotionFinished(true)
        })

        pixiApp.stage.addChild(model)

        setModel(model)
    }

    const triggerResetMotion = useCallback(() => {
        /**
         * 触发重置动画（Flat）
         */
        if (!model) return
        setNeedsResetMotion(false)
        model.motion('Flat')
    }, [model])

    const stopAllMotion = useCallback(() => {
        if (!model) return
        model.internalModel.motionManager.stopAllMotions()
    }, [model])

    const motion = useCallback((type: MotionType) => {
        /**
         * 调用动画
         */
        if (!model) return

        setIsMotionFinished(false)
        setNeedsResetMotion(true)
        stopAllMotion()
        model.motion(type)
    }, [model])

    const motionWithAudio = useCallback((type: MotionType, audioB64: string) => {
        /**
         * 调用带声音的动画，格式为wav或base64
         */
        if (!model) return

        setIsMotionFinished(false)
        setIsAudioFinished(false)
        setNeedsResetMotion(true)
        stopAllMotion()
        model.motion(type, 0, MotionPriority.NORMAL, audioB64)
        if (model?.internalModel.motionManager.currentAudio) {
            model.internalModel.motionManager.currentAudio.onended = () => {
                console.log('audio finish')
                setIsAudioFinished(true)
            }
        }
    }, [model])

    useEffect(() => {
        // 此处监听needsResetMotion，防止重置动画结束触发的无限循环
        if (!isMotionFinished || !isAudioFinished || !needsResetMotion) return

        triggerResetMotion()
    }, [isMotionFinished, isAudioFinished, needsResetMotion])

    return {
        init,
        model,
        motion,
        motionWithAudio,
        stopAllMotion,
    }
}