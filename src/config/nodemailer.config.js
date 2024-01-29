import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configurar el transporte nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.userMailer,
        pass: process.env.passMailer,
    },
});

export default transporter;
