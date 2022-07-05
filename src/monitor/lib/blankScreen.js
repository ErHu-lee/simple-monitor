// const targetNode = document.getElementsByTagName("HTML");
// const config = { attributes: true, childList: true, subtree: true };
// const callback = function(mutationsList, observer) {
//     // Use traditional 'for loops' for IE 11
//     for(let mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             console.log('A child node has been added or removed.');
//         }
//         else if (mutation.type === 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.');
//         }
//     }
// };

import { LOAD_TIME } from "../utils/timer";

// // 创建一个观察器实例并传入回调函数
// const observer = new MutationObserver(callback);

// // 以上述配置开始观察目标节点
// observer.observe(targetNode, config);

// // 之后，可停止观察
// observer.disconnect();
import html2canvas from "html2canvas";
function capture(){
    return html2canvas(document.querySelector("#app")).then(canvas => {
        let img = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        return img
    });
}
function send(){
    capture().then(img=>{
        let logger = {
            kind: 'stability',
            type: 'blank',
            screenCapture: img
        }
        console.log(logger)
    })

}
export function injectBlankScreen(){

    window.addEventListener("load",()=>{
        let score = 0;
        let lastTime = null;

        let getScore_BFS = function(node, deep){
            console.log(node, deep)
            if(node == null) return;
            if(score >= 2) return;
            let childList = node.childNodes;
            if(childList == null) return;
    
            score += 1/ Math.pow(2,deep)
            childList.forEach(node=>{
                if(score >= 2) return;
                getScore_BFS(node, deep + 1)
            })
        }

        
        const targetNode = document.getElementById("app")
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    send();
                    getScore_BFS(targetNode, 1)
                    if(score < 2){
                        // 白屏了
                        if(lastTime != null){
                            lastTime = Date.now();
                        }else{
                            if(Date.now() - lastTime > 2000){
                                // 认为白屏严重 -> 上报
                                send()
                                capture()
                            }
                            lastTime = Date.now()
                        }

                        score = 0
                        

                    }
                }
                else if (mutation.type === 'attributes') {
                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        };
    
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback);
    
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
    
        // 之后，可停止观察
        // observer.disconnect();
    })


}