import express from "express"
import ViteExpress from "vite-express"
import cors from "cors"

import { api } from "./api/index"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", api)

app.get("/ping", (_, res) => res.send("pong"))

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))
