import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';

import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import {PixiManager} from './components/PixiManager';
import {useScene} from './hooks/useScene';
import {useLive2DModel} from './hooks/useLive2DModel';
import {useGetAudio} from './hooks/useGetAudio';
import {useGetChatGPT} from './hooks/useGetChatGPT';
import {Loading} from "./components/feedback/components/Loading";
import {Card} from "./components/feedback/components/Card";
import {List} from "./components/feedback/components/List";
import {useMount} from "ahooks";

function App() {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync: runGetChatGPT} = useGetChatGPT()
    const {runAsync: runGetAudio, loading} = useGetAudio()


    const [chatResText, setChatResText] = useState<string>('')
    const [poiList, setPoiList] = useState<any[]>([])

    const [dealList, setDealList] = useState<any[]>([])

    const list = useMemo(() => poiList.length > 0 ? poiList : dealList, [poiList, dealList])

    const TestBtn = () => (
        <button
            style={{
                width: '100px',
                height: '100px',
                position: 'absolute',
                zIndex: '9',
                backgroundColor: 'transparent',
                color: 'transparent',
                border: 'none',
                top: '0',
                right: '0'
            }}
            onClick={() => {
                onInflowChange('你好')
            }}
        >
            start
        </button>
    )

    const Slot = () => {
        if (loading) return <Loading/>

        return (
            <div>
                {chatResText && <div>{chatResText}</div>}
                <List
                    renderItem={(item, index) => (
                        <Card key={`card-${index}`} info={item}/>
                    )}
                    data={list}
                />
            </div>
        )
    }

    const onInflowChange = useCallback(async (text: string) => {
        if (!text) return

        try {
            const chatRes: any = await runGetChatGPT(text)
            const {content, emotion, poiInfos, deals} = chatRes

            if (!content) return
            const audioRes: any = await runGetAudio(content)
            motionWithAudio(emotion, audioRes)

            setChatResText(content)
            poiInfos && setPoiList(poiInfos)
            deals && setDealList(deals)

        } catch (e: any) {
            throw new Error(e)
        }

    }, [motionWithAudio, runGetAudio, runGetChatGPT])

    return (
        <div className="App">
            <PixiManager success={async (pixi) => {
                initScene(pixi)
                initLive2D(pixi)
            }} render={() => <>
                <img src="/cat.gif" style={{zIndex: 1, position: "absolute", bottom: '10vh', left: '5vw', width: 250}}/>
            </>}/>

            {
                chatResText && (
                    <div className="Feedback">
                        <Feedback><Slot/></Feedback>
                    </div>
                )
            }
            <div className="Inflow">
                <Inflow onChange={onInflowChange}/>
            </div>
            <TestBtn></TestBtn>
        </div>
    );
}

export default App;
