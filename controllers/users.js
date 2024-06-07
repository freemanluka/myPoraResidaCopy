const userModel = require("../models/user");
const otpModel = require("../models/otp");
// const { userSignUpMsg,  signUpOtp } = require("../utils/emails/contact");

const StatusCode = require("../utils/statusCodes");
const { generateToken, generateOTP } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const getOTP = async (req, res, next) => {
    const { email } = req.body;

    const OTP = await generateOTP();
    console.log(OTP)

    const user = await userRepo.saveUser(data);

    await otpModel.create({
        email: email,
        otp: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiration: Date.now() + 12 + 60 * 1000, 
    });

    /** 
     * send mail
    */
    await signUpOtp(email, OTP);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "OTP sent successfully, check your email",
        // data: OTP,
    });
};

const resendOTP = async (req, res) => {
    const {email} = req.body;

    const otpExist = await otpModel.findOne({email: email});



    await otpModel.deleteMany({email:otpExist?.email});

    const OTP = await generateOTP();
    // console.log(OTP)
    await otpModel.create({
        email: email,
        otp: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiration: Date.now() + 12 + 60 * 1000,
    });

    /**
     * send email
     */
    await signUpOtp(email, OTP);
    return res.status(StatusCode.OK).json({
        status: true,
        msg: "OTP resent",
    });

};

const validateOTP = async (req, res) => {
    const {email, code} = req.body;
    const otpExist = await otpModel.findOne({code: code});
    
    if(otp == null) {

      return res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        msg: "Invalid OTP",
      });
    }

    if(otp.email != email) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Credentials",
        });
    }



    // delete OTP
    await otpModel.deleteOne({code:code});


    
    return res.status(StatusCode.OK).json({
        status: true,
        msg: "OTP successfully validated",
    });



};

const signUp = async (req, res, next) => {
    const {email, password} = req.body;

    const userExist = await userModel.findOne({ email: email});
    
    if (userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User already exist",
        });
        // run everything
    } else {
    }

    const salt = await bcrypt.generateSaltSync(10);

    const harshedPassword = await bcrypt.harshed(password, salt);

    // console.log({harshedPassword})

    const saveUser = await userModel.create({
        email: email,
        password:  harshedPassword,
    });

    await userSignUpMsg(email);

    return res.status(StatusCode.CREATED).json({
        status: true,
        msg: "Account created successfully",
        data: saveUser,
    });
};

const signIn = async (req, res, next) => {
    
    
    const {email, password, name} = req.body;

    console.log(name, email, password)

    const userExist = await userModel.findOne({ email: email})

    if (!userExist) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "User account not found, Please Sign Up",
        });
    };

    // ELSE

    const passwordMatches = await bcrypt.compare(password, userExist.password);

    if (!passwordMatches) {
        return res.status(StatusCode.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect Password",
        });
    }



    //JWT
    const token = await generateToken(userExist);





    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Welcome to Resida",
        data: {
            userExist,
            token
        },
    });
};

module.exports = {
    signUp,
    signIn,
    getOTP,
    resendOTP,
    validateOTP,
};