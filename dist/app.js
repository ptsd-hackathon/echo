"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const GpsUserDal_1 = __importDefault(require("./dal/GpsUserDal"));
const Coord_1 = __importDefault(require("./dal/entities/Coord"));
var config = require("../config.json");
const body_parser_1 = __importDefault(require("body-parser"));
var news = require("../controller/news/news");
var translator = require("../controller/translate/data-translate");
const HOST_TRANSLATE = require('../data-const/post-consts').HOST_TRANSLATE;
const NEWS_CONSTS = require('../data-const/news-consts');
const nlp = require('../controller/nlp/nlp');
const addressConverter_1 = require("./addressConverter/addressConverter");
const GpsUser_1 = require("./dal/entities/GpsUser");
const EventUser_1 = __importDefault(require("./dal/entities/EventUser"));
class echo {
    constructor() {
        this.app = express_1.default();
        mongoose_1.default.connect(config.mongo, { useNewUrlParser: true });
        this.initSchema();
    }
    initSchema() {
    }
    start() {
        this.app.use(body_parser_1.default.json());
        this.app.listen(3000, () => {
            let t = new addressConverter_1.getAddresFromCity();
            t.get('Tel-Aviv', (err, response, body) => {
                var bodyasjson = JSON.parse(body);
                let res = bodyasjson.results[0].geometry.location;
            });
        });
        this.app.get("/", function (req, res) {
            res.send("HABATZORET KEN KEN HABATZORET lol\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
        });
        this.app.post("/updateGpsUser", function (req, res) {
            new GpsUserDal_1.default().addGpsUser(new GpsUser_1.GpsUser(req.body.user, new Coord_1.default(req.body.coord.lat, req.body.coord.long), new Date()));
            res.sendStatus(200);
        });
        this.app.post("/events", function (req, res) {
            var eventUser = new EventUser_1.default(req.body.user, req.body.eventId, req.body.date);
            console.log("new event " + JSON.stringify(eventUser));
            res.sendStatus(200);
        });
        this.app.delete("/events", function (req, res) {
            res.send("Got delete request of id: " + req.body.eventId);
        });
        this.app.get("/newsJson", function (req, res) {
            var textToTranslate, translatedText;
            news.EveryArticle(NEWS_CONSTS.fromDate, NEWS_CONSTS.toDate, NEWS_CONSTS.language, NEWS_CONSTS.sources, NEWS_CONSTS.sortBy, next => {
                textToTranslate = news.ReturnedContent(next);
                console.log(textToTranslate);
                translator.TranslateHeToEn(textToTranslate, (translatorErr, translatorRes, translatorBody) => {
                    translatedText = (JSON.parse(translatorBody).text[0]);
                    console.log(translatedText);
                    nlp.GetLocationFromMetadata(translatedText, value => {
                        let mashu = [];
                        for (let i = 0; i < value.response.entities.length; i++) {
                            if (value.response.entities[i].type && value.response.entities[i].type.indexOf("Place") > -1) {
                                mashu.push(value.response.entities[i].entityId);
                            }
                        }
                        console.log(mashu);
                        res.send(mashu);
                    });
                });
            });
        });
    }
}
exports.echo = echo;
//# sourceMappingURL=app.js.map