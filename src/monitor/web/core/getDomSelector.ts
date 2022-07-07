export function getDomSelector(event:Event & any): string{
    if(event == null) return "";
    let path = event.path;
    if(!Array.isArray(path)){
        path = [path]
    }
   
    let pureList =  path.reverse().filter((element:any)=>{
        return  element.tagName !== undefined  && element.tagName !== "BODY" && element.tagName !== "WINDOW"
    })
    return pureList.map((element:any)=> {
        if(element.id != null){
            return `${element.tagName.toLowerCase()}#${element.id}`;
        }else if(element.className != null){
            return `${element.tagName.toLowerCase()}.${element.className}`
        }else{
            return element.tagName.toLowerCase()
        }
    }).join(" ")
}