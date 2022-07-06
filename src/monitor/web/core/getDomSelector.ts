export function getDomSelector(event:Event & any): string{
    let path = event.path;
    if(!Array.isArray(path)){
        path = [path]
    }
   
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