import { MonitorOption } from "./type"

export class Monitor{
    onMount:Function
    onError:Function
    onUnMount:Function

    constructor({onMount, onUnMount, onError}:MonitorOption){
       this.onError = onError,
       this.onMount = onMount,
       this.onUnMount = onUnMount
    }
}