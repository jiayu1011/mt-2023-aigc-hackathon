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

function App() {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync: runGetAudio} = useGetAudio()
    const {runAsync: runGetChatGPT} = useGetChatGPT()


    const [loading, setLoading] = useState<boolean>(false)
    const [chatResText, setChatResText] = useState<string>('')
    const [poiList, setPoiList] = useState<any[]>([])

    const [dealList, setDealList] = useState<any[]>([{
        headImg: '',
        name: '单人餐法式甜品',
        limitDes: '周一至周五可用 包间不可用',
        mainDes: '入口即化，好吃又低脂',
        price: '45',
        discount: '0.89',
        realPrice: '51',
        salesCount: '128',
    }, {
        headImg: '',
        name: '单人餐法式甜品',
        limitDes: '周一至周五可用 包间不可用',
        mainDes: '入口即化，好吃又低脂',
        price: '45',
        discount: '0.89',
        realPrice: '51',
        salesCount: '128',
    }, {
        headImg: '',
        name: '单人餐法式甜品',
        limitDes: '周一至周五可用 包间不可用',
        mainDes: '入口即化，好吃又低脂',
        price: '45',
        discount: '0.89',
        realPrice: '51',
        salesCount: '128',
    }])

    const list = useMemo(() => poiList.length > 0 ? poiList : dealList, [poiList, dealList])

    const Slot = () => {
        if (loading) return <Loading/>

        return (
            <div>
                {chatResText && <div>{chatResText}</div>}
                <List
                    renderItem={(item, index) => (
                        <Card info={item}/>
                    )}
                    data={list}
                />
            </div>
        )
    }

    const onInflowChange = useCallback(async (text: string) => {
        if (!text) return

        try {
            setLoading(true)
            const chatRes: any = await runGetChatGPT(text)
            const {content, emotion, poiInfos, deals} = chatRes || {}

            if (!content) return
            const audioRes: any = await runGetAudio(content)
            motionWithAudio(emotion, audioRes)

            setChatResText(content)
            poiInfos && setPoiList(poiInfos)
            deals && setDealList(deals)
            setLoading(false)

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


            <div className="Feedback">
                {chatResText && <Feedback><Slot/></Feedback>}
            </div>
            <div className="Inflow">
                <Inflow onChange={onInflowChange}/>
            </div>
        </div>
    );
}

export default App;
