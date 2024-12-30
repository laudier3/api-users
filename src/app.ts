import express from "express"
import "dotenv/config"
import session from "express-session"
import { router } from "./router/router"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(router)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})