export type MonitorOption = {
    onMount:Function
    onError:Function
    onUnMount:Function
    coreConfigInitPlugin:BaseConfigInitPlugin
}
type BaseConfigInitPlugin = {
    init:Function
} 

export interface Plugin {
    run:Function
    unload:Function
}