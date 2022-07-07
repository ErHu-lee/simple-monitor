// import { Config, } from './config'
// import { queryString, serialize, warn } from './utils/tools'

import { PostData } from "../core/types";

export abstract class Sender{
    endpoint:string //发送的URL
    constructor(endpoint:string,){
        this.endpoint = endpoint;
    }
    abstract post(data:PostData):void;
}

export class BeaconSender extends Sender{
  constructor(endpoint:string){
    super(endpoint)
  }
  post(data:PostData){
    if( typeof window?.navigator?.sendBeacon !== 'function'){
      console.log("beacon is not support")
      return;
    }
    window.navigator.sendBeacon(this.endpoint, data.detail)
  }
}

export class XHRSender extends Sender{
  constructor(endpoint:string){
    super(endpoint)
  }
  post(data:PostData){
    if (typeof XMLHttpRequest !== 'function') {
      console.log("beacon is not support")
      return;
    }
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.endpoint, !0)
      xhr.setRequestHeader("Content-Type", "text/plain")
      xhr.send(JSON.stringify(data.detail))
    } catch (e) {
      
    }
  }
}
