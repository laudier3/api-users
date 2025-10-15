/*import { App } from "./app"
import "dotenv/config"

const port: any = process.env.PORT || 3002
const app = new App()

app.listen(port)
console.log("http://localhost:"+port)*/

import express from "express"
import "dotenv/config"
import session from "express-session"
import cors from "cors";
import { router } from "./router/router"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(router)
app.use((req, res, next) => {
    if(!req.session || !req.session.id){
        const err = new Error("Houve um erro")
        next(err)
    }
    next()
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})