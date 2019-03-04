import GpsUserDal from "../dal/GpsUserDal";
import { GpsUser } from "../dal/entities/GpsUser";
import { getAddresFromCity } from "../addressConverter/addressConverter";
import Coord from "../dal/entities/Coord";
import CoordUtils from "./CoordUtils";
import { json } from "body-parser";
import axios from "axios";
var request = require('request');


export default class PollNewsGps {

    gpsUserDal = new GpsUserDal();

    constructor(interval: number) {
        setInterval(this.poll, interval, new GpsUserDal());

    }

    poll(gpsUserDal: GpsUserDal) {
        gpsUserDal.getGpsUsers((err: any, gpsUsers: GpsUser[]) => {
            if (err) return;
            if (!gpsUsers) return;
            request("http://localhost:3000/newsJson", (err: any, response: any, body: any) => {
                if (err) { console.log("error" + JSON.stringify(err)); return; }
                console.log("New run")
                let sentUsers = [];
                let myBody = JSON.parse(body);
                myBody.forEach(origin => {
                    let users = [];
                    let t = new getAddresFromCity();
                    t.get(origin, (err: any, response: any, body: any) => {
                        var bodyasjson = JSON.parse(body);
                        let res = bodyasjson.results[0].geometry.location;
                        // console.log(res);
                        let coordToCheck = new Coord(res.lat, res.lng);
                        gpsUsers.forEach(user => {
                            if (CoordUtils.isInDistance(coordToCheck, user.Coord, 0.1)) {
                                // console.log("User:" + user.User + " is near " + origin);

                                if (users.indexOf(user.User) === -1 && sentUsers.indexOf(user.User) === -1) {
                                    users.push(user.User);
                                    sentUsers.push(user.User);
                                }
                            }
                        })
                        if (users.length > 0) {
                            let str = JSON.stringify(users);
                            console.log(str);

                            // Send to yarin
                            axios.post("http://132.145.207.51:4000",
                                { query: "mutation {triggerUsers(emails:" + str + ")}" }
                            ).then((res)=>{}).catch((err)=>{});
                        }
                    });
                });

            });
        });
    }


}