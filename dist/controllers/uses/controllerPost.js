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
exports.CreateProducts = void 0;
const prismaClient_1 = require("../../prisma_Client_Orm/prismaClient");
const bcrypt = __importStar(require("bcrypt"));
class CreateProducts {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, age, email, phone, access, image, password } = req.body;
            if (typeof password === 'number' ||
                typeof name === 'number' ||
                typeof email === 'number' ||
                typeof phone === 'number' ||
                typeof age === 'number' ||
                typeof image === 'number' ||
                typeof access === 'number') {
                return ({
                    msg: `Algum campo estar em número! Lembre-se que, todos os campos tem estar em string ok!`
                });
            }
            if (typeof phone === 'undefined' ||
                typeof age === 'undefined' ||
                typeof password === 'undefined' ||
                typeof name === 'undefined' ||
                typeof access === 'undefined' ||
                typeof image === 'undefined' ||
                typeof email === 'undefined') {
                return ({
                    msg: `Algum campo esta faltando! Verifique novamente!`
                });
            }
            const userExists = yield prismaClient_1.prisma.user.findUnique({
                where: {
                    email
                }
            });
            if ((userExists === null || userExists === void 0 ? void 0 : userExists.email) == email) {
                return res.status(404).json({
                    msg: `O E-mail ${email} ja esta cadastrado, tente outro!`
                });
            }
            const cryptPass = yield bcrypt.hash(password, 8);
            const createProducts = yield prismaClient_1.prisma.user.create({
                data: {
                    name,
                    age,
                    email,
                    phone,
                    access,
                    image,
                    password: cryptPass
                }
            });
            console.log(createProducts.name);
            return res.status(201).json({ msg: "Usuario cadastrado com sucesso!", createProducts });
        });
    }
}
exports.CreateProducts = CreateProducts;
