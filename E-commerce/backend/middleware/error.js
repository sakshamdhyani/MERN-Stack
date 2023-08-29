const ErrorHandler = require("../utils/errorHandler");

const errorHandlerMiddleware = (err , req ,res , next) => {

    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || "Internal Server Error";


    // wrong MongoDb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`
        err = new ErrorHandler(message,400)
    }


    // Mongoose duplicate key error (like for registering with existing email)
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message , 400);
    }


    // wrong JWT error
    if(err.name === "jsonWebTokenError"){
        const message = `JSON web token is invalid, try again`
        err = new ErrorHandler(message,400)
    }


    // JWT expire error
    if(err.name === "TokenExpiredError"){
        const message = `JSON web token is Expired, try again`
        err = new ErrorHandler(message,400)
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack,
    });

}

module.exports = errorHandlerMiddleware;