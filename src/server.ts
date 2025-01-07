import { App } from "./app"
import "dotenv/config"

const port: any = process.env.PORT || 3002
const app = new App()

app.listen(port)