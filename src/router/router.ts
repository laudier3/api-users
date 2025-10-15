import { Router } from "express"
import { FindUser } from "../controllers/uses/controllerGet"
import { FindUserMe } from "../controllers/uses/controllerGetMe"
import { CreateUsers } from "../controllers/uses/controllerPost"
import { PutUsers } from "../controllers/uses/controllerPut"
import { DelUsers } from "../controllers/uses/controllerDel"
import { ControllerAuth } from "../controllers/auth/controllerAuth"
import { ControllerLogin } from "../controllers/auth/controllerLogin"
import { authMiddleware } from "../Middleware/middleware"
import { Logout } from "../controllers/auth/controllerLogout"

const router = Router()

const lisUsers = new FindUser()
const lisUsersMe = new FindUserMe()
const createUsers = new CreateUsers()
const updateUsers = new PutUsers()
const deleteUsers = new DelUsers()
const authUsers = new ControllerAuth()
const loginUsers = new ControllerLogin()
const logout = new Logout()

router.post("/login", loginUsers.handle)
router.post("/logout", logout.handle)
router.post("/user", createUsers.handle)
//router.get("/user", lisUsers.handle)

router.use(authUsers.handle, () => {
    router.get("/user", lisUsers.handle)
    router.get("/user/me", authMiddleware, lisUsersMe.handle)
    router.put("/user", updateUsers.handle)
    router.delete("/user/:id", deleteUsers.handle)
})


export { router }