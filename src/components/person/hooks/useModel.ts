import {useState} from "react";
import * as PIXI from 'pixi.js'
import {Live2DModel, MotionPriority} from "pixi-live2d-display";
// import {getAudio} from "../utils/voicevox";
import {blob2Base64} from "../../../utils/util";

export const useModel = () => {
    const [model, setModel] = useState<any>() // live2d model
    const [app, setApp] = useState<any>() // pixi app
    const [scale, setScale] = useState<number>(1)
    const [isAudioReady, setIsAudioReady] = useState<boolean>(false)

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


        setApp(pixiApp)

        const current = pixiApp

        const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json')

        // console.log('model', model)

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

        setScale(scale)

        // 全身
        // model.scale.set(scale * 1)
        // model.position.set(current.view.width / 2, current.view.height / 2)

        // 半身
        model.scale.set(scale * 1)
        model.position.set(current.view.width/3, current.view.height/2)

        setModel(model)

    }

    const lipSync = async (text: string) => {
        if (!model || !app || !text) return

    }

    return {
        model,
        scale,
        app,
        isAudioReady,
        motionManager: model?.internalModel.motionManager,
        init,
        lipSync
    }
}