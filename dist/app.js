"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Coord_1 = __importDefault(require("./dal/entities/Coord"));
const GpsUser_1 = require("./dal/entities/GpsUser");
const GpsUserDal_1 = __importDefault(require("./dal/GpsUserDal"));
var config = require("../config.json");
const body_parser_1 = __importDefault(require("body-parser"));
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
            console.log("Server running on port 3000");
        });
        this.app.get("/", function (req, res) {
            new GpsUserDal_1.default().addGpsUser(new GpsUser_1.GpsUser("ArikTheMan", new Coord_1.default("123", "456")));
            res.send("HABATZORET KEN KEN HABATZORET lol\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
        });
        this.app.post("/updateGpsUpser", function (req, res) {
            new GpsUserDal_1.default().addGpsUser(req.body);
            res.sendStatus(200);
        });
    }
}
exports.echo = echo;
//# sourceMappingURL=app.js.map