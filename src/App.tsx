import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import {PixiManager} from './components/PixiManager';
import {useScene} from './hooks/useScene';
import {useLive2DModel} from './hooks/useLive2DModel';
import {useGetAudio} from './hooks/useGetAudio';
import { useGetChatGPT } from './hooks/useGetChatGPT';

function App() {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync:runGetAudio} = useGetAudio()
    const {runAsync:runGetChatGPT} = useGetChatGPT()

    const onInflowChange = useCallback((content: string) => {
        if(content){
            runGetChatGPT(content).then((res)=>{
                const {content,emotion, poiInfos, deals} = res||{}
                // 调用动作
                if(content){
                    runGetAudio(content).then((audio:any)=>{
                        motionWithAudio(emotion,audio)
                    })
                }
                // 聊天窗口展示。。。
              
            })
        }
    }, [motionWithAudio,runGetAudio,runGetChatGPT])

    return (
        <div className="App">
            <PixiManager success={async (pixi) => {
                initScene(pixi)
                initLive2D(pixi)
            }}/>

            <div className="Feedback">
                <Feedback>
                    <div></div>
                </Feedback>
            </div>
            <div className="Inflow">
                <Inflow onChange={onInflowChange}/>
            </div>
        </div>
    );
}

export default App;
