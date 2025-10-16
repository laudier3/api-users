import { Router } from "express";
import { FindUser } from "../controllers/uses/controllerGet";
import { FindUserMe } from "../controllers/uses/controllerGetMe";
import { CreateUsers } from "../controllers/uses/controllerPost";
import { PutUsers } from "../controllers/uses/controllerPut";
import { DelUsers } from "../controllers/uses/controllerDel";
import { ControllerLogin } from "../controllers/auth/controllerLogin";
import { Logout } from "../controllers/auth/controllerLogout";
import { authMiddleware } from "../Middleware/middleware";

const router = Router();

const lisUsers = new FindUser();
const lisUsersMe = new FindUserMe();
const createUsers = new CreateUsers();
const updateUsers = new PutUsers();
const deleteUsers = new DelUsers();
const loginUsers = new ControllerLogin();
const logout = new Logout();

// --- Rotas públicas ---
router.post("/login", loginUsers.handle);
router.post("/logout", logout.handle);
router.post("/user", createUsers.handle);

// --- Rotas protegidas ---
router.get("/user/me", authMiddleware, lisUsersMe.handle);
router.get("/user", authMiddleware, lisUsers.handle);
router.put("/user", authMiddleware, updateUsers.handle);
router.delete("/user/:id", authMiddleware, deleteUsers.handle);

export { router };
