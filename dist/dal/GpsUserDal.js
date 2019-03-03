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
        new GpsUser_1.default(GpsUser).save();
    }
}
exports.default = GpsUserDal;
//# sourceMappingURL=GpsUserDal.js.map