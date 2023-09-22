
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.MAIL_HOST,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    
    await transporter.sendMail(mailOptions);
    

};

module.exports = sendEmail; 