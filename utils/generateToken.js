const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");

exports.generateToken = async (user) => {
    const token = await jwt.sign(
        {
            _id: user._id,
            email: user.email,
            phone: user.phone,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
};


exports.generateOTP = async() => {
    const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        // specialCharacters: false,
        // digits: true,
        // alphabets: true,
        // length: 6
    });
    return OTP
}