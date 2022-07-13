import { WebMonitor } from "../../core";

export class LongTaskPlugin{
    instance:WebMonitor
    observer:PerformanceObserver | null
    constructor(instance:WebMonitor){
        this.instance = instance
        this.observer = null
    }
    run(){
        let callback = (entryList:PerformanceObserverEntryList) => {
            entryList.getEntries().forEach((entry) => {
              if (entry.duration > 100) {
                let lastEvent = this.instance.currentEventPlugin?.currentEvent
                let logger = {
                    kind: "experience",
                    type: "longTask",
                    eventType: lastEvent.type,
                    startTime: entry.startTime, // 开始时间
                    duration: entry.duration, // 持续时间
                }
                this.instance.sender?.post({detail:logger})
              }
            });
          }
        this.observer = new PerformanceObserver(callback)
        this.observer.observe({ entryTypes: ["longtask"] });
    }
    unload(){
        this.observer?.disconnect()
    }

}
