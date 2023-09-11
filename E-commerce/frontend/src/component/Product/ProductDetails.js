import React, { Fragment, useEffect , useState} from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';

import ReactStars from "react-rating-stars-component"
import "./ProductDetails.css"
import {useSelector , useDispatch} from "react-redux"
import {clearErrors, getProductDetails, newReview} from "../../actions/productAction";
import {useParams} from "react-router-dom"
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';
import {addItemsToCart} from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = ({match}) => {

  const alert = useAlert();
  const params = useParams();
  const {id} = useParams();
  const dispatch = useDispatch();
  const {product , loading , error} = useSelector((state) => state.productDetails);

  const {success , error : reviewError} = useSelector((state) => state.newReview);

  useEffect(() => {
    
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type: NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(id));

  },[dispatch,id,error,alert,reviewError , success])


// Submit Review
const submitReviewToggle = () => {

  open ? setOpen(false) : setOpen(true);

}

const reviewSubmitHandler = () => {

  const myForm = new FormData();

  myForm.set("rating",rating);
  myForm.set("comment",comment);
  myForm.set("productId", params.id);

  dispatch(newReview(myForm));

  setOpen(false);
}


// Options for react stars
const options = {
  size: "large",
  value: product.ratings,
  readOnly: true,
  precision: 0.5,
};


const [quantity , setQuantity] = useState(1);
const [open , setOpen] = useState(false);
const [rating , setRating] = useState(0);
const [comment , setComment] = useState("");


const increaseQuantity = () => {
  if(product.stock <= quantity) return;
  setQuantity(quantity+1);
}

const decreaseQuantity = () => {
  if(quantity <= 1) return;
  setQuantity(quantity-1);
}


// adding items to cart
const addtoCartHandler = () => {
  dispatch(addItemsToCart(params.id , quantity));
  alert.success("Item Added To Cart");
}

// for ADD TO CART BUTTON when product is out of stock
const buttonStyles = {
  backgroundColor: 'gray',
  color: 'black',
  fontWeight: 'bold',
};


  return (
    <Fragment>

      {loading ? (<Loader/>) : (

        <Fragment>

        <MetaData title={`${product.name} -- ECOMMERCE`}/>

        <div className='ProductDetails' id='#ProductDetails'>

            <div>
              <Carousel className='Carousel'>
                {product.images &&
                  product.images.map((item,i) => (

                    <img 
                    className='CarouselImage'
                    src={item.url} 
                    alt= {`${i} Slide`} 
                    key={item.url}
                    />

                  ))}
              </Carousel>
            </div>


            <div>

                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                
                <div className="detailsBlock-2">
                  <Rating {...options}/>
                  <span className='detailsBlock-2-span'> ({product.numOfReview} Reviews) </span>
                </div>

                <div className="detailsBlock-3">
                  <h1>{`₹ ${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    
                    <div className="detailsBlock-3-1-1">

                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value = {quantity}/>
                      <button onClick={increaseQuantity}>+</button>

                    </div>
                    
                    <button disabled = {product.stock < 1 ? true : false} style={product.stock < 1 ? buttonStyles : null}

                       onClick={addtoCartHandler}> 
                       
                       Add to Cart
                      
                    </button>

                  </div>

                  <p>
                    Status:
                    <b className= {product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description: <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>

            </div>

        </div>

                    
        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby='simple-dialog-title'
          open = {open}
          onClose={submitReviewToggle}
        >

            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
                  
                    <Rating
                      onChange = {(event) => setRating(event.target.value)}
                      value = {rating}
                      size = "large" 
                    />

                    <textarea
                    className='submitDialogTextArea'
                    cols={30}
                    rows={5}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    >
                    </textarea>

            </DialogContent>

            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary' >Cancle</Button>
              <Button onClick={reviewSubmitHandler} color='primary' >Submit</Button>
            </DialogActions>

        </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}

  
    </Fragment>
      )}

    </Fragment>
  );
}

export default ProductDetails