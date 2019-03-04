"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CoordUtils {
    static isInDistance(CoordA, CoordB, distance) {
        if (Math.abs(parseFloat(CoordA.Lat) - parseFloat(CoordB.Lat)) <= distance &&
            Math.abs(parseFloat(CoordA.Long) - parseFloat(CoordB.Long)) < distance) {
            return true;
        }
        return false;
    }
}
exports.default = CoordUtils;
//# sourceMappingURL=CoordUtils.js.map