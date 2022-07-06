import { Monitor } from "../../core";
import { WebMonitor } from "../core";
import { getDomSelector } from "../core/getDomSelector";
import { JSErrorLog, LOG_TYPE } from "../core/types";
import { Sender } from "./Sender";

export class JSErrorMonitor{
    sender:Sender
    monitor:WebMonitor
    constructor(sender:Sender, monitor:WebMonitor){
        this.sender = sender,
        this.monitor = monitor
    }
    run(){
        let monitor = this.monitor;
        window.addEventListener("error",(event:ErrorEvent)=>{
            let logger:JSErrorLog = {
                type:LOG_TYPE.ERROR,
                errorType:"Error_JS",
                message:event.message,
                position:`${event.lineno}:${event.colno}`, //准备用sourceMap代替
                stack: event.error?.stack,
                selector: getDomSelector(monitor.currentEvent)
            }
            this.sender.post({
                detail: logger
            })
        },true)
    
    
        window.addEventListener("unhandledrejection",(e)=>{
       
        },true)

    }
    unload(){}
}
