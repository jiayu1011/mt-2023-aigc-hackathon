import React, {useCallback, useMemo, useState} from 'react';
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

const App: React.FC = () => {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync: runGetChatGPT} = useGetChatGPT()
    const {runAsync: runGetAudio} = useGetAudio('aliyun')

    const [loading, setLoading] = useState<boolean>(false)
    const [chatResText, setChatResText] = useState<string>('')

    const [info, setInfo] = useState<any>()

    // Chrome不允许自动播放开场语音，因此用开发者按钮触发
    const TestBtn = (
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
                welcomeChat(
                    '亲爱的你来啦，人家想你好久了呢。' +
                    '今天想吃点什么呀～听说重庆有好多美食:D\n' +
                    '快来跟我互动吧！不过别惹我生气哦，本姑娘也不是好惹的😈'
                )
            }}
        >
            start
        </button>
    )

    const welcomeChat = useCallback(async (text: string) => {
        const audioRes: any = await runGetAudio(text)
        if (!audioRes) {
            console.error('get audio failed!')
            return
        }

        motionWithAudio('Happy', audioRes)

        setChatResText(text)
    }, [motionWithAudio, runGetAudio])

    const sendChat = useCallback(async (text: string) => {
        if (!text) return

        try {
            setLoading(true)

            const chatRes: any = await runGetChatGPT(text)
            if (!chatRes) {
                console.error('send chat failed!')
                return
            }
            let {content, emotion, poiInfos, deals} = chatRes

            const audioRes: any = await runGetAudio(content)
            if (!audioRes) {
                console.error('get audio failed!')
                return
            }

            motionWithAudio(emotion, audioRes)

            setChatResText(content)

            const poiList = poiInfos?.map((item: any) => ({
                headImg: item.poiHeadImg,
                name: item.poiName,
                address: item.address,
            })) || []
            const dealsList = deals?.map((item: any) => ({
                headImg: item.dealHeadImg,
                name: item.dealName,
                price: item.dealPrice,
            })) || []
            setInfo({
                type: poiList && poiList.length>0 ? 'poi':'deal',
                list: poiList && poiList.length>0 ? poiList:dealsList
            })

            setLoading(false)
        } catch (e: any) {
            throw new Error(e)
        }

    }, [motionWithAudio, runGetAudio, runGetChatGPT])

    const showFeedBack = useMemo(() => loading || chatResText, [loading, chatResText])

    return (
        <div className="App">
            <PixiManager success={async (pixi) => {
                initScene(pixi)
                initLive2D(pixi)
            }} render={() => <>
                <img src={`${process.env.PUBLIC_URL}/cat.gif`} alt='cat' style={{zIndex: 1, position: "absolute", bottom: '10vh', left: '13vw', width: 250}}/>
            </>}/>

            {
                showFeedBack && (
                    <div className="Feedback">
                        <Feedback isLoading={loading}>
                            {
                                loading ? <Loading/> : (
                                    <div>
                                        {chatResText && <div style={{fontSize: '18px'}}>{chatResText}</div>}
                                        {
                                            info && (
                                                <List
                                                renderItem={(item, index) => (
                                                    <Card key={`card-${index}`} info={item} type={info.type}/>
                                                )}
                                                data={info.list}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </Feedback>
                    </div>
                )
            }
            <div className="Inflow">
                <Inflow onChange={sendChat}/>
            </div>
            {TestBtn}
        </div>
    );
}

export default App;
