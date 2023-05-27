import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';

import {Feedback} from "./components/feedback";
import {Inflow} from "./components/inflow";
import {PixiManager} from './components/PixiManager';
import {useScene} from './hooks/useScene';
import {useLive2DModel} from './hooks/useLive2DModel';
import {useGetAudio} from './hooks/useGetAudio';
import { useGetChatGPT } from './hooks/useGetChatGPT';
import {Loading} from "./components/feedback/components/Loading";
import {Card} from "./components/feedback/components/Card";
import {List} from "./components/feedback/components/List";
import {useMount} from "ahooks";

const App: React.FC = () => {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync: runGetChatGPT} = useGetChatGPT()
    const {runAsync: runGetAudio} = useGetAudio()

    const [loading, setLoading] = useState<boolean>(false)
    const [chatResText, setChatResText] = useState<string>('')
    const [list, setList] = useState<any[]>([])

    const TestBtn = () => (
        <button
            style={{width: '100px', height: '100px', position: 'absolute', zIndex: '9', backgroundColor: 'transparent', color: 'transparent', border: 'none', top: '0', right: '0'}}
            onClick={() => {sendChat('你好')}}
        >
            start
        </button>
    )

    const Slot = () => {
        // return <Loading/>
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

    const sendChat = useCallback(async (text: string) => {
        if (!text) return

        try {
            setLoading(true)

            const chatRes: any = await runGetChatGPT(text)
            const {content, emotion, poiInfos, deals} = chatRes

            if (!content) return
            const audioRes: any = await runGetAudio(content)
            motionWithAudio(emotion, audioRes)

            setChatResText(content)

            const poiList = poiInfos?.map((item: any) => ({
                headImg: item.poiHeadImg,
                name: item.poiName,
                address: item.address,
            })) || []
            const dealsList = deals?.map((item: any) => ({
                headImg: item.heaImg,
                name: item.dealName,
                price: item.dealPrice,
            })) || []
            setList(poiList.length>0 ? poiList:dealsList)

            setLoading(false)
        } catch (e: any) {
            throw new Error(e)
        }

    }, [motionWithAudio,runGetAudio,runGetChatGPT])

    const showFeedBack = useMemo(() => loading || chatResText, [loading, chatResText])

    return (
        <div className="App">
            <PixiManager success={async (pixi) => {
                initScene(pixi)
                initLive2D(pixi)
            }}/>

            {
                showFeedBack && (
                    <div className="Feedback">
                        <Feedback><Slot/></Feedback>
                    </div>
                )
            }
            <div className="Inflow">
                <Inflow onChange={sendChat}/>
            </div>
            <TestBtn></TestBtn>
        </div>
    );
}

export default App;
