"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var key = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
var contery = 'Israel';
class getAddresFromCity {
    constructor() { }
    get(city, callback) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${contery},+CA&key=${key}`;
        let res;
        return request(url, callback);
    }
}
exports.getAddresFromCity = getAddresFromCity;
//# sourceMappingURL=addressConverter.js.map