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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
describe("My first test", () => {
    const app = new app_1.App().app;
    /*it("should test the server running", async () => {
        const response = await request(app).get("/")
        expect(response.body).toStrictEqual({
            "message": "Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aquii novamente!"
        })
    })*/
    it("should check if get users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user");
        //expect(response.body).toEqual(200)
        expect(response.body).toStrictEqual({
            "message": "Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aquii novamente!"
        });
    }));
});
