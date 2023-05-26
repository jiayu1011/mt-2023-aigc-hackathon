import {forwardRef, useEffect, useImperativeHandle} from "react";
import {Live2D} from "./components/Live2D";
import {useModel} from "./hooks/useModel";
import {useMount} from "ahooks";
import {MotionPriority} from "pixi-live2d-display";
import style from './index.module.scss'

type MotionType = 'Flat' | 'Happy' | 'Surprise' | 'Despair' | 'Sad' | 'Why' | 'Care'

interface IProps {

}
export const Person = forwardRef((props: IProps, ref) => {

    const {init, model, motionManager} = useModel()

    useMount(async () => {
        await init()
        console.log('motionManager', motionManager)
    })


    const resetMotion = () => {
        /**
         * 动作或语音结束后两秒回到Idle动画
         */
    }



    const motion = (type: MotionType) => {
        console.log(motionManager)
        if (!model || !motionManager) return

        motionManager.stopAllMotions()
        model.motion(type, 0)


    }

    const motionWithAudio = (type: MotionType, audioB64: ArrayBuffer) => {
        if (!model || !motionManager) return

        motionManager.stopAllMotions()
        model.motion(type, 0, MotionPriority.NORMAL, audioB64)
    }

    useImperativeHandle(ref, () => ({
        motion: motion,
        motionWithAudio: motionWithAudio,
        motionManager: () => motionManager
    }))

    return (
        <div>
            <Live2D/>
        </div>
    )
})


