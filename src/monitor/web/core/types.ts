export type PostData = {
    detail: any
}

export enum LOG_TYPE {
    ERROR = "error",
    PERFORMANCE = "performance",
    BEHAVE = "behave"
}
type errorType = "Error_JS" | "Error_Promise" | 'Error_Source'| "Error_BlankScreen"

export interface JSErrorLog{
    type: LOG_TYPE,
    errorType: errorType,
    message: string,
    position?: string, //准备用sourceMap代替
    stack: any,
    selector: string, //DOM路径
}

export interface ResourceLoadErrorLog{
    type:LOG_TYPE,
    errorType: errorType,
    url:string,
    resourceType: "JS" | "CSS" | "OTHER"
}

export interface BlankScreenErrorLog{
    type:LOG_TYPE,
    errorType: errorType,
    image:string,
}


