import { getAgentInfo } from "../utils/getAgentInfo"
import { lastEvent } from "../utils/getLastEvent"
import {getSelector} from "../utils/getSelector"
import tracker from "../utils/tracker"
export function injectJsError(){
    // console.log(evtn)
    window.addEventListener("error",function(event){
        console.log(event)
        let baseLog = {
            kind:"stability",       //目标大类
            type:"error",           //小类
            errorType:"jsError",
            url:"",
            message:event.message,  //保存信息
            filename:event.filename,
            position:`${event.lineno}:${event.colno}`,
            stack:event.error.stack,
            selector:lastEvent? getSelector(lastEvent.path):""//DOM路径
        }
        tracker.send(baseLog);
    },true)


    window.addEventListener("unhandledrejection",(e)=>{
        console.log(e)
    },true)
 


}

