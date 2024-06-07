const contactModel = require("../models/contacts")
const { contactUsMsg } = require("../utils/emails/contact")
const StatusCodes = require("../utils/statusCodes");

const contact = async (req, res) => {

    const {first_name, last_name, email, phone_number, subject, message} = req.body

    const contactObject = {
        first_name,
        last_name,
        email,
        phone_number,
        subject,
        message
    }

    const saveMsg = await contactModel.create(contactObject);

// send message
await contactUsMsg(email)

    return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Thank you for contacting us! We will soon get back to you!",
        data: saveMsg
    })
}

module.exports = {contact};

