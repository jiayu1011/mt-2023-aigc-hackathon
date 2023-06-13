import * as PIXI from "pixi.js";

export const useScene = () => {
    const init = (pixi:PIXI.Application) => {
        if (!pixi) return
       
       const loader =  new PIXI.Loader()
       loader.add(`${process.env.PUBLIC_URL}/bg2.png`)
        .load(()=>{
            const bg = new PIXI.Sprite(loader.resources[`${process.env.PUBLIC_URL}/bg2.png`].texture);
            bg.height=window.innerHeight
            pixi.stage.addChildAt(bg,0);
        });
       
    }
   
    return {
        init
    }
}