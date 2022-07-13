import { Monitor } from "../../core/index";
import { MonitorOption } from "../../core/type";
import { BlancScreenPlugin } from "../plugins/BlankScreenPlugin";
import { CurrentEventPlugin } from "../plugins/currentEventPlugin";
import { JSErrorMonitor } from "../plugins/JSErrorMonitor";
import { ResourceMonitorPlugin } from "../plugins/ResourceMonitorPlugin";
import { BeaconSender, Sender } from "../plugins/Sender";

type WebMonitorOption = MonitorOption & {
    event_track_endpoint?:string
}
interface Plugin {
    run:Function,
    unload:Function,
}
export class WebMonitor extends Monitor{
   

    _plugin_collective: Plugin[]
    sender:Sender | null
    currentEvent: Event | null
    
    currentEventPlugin:CurrentEventPlugin | null
    jsErrorPlugin: JSErrorMonitor | null
    resourceMonitorPlugin: ResourceMonitorPlugin | null
    blancScreenPlugin:BlancScreenPlugin | null
    eventTrackPlugin:Sender | null


    constructor(option:WebMonitorOption){
        super(option)
       
        this._plugin_collective = []
        this.sender = null,
        this.currentEvent = null,
        this.currentEventPlugin = null,
        this.jsErrorPlugin = null,
        this.resourceMonitorPlugin = null
        this.blancScreenPlugin = null
        this.eventTrackPlugin = null;
        this._LoadDefaultPlugin()
        this._run()
    }
    private _LoadDefaultPlugin(){
        let instance = this
        this.sender = new BeaconSender('www.baidu.com')
        this.currentEventPlugin = new CurrentEventPlugin()
        this.jsErrorPlugin = new JSErrorMonitor(this.sender, instance)
        this.resourceMonitorPlugin = new ResourceMonitorPlugin(this.sender, instance)
        this.blancScreenPlugin = new BlancScreenPlugin(instance,{})
        this.eventTrackPlugin = new BeaconSender("www.event.com")
       
        this._plugin_collective.push(this.currentEventPlugin)
        this._plugin_collective.push(this.jsErrorPlugin)
        this._plugin_collective.push(this.resourceMonitorPlugin)
        this._plugin_collective.push(this.blancScreenPlugin)
        this._plugin_collective.push(this.eventTrackPlugin)
    }
    private _run(){
        this._plugin_collective.forEach(plugin => {
            plugin.run()
        })
    }
}