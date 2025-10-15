import request from "supertest"
import { App } from "../../app"

describe("My first test", () => {
    const app = new App().app;
    /*it("should test the server running", async () => {
        const response = await request(app).get("/")
        expect(response.body).toStrictEqual({
            "message": "Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aqui novamente!"
        })
    })*/
    it("should check if get users", async () => {
        const response = await request(app).get("/user")
        //expect(response.body).toEqual(200)
        expect(response.body).toStrictEqual({
            "message": "Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aqui novamente!"
        })
    })
})