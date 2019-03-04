"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GpsUserDal_1 = __importDefault(require("../dal/GpsUserDal"));
const GpsUser_1 = require("../dal/entities/GpsUser");
const CoordUtils_1 = __importDefault(require("./CoordUtils"));
const Coord_1 = __importDefault(require("../dal/entities/Coord"));
var Feed = require('rss-to-json');
class YnetMivzak {
}
exports.YnetMivzak = YnetMivzak;
class wtf {
    constructor() {
        this.getNews = (callback) => {
            console.log('going to get news');
            Feed.load('http://www.ynet.co.il/Integration/StoryRss1854.xml', function (err, rss) {
                let news = [];
                rss.items.forEach(element => {
                    if (element.title.includes("צה\"ל")) {
                        let title = element.title;
                        if (title.includes("רצועה") || title.includes("עזה")) {
                            news.push(new GpsUser_1.GpsUser(title, new Coord_1.default("31.455193", "34.373269"), new Date()));
                        }
                    }
                });
                callback(null, news);
            });
        };
    }
}
exports.wtf = wtf;
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
            new wtf().getNews((err, news) => {
                if (err)
                    return;
                if (!news)
                    return;
                news.forEach(yedia => {
                    gpsUsers.forEach(user => {
                        if (CoordUtils_1.default.isInDistance(yedia.Coord, user.Coord, 1)) {
                            console.log("User:" + user.User + " is near " + yedia.User);
                        }
                    });
                });
            });
        });
    }
}
exports.default = PollNewsGps;
//# sourceMappingURL=pollNewsGps.js.map