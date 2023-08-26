module.exports = theFunc => (req,res,next) => {

    Promise.resolve(theFunc(req,res,next))
    // here this next will send the occured error to the errorHandlerMiddleware defined in the middlewares 
    .catch(next); 

}