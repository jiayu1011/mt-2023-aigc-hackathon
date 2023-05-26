import React from 'react';
import './App.css';
import {Scene} from "./components/scene";
import {Person} from "./components/person";
import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";

function App() {


    return (
        <div className="App">
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
