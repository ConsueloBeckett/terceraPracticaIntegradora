import express from "express";
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import session from "express-session"
import sessionConfig from "./config/session.config.js"
import connectMongo from "./config/mongo.config.js"
import dotenv from 'dotenv'
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import viewsRouter from "./router/views.routes.js"
import productsRouter from "./router/products.routes.js"
import cartsRouter from "./router/carts.routes.js"
import userRouter from "./router/user.routes.js"
import emailRouter from "./router/email.router.js";
//import nodemailer from "nodemailer"
dotenv.config()

const app = express()
const PORT = 8080

connectMongo()

app.use(session(sessionConfig))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "/views"))

app.use("/", express.static(path.resolve(__dirname, "public")));
app.use("/", viewsRouter)

app.use("/api/users", userRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)
app.use("/api/email", emailRouter)



app.listen(PORT, () => console.log(`Listening to the port ${PORT}`))
