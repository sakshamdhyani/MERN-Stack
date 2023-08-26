const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


// Create Product
exports.createProduct = catchAsyncErrors(

    async(req,res,next) => {

        const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product,
        })
    }

);


// Get All Products

exports.getAllProducts  = catchAsyncErrors(

    async(req,res) => {

        const products = await Product.find();
    
        res.status(200).json({
            
            success:true,
            products,
        })
    }
);



// Get single product details

exports.getSingleProduct = catchAsyncErrors(

    async(req,res,next) => {

        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler('Product Not Found' , 404));
        }
    
        res.status(200).json({
            success:true,
            product,
        })
    }
);

// Update product -- Admin

exports.updateProduct = catchAsyncErrors(

    async(req,res,next) => {

        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler('Product Not Found' , 404));
        }
    
        product = await Product.findByIdAndUpdate(req.params.id , req.body , {
    
            new: true,
            runValidators: true ,
            useFindAndModify: false,
    
        });
    
        res.status(200).json({
            success:true,
            product,
        })
    }

);



// Delete product

exports.deleteProduct = catchAsyncErrors(

    async (req,res,next) => {

        const product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler('Product Not Found' , 404));
        }
    
        await product.deleteOne();
    
        res.status(200).json({
            success:true,
            message: "Product deleted successfully",
        })
    }

);