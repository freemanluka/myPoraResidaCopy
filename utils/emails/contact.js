const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envConfig");


exports.contactUsMsg = async (email, first_name) => {

    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "Thanks for contacting us",
            html: `<b> Greetings </b> <br/>
                <p>
                We've received your mail
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>PEACE!</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};