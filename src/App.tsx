import React from 'react';
import './App.css';
import {Scene} from "./components/scene";
import {Person} from "./components/person";
import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import { PixiManager } from './components/PixiManager';
import { useScene } from './hooks/useScene';

function App() {

    const {init:initScene} = useScene()
    
    return (
        <div className="App">
          
            <PixiManager success={(pixi)=>{
                initScene(pixi)
            }}/>
            <div className="Scene">
                <Scene/>
            </div>
            <div className="Person">
                <Person/>
            </div>
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
