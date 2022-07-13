import { Plugin } from "../../core/type";
import html2canvas from "html2canvas";
import { Monitor } from "../../core/index";
import { Sender } from "./Sender";
import { WebMonitor } from "../core/index";
import { BlankScreenErrorLog, LOG_TYPE } from "../core/types";
type BlancScreenPluginConfig = {
    threshold?:number
}
export class BlancScreenPlugin implements Plugin{
    threshold:number
    monitorContext:Monitor
    sender:Sender | null
    currentScore:number
    lastBlankScreenTime: number | null
    constructor(monitor:WebMonitor,{threshold = 2000}:BlancScreenPluginConfig){
        this.monitorContext = monitor
        this.sender = monitor.sender;
        this.currentScore = 0;
        this.lastBlankScreenTime = null;
        this.threshold = threshold
    }
    private requestScore(node:HTMLElement | ChildNode | null , deep:number){
        if(node == null) return;
        if(this.currentScore > 3) return ;
        this.currentScore += 1/ Math.pow(2, deep);
        let childList = node.childNodes;
        childList.forEach(child=>{
            this.requestScore(child, deep + 1)
        })
    }
    private async capture(target:HTMLElement){
        let canvas = await html2canvas(target);
        return canvas.toDataURL('image/png', 1);  //1表示质量(无损压缩)
    }
    run(){
        
        window.addEventListener("load", ()=>{
            const targetNode:any= document.getElementById("app")
            const config = { attributes: true, childList: true, subtree: true };
            const callback = (mutationList:MutationRecord[], observer:MutationObserver) =>{
                mutationList.forEach(async (mutation:MutationRecord) =>{
                   if(this.currentScore >= 3) return;
                   this.requestScore(targetNode, 1)
                   if(this.currentScore < 3){
                        if(this.lastBlankScreenTime == null) this.lastBlankScreenTime = Date.now();
                        else {
                            if(Date.now() - this.lastBlankScreenTime > 2000){
                                let screen = await this.capture(targetNode);
                                let logger:BlankScreenErrorLog = {
                                    type:LOG_TYPE.ERROR,
                                    errorType:"Error_BlankScreen",
                                    image:screen
                                }
                                this.sender?.post(
                                    {
                                        detail:logger
                                    }
                                )
                            }
                        }
                   }
                })
            }
            const observer = new MutationObserver(callback)
            observer.observe(targetNode, config)
        })
    }
    unload(){

    }
}