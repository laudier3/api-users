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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const prismaClient_1 = require("../../prisma_Client_Orm/prismaClient");
class ControllerAuth {
    handle(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //const { password } = request.body;
            const { authorization } = request.headers;
            if (!authorization) {
                return response.status(401).json({ message: `Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aquii novamente!` });
                //return console.log("Token invalido, você não esta autorizado")
            }
            try {
                const token = authorization.split(' ')[1];
                //const token = request.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
                if (!token) {
                    throw new Error('Authentication failed!');
                }
                const { id } = jwt.verify(token, (_a = process.env.APP_KEY) !== null && _a !== void 0 ? _a : '');
                //const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
                const user = yield prismaClient_1.prisma.user.findFirst({
                    where: {
                        id
                    }
                });
                //return response.status(201).json({ message: `Usuario autorizado, acesso liberado`, user})
                next();
            }
            catch (err) {
                response.status(401).send({ error: 'Token invalido!', err });
            }
            next();
        });
    }
}
exports.ControllerAuth = ControllerAuth;
