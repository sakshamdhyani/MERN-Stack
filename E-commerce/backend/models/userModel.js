const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true , "Please Enter Your Name"],
        maxLength: [30,"Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true , "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail , "Please enter a valid Email"],
    },
    password: {
        type: String,
        required: [true , "Please Enter your Password"],
        minLength: [6, "Password must be at least of 6 characters"]
    },
    avatar: {

        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
   
    role: {
        type: String,
        default: "user",
    },


    resetPasswordToken : String,
    resetPasswordExpire : Date,


});



userSchema.pre("save" , async function (next) {

    if(!this.isModified("password")){
        next();
    }
    // Here await has an effect if await is not here the password will not be hashed at the time of register
    this.password = await bcrypt.hash(this.password , 10);
});


// JWT TOKEN
userSchema.methods.getJWTToken = function () {

    return jwt.sign({id: this._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword){

    return await bcrypt.compare(enteredPassword , this.password);
} 





// Generating password reset token

userSchema.methods.getResetToken = function () {

    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}









module.exports = mongoose.model("User",userSchema);