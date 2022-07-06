import { Monitor } from "../../core";
import { CurrentEventPlugin } from "../plugins/currentEventPlugin";
import { JSErrorMonitor } from "../plugins/JSErrorMonitor";
import { BeaconSender, Sender } from "../plugins/Sender";

type WebMonitorOption = MonitorOption & {

}
interface Plugin {
    run:Function,
    unload:Function,
}
export class WebMonitor extends Monitor{
    _plugin_collective: Plugin[]
    sender:Sender
    currentEvent: Event
    
    currentEventPlugin:CurrentEventPlugin
    jsErrorPlugin: JSErrorMonitor

    constructor(option:WebMonitorOption){
        super(option)
        this._plugin_collective = []
        this._LoadDefaultPlugin()
        this._run()
    }
    private _LoadDefaultPlugin(){
        let instance = this
        this.sender = new BeaconSender('www.baidu.com')
        this.currentEventPlugin = new CurrentEventPlugin()
        this.jsErrorPlugin = new JSErrorMonitor(this.sender, instance)

        this._plugin_collective.push(this.currentEventPlugin)
        this._plugin_collective.push(this.jsErrorPlugin)
    }
    private _run(){
        this._plugin_collective.forEach(plugin => {
            plugin.run()
        })
    }
}