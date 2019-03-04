import { promises } from "fs";

var request = require('request');

var key = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
var contery = 'Israel';

export class getAddresFromCity{
  constructor(){}

     get(city:any,callback:any) : Promise<any>{
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${contery},+CA&key=${key}`
      let res;
      return request(url, callback);    
    } 
}