import express, { Application } from "express"
import "dotenv/config"
import session from "express-session"
import { router } from "./router/router"
const port: any = process.env.PORT || 3003
//console.log("http://localhost:" + port)

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
                cookie: { secure: false }
            })
        )
    }

    listen(port: number){
        this.app.listen(port, () => {
            return "http://localhost:"+port
        })
    }
}

export { App }