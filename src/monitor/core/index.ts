export class Monitor{
    onMount:Function
    onError:Function
    onUnMount:Function

    coreConfigInitPlugin:BaseConfigInitPlugin
    constructor({onMount, onUnMount, onError, coreConfigInitPlugin}:MonitorOption){
       this.onError = onError,
       this.onMount = onMount,
       this.onUnMount = onUnMount

       coreConfigInitPlugin.init()
    }
}