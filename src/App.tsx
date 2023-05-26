import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import {PixiManager} from './components/PixiManager';
import {useScene} from './hooks/useScene';
import {useLive2DModel} from './hooks/useLive2DModel';
import {useGetAudio} from './hooks/useGetAudio';
import {Loading} from "./components/feedback/components/Loading";

function App() {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync} = useGetAudio()

    const onInflowChange = useCallback((content: string) => {
        if(content){
            runAsync(content).then((audio:any)=>{
                motionWithAudio('Happy',audio)
            })
        }
    }, [motionWithAudio,runAsync])

    return (
        <div className="App">
            <PixiManager success={async (pixi) => {
                initScene(pixi)
                initLive2D(pixi)
            }}/>

            <div className="Feedback">
                <Feedback>
                    <Loading/>
                </Feedback>
            </div>
            <div className="Inflow">
                <Inflow onChange={onInflowChange}/>
            </div>
        </div>
    );
}

export default App;
