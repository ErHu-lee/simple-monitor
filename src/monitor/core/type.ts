type MonitorOption = {
    onMount:Function
    onError:Function
    onUnMount:Function
    coreConfigInitPlugin:BaseConfigInitPlugin
}
type BaseConfigInitPlugin = {
    init:Function
} 