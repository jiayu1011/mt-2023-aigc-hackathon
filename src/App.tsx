import React, { useEffect } from 'react';
import './App.css';

import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import { PixiManager } from './components/PixiManager';
import { useScene } from './hooks/useScene';
import { useLive2DModel } from './hooks/useLive2DModel';
import { useGetAudio } from './hooks/useGetAudio';

function App() {

    const {init:initScene} = useScene()
    const {init:initLive2D, motion } = useLive2DModel()
    const { run } = useGetAudio()

    useEffect(()=>{

        setTimeout(()=>{
            motion('Happy')
        },2000)
    },[motion])
    return (
        <div className="App">
            <PixiManager success={async(pixi)=>{
                initScene(pixi)
                initLive2D(pixi)
            }}/>

            <div className="Feedback">
                <Feedback/>
            </div>
            <div className="Inflow">
                <Inflow/>
            </div>
        </div>
    );
}

export default App;
