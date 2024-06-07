const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envConfig");

exports.signUpMsg = async (email, first_name) => {

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
            html: `<b> Hi </b> <br/>
                <p>
                We've received your mail
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>Resida  Team</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

exports.signUpOtp = async (email, OTP) => {
    console.log(email, PASSMAILER);
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
            subject: "OTP sent",
            html: `<b> Hi </b> <br/>
                <p>
                Here is the OTP sent to you to verify your email address ${OTP}
                </p>
                
                </br>
                <b>
                
                <p>Best regards,</p>
                <p>Resida  Team</p>
                </b>
                `,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};