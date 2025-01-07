import express, { Application } from "express"
import "dotenv/config"
import session from "express-session"
import { router } from "./router/router"
const port: any = process.env.PORT || 3003

class App {
    public app: Application
    constructor(){
        this.app = express()
        this.config();
    }

    config(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(router)
        this.app.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: { secure: true }
            })
        )
    }

    listen(port: number){
        this.app.listen(port, () => {
            console.log("http://localhost:"+port)
        })
    }
}

export { App }