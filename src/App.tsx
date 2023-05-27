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

const App: React.FC = () => {

    const {init: initScene} = useScene()
    const {init: initLive2D, motionWithAudio} = useLive2DModel()
    const {runAsync: runGetChatGPT} = useGetChatGPT()
    const {runAsync: runGetAudio} = useGetAudio()

    const [loading, setLoading] = useState<boolean>(false)
    const [chatResText, setChatResText] = useState<string>('')

    const [info, setInfo] = useState<any>()

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
                sendChat('你好')
            }}
        >
            start
        </button>
    )

    const Slot = () => {
        if (loading) return <Loading/>

        return (
            <div>
                {chatResText && <div style={{fontSize: '18px'}}>{chatResText}</div>}
                <List
                    renderItem={(item, index) => (
                        <Card key={`card-${index}`} info={item} type={info.type}/>
                    )}
                    data={info.list}
                />
            </div>
        )
    }

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

            // poiInfos = [
            //     {
            //         "id": 168874900,
            //         "address": "渝中区民族路92号（七天连锁酒店旁）",
            //         "poiHeadImg": "https://img.meituan.net/msmerchant/fb3aba1c40ecf8eda8f7399a80a504f924306.jpg@380w_214h_1e_1c",
            //         "poiName": "洞洞隐火锅·地下防空洞店",
            //         "deals": [
            //             {
            //                 "dealId": "d844257862",
            //                 "dealName": "甜品2选1，包间免费",
            //                 "dealHeadImg": "https://p0.meituan.net/208.126/deal/baaa9d570e6622b1318c31210c974f4a318324.jpg@100w_100h_1e_1c",
            //                 "dealPrice": 10
            //             },
            //             {
            //                 "dealId": "d666834234",
            //                 "dealName": "必点双人餐",
            //                 "dealHeadImg": "https://p0.meituan.net/scpdeal/e405b21859c43148d7093aaf2eee69ee128823.jpg@428w_320h_1e_1c",
            //                 "dealPrice": 165
            //             },
            //             {
            //                 "dealId": "d666824360",
            //                 "dealName": "欢天喜地6人餐",
            //                 "dealHeadImg": "https://p0.meituan.net/scpdeal/4319b9e92d5c3998035d66d9e5d86aed169319.jpg@428w_320h_1e_1c",
            //                 "dealPrice": 286
            //             },
            //             {
            //                 "dealId": "d666839161",
            //                 "dealName": "隐火锅四人餐",
            //                 "dealHeadImg": "https://p0.meituan.net/scpdeal/4319b9e92d5c3998035d66d9e5d86aed169319.jpg@428w_320h_1e_1c",
            //                 "dealPrice": 242
            //             },
            //             {
            //                 "dealId": "d55522431",
            //                 "dealName": "50元代金券",
            //                 "dealHeadImg": "https://p0.meituan.net/deal/ccf210ce2e05751f16246523f5fbcc8c12128.jpg@428w_320h_1e_1c",
            //                 "dealPrice": 48
            //             }
            //         ],
            //         "poiNamePy": "洞洞隐火锅·地下防空洞店"
            //     },
            //     {
            //         "id": 178056181,
            //         "address": "沙坪坝区小龙坎新街49号王府井百货5层",
            //         "poiHeadImg": "https://p0.meituan.net/biztone/519707627_1651498474873.jpeg@380w_214h_1e_1c",
            //         "poiName": "渝大狮毛肚老火锅（沙坪坝王府井店）",
            //         "deals": [
            //             {
            //                 "dealId": "d672525587",
            //                 "dealName": "品质双人餐，提供免费WiFi",
            //                 "dealHeadImg": "https://p1.meituan.net/208.126/deal/3cadca34d1773b522f4367be609d6ff0221417.jpg@100w_100h_1e_1c",
            //                 "dealPrice": 142
            //             },
            //             {
            //                 "dealId": "d704297794",
            //                 "dealName": "甜品饮料2选1，包间免费",
            //                 "dealHeadImg": "https://p0.meituan.net/208.126/deal/b59c8859cf3c0426058672b0c370a68b163674.jpg@100w_100h_1e_1c",
            //                 "dealPrice": 10
            //             },
            //             {
            //                 "dealId": "d723712507",
            //                 "dealName": "秘制牛肉贡丸1份，包间免费",
            //                 "dealHeadImg": "https://p0.meituan.net/208.126/deal/b70e2f3c24f1ff87a97c563b038bceb7138367.jpg@100w_100h_1e_1c",
            //                 "dealPrice": 16
            //             },
            //             {
            //                 "dealId": "d54544729",
            //                 "dealName": "聚会4人餐，提供免费WiFi",
            //                 "dealHeadImg": "https://p1.meituan.net/208.126/deal/3cadca34d1773b522f4367be609d6ff0221417.jpg@100w_100h_1e_1c",
            //                 "dealPrice": 233
            //             }
            //         ],
            //         "poiNamePy": "渝大狮毛肚老火锅（沙坪坝王府井店）"
            //     }
            // ]

            deals = [
                {
                    "dealId": "d850273039",
                    "dealName": "红糖冰汤圆1份",
                    "dealHeadImg": "https://p1.meituan.net/deal/2176c1071ece72f252c3a80f670dcbd7325618.jpg@428w_320h_1e_1c",
                    "dealPrice": 2
                },
                {
                    "dealId": "d850240794",
                    "dealName": "手作饮品2选1",
                    "dealHeadImg": "https://p1.meituan.net/deal/46556c651fab4df4d58351e5217ac19b263686.jpg@428w_320h_1e_1c",
                    "dealPrice": 3.9
                },
                {
                    "dealId": "d850086613",
                    "dealName": "牧马人❤Five拼盘",
                    "dealHeadImg": "https://p0.meituan.net/deal/7d20931f27cf9aa0715f30be53cd7485131592.jpg@428w_320h_1e_1c",
                    "dealPrice": 58
                },
                {
                    "dealId": "d850240693",
                    "dealName": "50元代金券",
                    "dealHeadImg": "https://p0.meituan.net/deal/39045af3c69ba5fe963051115b2090bb336723.jpg@428w_320h_1e_1c",
                    "dealPrice": 20
                }
            ]

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
                <img src="/cat.gif" style={{zIndex: 1, position: "absolute", bottom: '10vh', left: '13vw', width: 250}}/>
            </>}/>

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
