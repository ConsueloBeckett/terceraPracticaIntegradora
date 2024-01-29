
import sendEmail from "../services/EmailService";

const sendEmailController = async (req, res) => {
    const { name, email, mesage } = req.body;

    try {
        const respuesta = await sendEmail(name, email, mesage);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default sendEmailController;
