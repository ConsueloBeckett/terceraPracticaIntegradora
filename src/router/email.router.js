// correo.router.js
import express from "express";
import sendEmailController from "../controllers/email.controller.js";
import { generateResetToken, validateResetToken, dateToLeave } from "../utils.js";
import UserModel from "../dao/mongo/user.model.js";
import nodemailer from "nodemailer"

const emailRouter = express.Router();

emailRouter.post("/send-email", sendEmailController);

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.userMailer,
        pass: process.env.passMailer,
    },
});

emailRouter.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const resetToken = generateResetToken(user);

        // Establecer la fecha de expiración 1 hora después de ahora
        user.resetToken = {
            token: resetToken,
            expires: dateToLeave(1),
        };

        await user.save();

        const resetLink = `http://localhost:8080/reset-password/${resetToken}`;
  
      const mailOptions = {
        from: "mconsuelobeckett@gmail.com",
        to: email,
        subject: "Password recovering",
        html: `Click the link below to reset your password: <a href="${resetLink}">reset your password</a>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.json({ message: "A reset link has been sent to your email." });
    } catch (error) {
        console.error("Error en /forgot-password:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
  
emailRouter.get("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;

        // Verificar la validez del token
        const user = await UserModel.findOne({ "resetToken.token": token });

        if (!user || !validateResetToken(user.resetToken, token)) {
            return res.status(400).json({ message: "Invalid reset link." });
        }

        // Verificar si el enlace ha expirado
        if (new Date() > user.resetToken.expires) {
            return res.render("reset", { expired: true });
        }

        // Puedes redirigir a una página de restablecimiento de contraseña aquí
        return res.render("reset");
    } catch (error) {
        console.error("Error en /reset-password/:token:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default emailRouter 