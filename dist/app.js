"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class echo {
    constructor() {
        this.app = express_1.default();
        // this.app = express();
    }
    ;
    start() {
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
        this.app.get("/", function (req, res) {
            res.send("HABATZORET KEN KEN HABATZORET\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
        });
    }
}
exports.echo = echo;
//# sourceMappingURL=app.js.map