"use strict";
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
jest.mock("../../controllers/uses/controllerPost");
//import request from "supertest"
//import { App } from "../../app"
const controllerPost_1 = require("../../controllers/uses/controllerPost");
describe("My first test", () => {
    it("should check if create user", () => __awaiter(void 0, void 0, void 0, function* () {
        //const app = new App().app;
        const users = {
            "name": "laudier",
            "phone": "75998239680",
            "email": "laudier6@gmail.com",
            "password": "123grasy*",
            "image": "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png",
            "age": "20",
            "access": "Admin"
        };
        const Crete = new controllerPost_1.CreateProducts();
        console.log(Crete.handle);
        /*const response = await request(app).post("/user").send({
            "name": "laudier",
            "phone": "75998239680",
            "email": "laudier6@gmail.com",
            "password":"123grasy*",
            "image": "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png",
            "age": "20",
            "access": "Admin"
        })*/
        expect(Crete.handle).toEqual({ msg: "Usuario cadastrado com sucesso!", users });
        //console.info(response.body)
        //expect(response.body).toStrictEqual({ msg: 'O E-mail laudier5@gmail.com ja esta cadastrado, tente outro!' })
        //expect(response.body).toEqual(201)
        //expect().toHaveProperty('id')
        //expect(Crete.handle).toHaveBeenCalledTimes(1)
    }));
});
