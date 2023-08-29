const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(

    async(req,res,next) => {

        const {token} = req.cookies;

        if(!token){
            return next(new ErrorHandler("Please Login to access this resource",401));
        }
        
        const decodeData = jwt.verify(token , process.env.JWT_SECRET);

        req.user = await User.findById(decodeData.id);

        next();
    }

)


exports.authorizeRoles = (...roles) => {

    return async (req,res,next) =>{


        if(!roles.includes(req.user.role)){

            // i have use return here because if the role is not allowed then the next function in the route will not be called
           return next (new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));

        }

        next();
    };
}


