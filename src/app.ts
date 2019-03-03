import express from 'express';
import mongoose from 'mongoose';
import GpsUserDal from './dal/GpsUserDal';
import Coord from "./dal/entities/Coord"
var config = require("../config.json")
import bodyParser from "body-parser";

import { getAddresFromCity } from './addressConverter/addressConverter'
import { GpsUser } from './dal/entities/GpsUser';

export class echo {
    app: any = express();

    constructor() {
        mongoose.connect(config.mongo, { useNewUrlParser: true });
        this.initSchema();
    }

    initSchema() {
    }

    start() {
        this.app.use(bodyParser.json());
        this.app.listen(3000, () => {
            let t = new getAddresFromCity();
            t.get('Tel-Aviv', (err: any, response: any, body: any) => {
                var bodyasjson = JSON.parse(body);
                let res = bodyasjson.results[0].geometry.location;
            });
        });
        this.app.get("/", function (req: any, res: any) {
            res.send("HABATZORET KEN KEN HABATZORET lol\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
        });

        this.app.post("/updateGpsUser", function (req: any, res: any) {
            new GpsUserDal().addGpsUser(new GpsUser(req.body.user, new Coord(req.body.coord.lat, req.body.coord.long)));
            res.sendStatus(200);
        });
    }
}
