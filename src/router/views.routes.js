import express from "express";
import authorizedRole from "../config/auth.config.js";

const viewsRouter = express.Router()


viewsRouter.get("/home", async (req, res) => {
    res.render("inicio", {
        title: "Buy application",
    })
})

viewsRouter.get("/register", (req, res) => {
    res.render("register", {
        title: "Register User"
    })
})

viewsRouter.get("/login", (req, res) => {
    res.render("login", {
        title: "Login User"
    })
})

viewsRouter.get("/addProducts", authorizedRole("admin"), (req, res) => {
    res.render("addProducts", {
        title: "Add Products"
    })
})

viewsRouter.get("/form", async (req, res) => {
    res.render("form", {
        title: "Sent Email",
    })
})

viewsRouter.get("/reset", (req, res) => {
    res.render("reset", {
        title: "Reset Password"
    })
})

/*viewsRouter.post("/api/form", async (req, res) => {
    res.render("form", {
        title: "Mailing",
    })
})
*/
export default viewsRouter