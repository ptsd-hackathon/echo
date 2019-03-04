"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GpsUserDal_1 = __importDefault(require("../dal/GpsUserDal"));
const addressConverter_1 = require("../addressConverter/addressConverter");
const Coord_1 = __importDefault(require("../dal/entities/Coord"));
const CoordUtils_1 = __importDefault(require("./CoordUtils"));
const axios_1 = __importDefault(require("axios"));
var request = require('request');
class PollNewsGps {
    constructor(interval) {
        this.gpsUserDal = new GpsUserDal_1.default();
        setInterval(this.poll, interval, new GpsUserDal_1.default());
    }
    poll(gpsUserDal) {
        gpsUserDal.getGpsUsers((err, gpsUsers) => {
            if (err)
                return;
            if (!gpsUsers)
                return;
            request("http://localhost:3000/newsJson", (err, response, body) => {
                if (err) {
                    console.log("error" + JSON.stringify(err));
                    return;
                }
                console.log("New run");
                let sentUsers = [];
                let myBody = JSON.parse(body);
                myBody.forEach(origin => {
                    let users = [];
                    let t = new addressConverter_1.getAddresFromCity();
                    t.get(origin, (err, response, body) => {
                        var bodyasjson = JSON.parse(body);
                        let res = bodyasjson.results[0].geometry.location;
                        // console.log(res);
                        let coordToCheck = new Coord_1.default(res.lat, res.lng);
                        gpsUsers.forEach(user => {
                            if (CoordUtils_1.default.isInDistance(coordToCheck, user.Coord, 0.1)) {
                                // console.log("User:" + user.User + " is near " + origin);
                                if (users.indexOf(user.User) === -1 && sentUsers.indexOf(user.User) === -1) {
                                    users.push(user.User);
                                    sentUsers.push(user.User);
                                }
                            }
                        });
                        if (users.length > 0) {
                            let str = JSON.stringify(users);
                            console.log(str);
                            // Send to yarin
                            axios_1.default.post("http://132.145.207.51:4000", { query: "mutation {triggerUsers(emails:" + str + ")}" }).then((res) => { }).catch((err) => { });
                        }
                    });
                });
            });
        });
    }
}
exports.default = PollNewsGps;
//# sourceMappingURL=PollNewsGps.js.map