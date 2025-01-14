"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const router_1 = require("./router/router");
const port = process.env.PORT || 3003;
//console.log("http://localhost:" + port)
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(router_1.router);
        this.app.use((0, express_session_1.default)({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }));
    }
    listen(port) {
        this.app.listen(port, () => {
            return "http://localhost:" + port;
        });
    }
}
exports.App = App;
