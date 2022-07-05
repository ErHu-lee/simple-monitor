class SendTracker{
    constructor(){
        this.url = ""; // 上报的路径
        this.xhr = new XMLHttpRequest;
    }
    send(data){
        console.log(data)
    }
}

let instance = new SendTracker();
export default instance;