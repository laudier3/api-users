"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLogin = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const prismaClient_1 = require("../../prisma_Client_Orm/prismaClient");
class ControllerLogin {
    handle(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            console.log(email, password);
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: {
                    email
                }
            });
            //const message = { errr: "E-mail ou senha invalida" }
            if (!user) {
                return response.status(404).json({ msg: "E-mail ou senha invalid!" });
            }
            const verifyPass = yield bcrypt.compare(password, user.password);
            if (!verifyPass) {
                return response.status(404).json({ msg: "E-mail ou senha invalido!" });
            }
            const token = jwt.sign({ id: user.id }, (_a = process.env.APP_KEY) !== null && _a !== void 0 ? _a : '', {
                expiresIn: '8h'
            });
            const { password: _ } = user, userLogin = __rest(user, ["password"]);
            const msg = { msg: "O token é valido por até 8 horas!" };
            try {
                return response.status(202).json({ msg: "Login efetuado com sucesso...",
                    user: userLogin,
                    token: token,
                });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ControllerLogin = ControllerLogin;
