/*
    path: 一个路径
*/
export function getSelector(path){
    if(!Array.isArray(path)){
        path = [path]
    }
    if(Array.isArray(path)){
        let pureList =  path.reverse().filter(element=>{
            return  element.tagName !== undefined  && element.tagName !== "BODY" && element.tagName !== "WINDOW"
        })
        return pureList.map(element=> {
            if(element.id != null){
                return `${element.tagName.toLowerCase()}#${element.id}`;
            }else if(element.className != null){
                return `${element.tagName.toLowerCase()}.${element.className}`
            }else{
                return element.tagName.toLowerCase()
            }
        }).join(" ")
    }
}