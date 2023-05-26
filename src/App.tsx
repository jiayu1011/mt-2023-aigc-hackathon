import React, {useCallback} from 'react';
import './App.css';
import {Scene} from "./components/scene";
import {Person} from "./components/person";
import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";

function App() {

    const onInflowChange = useCallback((content: string) => {
        alert(content)
    }, [])

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
                <Inflow onChange={onInflowChange}/>
            </div>
        </div>
    );
}

export default App;
