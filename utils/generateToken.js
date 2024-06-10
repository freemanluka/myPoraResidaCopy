const jwt = require("jsonwebtoken");
// require("otp-generator")
const { JWT_SECRET } = require("../config/envConfig");
const otpGenerator = require('otp-generator');


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


exports.generateOTP = async () => {
    const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        });
    return OTP
}

// specialCharacters: false,
        // digits: true,
        // alphabets: true,
        // length: 6