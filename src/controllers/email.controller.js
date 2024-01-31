
import sendEmail from "../services/EmailService.js";

const sendEmailController = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const response = await sendEmail(name, email, message);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default sendEmailController;
