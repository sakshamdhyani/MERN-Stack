const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type : String,
        required: [true , "Please Enter Product Name"],
        trim: true,
    },
    
    description:{
        type : String,
        required: [true , "Please Enter Description"]
    },

    price: {
        type: Number,
        required: [true , "Please Enter Price"],
        maxLength: [8 , "Price cannot exceed 8 digits"]
    },

    ratings:{
        type:Number,
        default:0
    },

    images: [
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            }
        }
    ],

    category:{

        type: String,
        required: [true , "Please Enter Product Category"],
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Stock: {
        type: Number,
        required: [true , "Please Enter Product Stock"],
        maxLength: [4 , "Stock cannot exceed 4 digits"],
        default: 1,
    },

    numOfReview: {

        type: Number,
        default: 0,
    },

    reviews: [
        {
            user:{
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },

            name: {
                type: String,
                required:true,
            },

            rating: {
                type: Number,
                require: true
            },

            comment: {
                type: String,
                required: true,
            }
        }
    ],

    createdAt:{
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model("Product" , productSchema);