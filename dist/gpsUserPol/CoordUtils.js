"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CoordUtils {
    static isInDistance(CoordA, CoordB, distance) {
        let dist = Math.sqrt(Math.pow(parseFloat(CoordA.Lat) - parseFloat(CoordB.Lat), 2) + Math.pow(parseFloat(CoordA.Long) - parseFloat(CoordB.Long), 2));
        // console.log(JSON.stringify(CoordA) + " " + JSON.stringify(CoordB) + " " + dist);
        if (dist < distance) {
            return true;
        }
        return false;
    }
}
exports.default = CoordUtils;
//# sourceMappingURL=CoordUtils.js.map