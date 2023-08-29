const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(

    async (req,res,next) => {

        const {name,email,password} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "This is a sample id",
                url: "profilePicURL",
            },
        });

        sendToken(user,200,res,);

    }
)




// Login user
exports.loginUser = catchAsyncErrors(

    async (req,res,next) => {

        const {email,password} = req.body;

        // Checking if user has given password and email both

        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email And Password",400));
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid Email or Password",401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email or Password",401));
        }

        // If password and email both are correct
        sendToken(user,200,res,);
    }
);



// Logout User
exports.logout = catchAsyncErrors(

    async(req,res,next) => {

        res.cookie("token" , null , {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    }

);



// Forgot password
exports.forgetPassword = catchAsyncErrors(

    async (req,res,next) => {

        const user = await User.findOne({email: req.body.email})

        if(!user){
            return next(new ErrorHandler("User not found",404));
        }

        // Get ResetPassword Token
        const resetToken = user.getResetToken();

        await user.save({validateBeforeSave:false});

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this then please contact use ASAP.`;


        try{
         
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Reset`,
                message,
            });
 
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            })

        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordToken = undefined;
            await user.save({validateBeforeSave:false});

            return next(new ErrorHandler(error.message,500));
        }
    }
);



// Reset Password
exports.resetPassword = catchAsyncErrors(


    async (req,res,next) => {

        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire : { $gt : Date.now() },
        });

        if(!user){
            return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not match",400));
        }


        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user , 200 , res);
    }
);