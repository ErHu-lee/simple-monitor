export type PostData = {
    detail: any
}

export enum LOG_TYPE {
    ERROR = "error",
    PERFORMANCE = "performance",
    BEHAVE = "behave"
}
type errorType = "Error_JS" | "Error_Promise" | 'Error_Source'

export interface JSErrorLog{
    type: LOG_TYPE,
    errorType: errorType,
    message: string,
    position: string, //准备用sourceMap代替
    stack: any,
    selector: string, //DOM路径
}