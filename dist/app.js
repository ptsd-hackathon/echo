"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const GpsUserDal_1 = __importDefault(require("./dal/GpsUserDal"));
var config = require("../config.json");
const body_parser_1 = __importDefault(require("body-parser"));
const addressConverter_1 = require("./addressConverter/addressConverter");
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
        this.app.post("/updateGpsUsers", function (req, res) {
            new GpsUserDal_1.default().addGpsUser(req.body);
            res.sendStatus(200);
        });
    }
}
exports.echo = echo;
//# sourceMappingURL=app.js.map