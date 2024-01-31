import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const hashPass = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const validPass = (user, password) => {
    try {
        console.log("Password from user:", user.password)
        console.log("Provided password:", password);
        return bcrypt.compareSync(password, user.password)
    } catch (e) {
        console.error("Error in validPass:", e)
        return false;
    }}

export const dateToLeave = (hours) => {
        const now = new Date();
        const expirationTime = now.getTime() + hours * 60 * 60 * 1000; // Convert hours to milliseconds
        return new Date(expirationTime);
    };   

// Generar token de restablecimiento de contraseña
export const generateResetToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h", // El token expirará en 1 hora
    });

    return token;
};

// Validar token de restablecimiento de contraseña
export const validateResetToken = (resetToken, token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Comparar el ID de usuario y el correo electrónico en el token con los del objeto resetToken
        return (
            decoded.userId === resetToken.userId &&
            decoded.email === resetToken.email
        );
    } catch (error) {
        console.error("Error in validateResetToken:", error);
        return false;
    }
};

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname
