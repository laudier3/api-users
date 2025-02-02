import { Router } from "express"
import { FindProducts } from "../controllers/uses/controllerGet"
import { CreateProducts } from "../controllers/uses/controllerPost"
import { PutProducts } from "../controllers/uses/controllerPut"
import { DelProducts } from "../controllers/uses/controllerDel"
import { ControllerAuth } from "../controllers/auth/controllerAuth"
import { ControllerLogin } from "../controllers/auth/controllerLogin"

const router = Router()

const lisProsucts = new FindProducts()
const createProsucts = new CreateProducts()
const updateProsucts = new PutProducts()
const deleteProsucts = new DelProducts()
const authProsucts = new ControllerAuth()
const loginProsucts = new ControllerLogin()

router.post("/login", loginProsucts.handle)
router.post("/user", createProsucts.handle)
//router.get("/user", lisProsucts.handle)

router.use(authProsucts.handle, () => {
    router.get("/user", lisProsucts.handle)
    router.put("/user", updateProsucts.handle)
    router.delete("/user/:id", deleteProsucts.handle)
})


export { router }