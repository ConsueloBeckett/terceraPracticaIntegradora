// correo.service.js
import transporter from "../config/nodemailer.config.js";

const sentEmail = (nombre, correo, mensaje) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: "mconsuelobeckett@gmail.com",
            to: "consuelo.beckett@gmail.com",
            subject: "Message from contact",
            text: `Name: ${nombre}\nEmail: ${correo}\nMesage: ${mensaje}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                reject("Error to send the email");
            } else {
                console.log("Email sent");
                resolve("Email succesfull");
            }
        });
    });
};

export default sentEmail;
