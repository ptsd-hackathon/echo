"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GpsUser_1 = __importDefault(require("./entities/GpsUser"));
class GpsUserDal {
    constructor() {
    }
    addGpsUser(GpsUser) {
        GpsUser_1.default.findOne({ User: GpsUser.User }, (err, found) => {
            if (err) {
                console.log("nosuchuser");
                return;
            }
            if (!found) {
                new GpsUser_1.default(GpsUser).save();
                console.log("new user registerd");
                return;
            }
            found.Coord = GpsUser.Coord;
            found.save();
            console.log(found);
        });
    }
}
exports.default = GpsUserDal;
//# sourceMappingURL=GpsUserDal.js.map