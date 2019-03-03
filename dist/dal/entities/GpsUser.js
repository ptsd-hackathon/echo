"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.CoordSchema = new mongoose_1.default.Schema({
    Lat: String,
    Long: String
});
exports.GpsUserSchema = new mongoose_1.default.Schema({
    User: { type: String, required: true },
    Coord: { type: exports.CoordSchema, required: true }
});
class GpsUser {
    constructor(User, Coord) {
        this.User = User;
        this.Coord = Coord;
    }
}
exports.GpsUser = GpsUser;
const GpsUserModel = mongoose_1.default.model('GpsUsers', exports.GpsUserSchema);
exports.default = GpsUserModel;
//# sourceMappingURL=GpsUser.js.map