import { Plugin } from "../../core/type";
import { WebMonitor } from "../core/index";
import { LOG_TYPE, ResourceLoadErrorLog } from "../core/types";
import { Sender } from "./Sender";

export class ResourceMonitorPlugin implements Plugin{
    sender:Sender
    monitor:WebMonitor
    constructor(sender:Sender, monitor:WebMonitor){
        this.sender = sender,
        this.monitor = monitor
    }
    run(){
        // 当浏览器不支持 window.performance.getEntries 的时候，用下边这种方式
        window.addEventListener('error',(e:ErrorEvent) => {
            let target: any = e.target
            let typeName = target?.typeName;
            if(target == null || typeName == null) return;
            let sourceUrl = "";
            let sourceType :"OTHER" | "JS" | "CSS" = "OTHER";
            if (typeName === "link") {
                sourceUrl = target.href;
                sourceType = "CSS";
            } else if (typeName === "script") {
                sourceUrl = target.src;
                sourceType = "JS";
            }

            let logger: ResourceLoadErrorLog= {
                type:LOG_TYPE.ERROR,
                errorType:"Error_Source",
                url:sourceUrl,
                resourceType: sourceType,
            }
            this.sender.post({
                detail: logger
            })
        }, true);
    }
    unload(){

    }
    
}