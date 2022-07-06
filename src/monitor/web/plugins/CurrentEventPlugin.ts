export class CurrentEventPlugin{
    currentEvent:any
    constructor(){
        this.currentEvent = null;
    }
    run(){
        ['click','touchstart','mousedown','keydown','mouseover'].forEach(eventType=>{
            document.addEventListener(eventType,(event)=>{
                this.currentEvent = event
            },{
                capture:true, //捕获阶段
                passive:true, //手动声明不阻止默认事件，可以在事件回调还没结束， 页面就可以响应了
            })
        })
    }
    unload(){
        //卸载阶段
    }

}