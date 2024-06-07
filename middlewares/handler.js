
const notFound = (req, res, next) => {

    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(409);
    next(error);
}


const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 :res.statusCode;
    const message = 'Internal Server Error';
    console.log({ Error: err.message })

    res.status(statusCode).json({
        status: 'error',
        message: message
    });

};

const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try{
            await handler(req, res, next);
        } catch(error) {
            next(error);
        }
    }
}


module.exports = {
    notFound,
    errorHandler,
    asyncHandler
}