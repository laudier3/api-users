jest.mock("../../controllers/uses/controllerPost")
//import request from "supertest"
//import { App } from "../../app"
import { CreateProducts } from "../../controllers/uses/controllerPost"

describe("My first test", () => {
    it("should check if create user", async () => {
        //const app = new App().app;
        const users = {
            "name": "laudier",
            "phone": "75998239680",
            "email": "laudier6@gmail.com",
            "password":"123grasy*",
            "image": "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png",
            "age": "20",
            "access": "Admin"
        }
        const Crete = new CreateProducts()

        //Isso é a resposta
        console.log(Crete.handle)

        /*const response = await request(app).post("/user").send({
            "name": "laudier",
            "phone": "75998239680",
            "email": "laudier6@gmail.com",
            "password":"123grasy*",
            "image": "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png",
            "age": "20",
            "access": "Admin"
        })*/

        expect(Crete.handle).toEqual({msg: "Usuario cadastrado com sucesso!", users})
        //console.info(response.body)
        //expect(response.body).toStrictEqual({ msg: 'O E-mail laudier5@gmail.com ja esta cadastrado, tente outro!' })
        //expect(response.body).toEqual(201)
        //expect().toHaveProperty('id')
        //expect(Crete.handle).toHaveBeenCalledTimes(1)
    })
})