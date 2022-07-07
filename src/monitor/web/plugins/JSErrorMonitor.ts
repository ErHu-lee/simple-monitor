import { Monitor } from "../../core/index";
import { WebMonitor } from "../core/index";
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
        window.addEventListener("error",(event:ErrorEvent)=>{
            let logger:JSErrorLog = {
                type:LOG_TYPE.ERROR,
                errorType:"Error_JS",
                message:event.message,
                position:`${event.lineno}:${event.colno}`, //准备用sourceMap代替
                stack: event.error?.stack,
                selector: getDomSelector(this.monitor.currentEventPlugin?.currentEvent)
            }
            this.sender.post({
                detail: logger
            })
        },true)
    
    
        window.addEventListener("unhandledrejection",(event:PromiseRejectionEvent) => {
            let logger:JSErrorLog = {
                type:LOG_TYPE.ERROR,
                errorType:"Error_Promise",
                message: event.reason.message,
                stack: event.reason.stack,
                selector: getDomSelector(this.monitor.currentEventPlugin?.currentEvent)
            }
            this.sender.post({
                detail: logger
            })
        },true)

    }
    unload(){}
}
