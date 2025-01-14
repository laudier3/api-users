"use strict";
/*import { App } from "./app"
import "dotenv/config"

const port: any = process.env.PORT || 3002
const app = new App()

app.listen(port)
console.log("http://localhost:"+port)*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const router_1 = require("./router/router");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(router_1.router);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
