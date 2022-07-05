export let LOAD_TIME = 0;
export function load_time_hook(){
    window.addEventListener("load",(e)=>{
        console.log(e.timeStamp)
        LOAD_TIME = Date.now()
    })
}
