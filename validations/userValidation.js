const Joi = require('joi');
const STATUSCODE = require("../utils/statusCodes");
// const { formatResult } = require("../utils/formatResult");


function formatResult(validationResult) {
    if (validationResult.error) {
        // Handle validation errors
        const errorMessages = validationResult.error.details.map(detail => detail.message);
        return {
            success: false,
            message: errorMessages.join(', '), // Combine error messages
        };
    } else {
        // Validation succeeded
        return {
            success: true,
            message: 'Validation passed successfully!',
        };
    }
}


exports.authValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        //googleToken: Joi.string(),
        //facebookToken: Joi.string
    });

    const validateOptions= {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = formatResult(schema.validate(req.body, validateOptions));
    // req.body = result

    if (result.error) {
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
            // status: false,
            // msg: result.error.details[0].message,
        });
    }
    next();
}

exports.otpValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().required(),
    });
    const validateOptions= {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const result = formatResult(schema.validate(req.body, validateOptions));
    //reg.body = result
    
    if (result.error) {
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
            // status: false,
            // msg: result.error.details[0].message,
        });
    }
    next();
};
