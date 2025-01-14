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
exports.PutProducts = void 0;
const prismaClient_1 = require("../../prisma_Client_Orm/prismaClient");
const bcrypt = __importStar(require("bcrypt"));
class PutProducts {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, phone, password, name, age, access, image } = request.body;
            const cryptPass = yield bcrypt.hash(password, 8);
            if (typeof id === 'number' ||
                typeof password === 'number' ||
                typeof name === 'number' ||
                typeof email === 'number' ||
                typeof age === 'number' ||
                typeof access === 'number' ||
                typeof phone === 'number' ||
                typeof image === 'number') {
                return response.status(500).json({
                    msg: `Algum campo esta faltando ou estão em números! Lembre-se que, todos os campos tem que estar em string ok!  Ou você não passo o id correto.`
                });
            }
            if (typeof id === 'undefined' ||
                typeof name === 'undefined' ||
                typeof email === 'undefined' ||
                typeof age === 'undefined' ||
                typeof password === 'undefined' ||
                typeof name === 'undefined' ||
                typeof access === 'undefined' ||
                typeof phone === 'undefined' ||
                typeof image === 'undefined') {
                return response.status(500).json({
                    msg: `Algum campo esta faltando! E lembre-se que todos os campos tem que ser string ok!`
                });
            }
            const user = yield prismaClient_1.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                    age,
                    access,
                    phone,
                    image,
                    email,
                    password: cryptPass
                }
            });
            try {
                return response.status(201).json(user);
            }
            catch (error) {
                throw new Error(`Você não pode usar esse email: ${email}! porque ele ja esta sendo usado por outro usuario, se for seu entre na conta!.`);
            }
        });
    }
}
exports.PutProducts = PutProducts;
