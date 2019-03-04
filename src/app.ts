import express from 'express';
import mongoose from 'mongoose';
import GpsUserDal from './dal/GpsUserDal';
import Coord from "./dal/entities/Coord"
var config = require("../config.json")
import bodyParser from "body-parser";
var news = require("../controller/news/news");
var translator = require("../controller/translate/data-translate");
const HOST_TRANSLATE = require('../data-const/post-consts').HOST_TRANSLATE;
const NEWS_CONSTS = require('../data-const/news-consts');
const nlp = require('../controller/nlp/nlp');

import { getAddresFromCity } from './addressConverter/addressConverter'
import { GpsUser } from './dal/entities/GpsUser';
import EventUser from './dal/entities/EventUser';
import PollNewsGps from './gpsUserPol/PollNewsGps';

export class echo {
    app: any = express();

    constructor() {
        mongoose.connect(config.mongo, { useNewUrlParser: true });
        this.initSchema();
        console.log("hello");
        new PollNewsGps(30000);
        console.log("fsdsado");
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
            new GpsUserDal().addGpsUser(new GpsUser(req.body.user, new Coord(req.body.coord.lat, req.body.coord.long), new Date()));
            res.sendStatus(200);
        });

        this.app.post("/events", function (req: any, res: any) {
            var eventUser = new EventUser(req.body.user, req.body.eventId, req.body.date);
            console.log("new event " + JSON.stringify(eventUser));
            res.sendStatus(200);
        });

        this.app.delete("/events", function (req: any, res: any) {
            res.send("Got delete request of id: " + req.body.eventId);
        });

        this.app.get("/newsJson", function (req: any, res: any) {
            var textToTranslate, translatedText;
            news.EveryArticle(NEWS_CONSTS.fromDate, NEWS_CONSTS.toDate, NEWS_CONSTS.language, NEWS_CONSTS.sources, NEWS_CONSTS.sortBy, next => {
                textToTranslate = news.ReturnedContent(next);
                // console.log(textToTranslate);
                translator.TranslateHeToEn(textToTranslate, (translatorErr: any, translatorRes: any, translatorBody: any) => {
                    translatedText = (JSON.parse(translatorBody).text[0]);
                    // console.log(translatedText)
                    nlp.GetLocationFromMetadata(translatedText, value => {
                        let mashu = []
                        for (let i = 0; i < value.response.entities.length; i++) {
                            if (value.response.entities[i].type && value.response.entities[i].type.indexOf("Place") > -1) {
                                mashu.push(value.response.entities[i].entityId);
                            }
                           
                        }
                        // console.log(mashu);
                        res.send(mashu);
                    });
                });
            }
            );
        });
    }
}
