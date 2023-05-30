# 小明的吃货女友

### 2d虚拟人物:
模型： [live2d](https://www.live2d.com/).（官方有很多[示例模型](https://www.live2d.com/en/download/sample-data/)，可以供大家学习使用。人物模型在public/Resources目录下）

渲染： [pixi.js](https://pixijs.com/).

为了让大家更好的理解我们何如使用官网的模型实现当前的功能，做了哪些改动和优化，团队同学整理了一篇文档：[live2d&chatgpt](https://km.sankuai.com/collabpage/1702966805)

### 文字转语音：
文字转语音可选择使用阿里云TTS或者美团TTS，如使用阿里云TTS：修改APP.tsx中的useGetAudio('aliyun')即可（默认为美团TTS），需要提前准备对应的APPKey和当日有效的Token，在configs/index.ts中配置。

#### 美团TTS

`MEITUAN_TTS_TOKEN`：美团TTS Token 24小时有效（需要在[美团TTS](https://speech.sankuai.com/tts)示例页面，点击合成语音，从请求中header中获取token）


#### 阿里云TTS
如果使用阿里云TTS，由于时间关系，前端直调阿里云TTS Restful接口，因此有跨域问题，需要启动浏览器非安全模式：1.完全关闭当前chrome，2.命令行打开浏览器：`open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/zhaojunming/WorkSpace/chrome`

`ALIYUN_TTS_APP_KEY`：阿里云TTS Key

`ALIYUN_TTS_TOKEN`：阿里云TTS Token 24小时有效 (需要在[阿里云TTS（需要开通试用）](https://ai.aliyun.com/nls/tts)的控制后台获取24小时有效Token)

### 其他：
由于时间紧张，语音识别当前没有使用阿里云ASR的websocket接口，使用的是浏览器的`speechRecognition`API。


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## config

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
