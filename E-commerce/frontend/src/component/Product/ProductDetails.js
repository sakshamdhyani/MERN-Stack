import React, { Fragment, useEffect } from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';

import ReactStars from "react-rating-stars-component"
import "./ProductDetails.css"
import {useSelector , useDispatch} from "react-redux"
import {clearErrors, getProductDetails} from "../../actions/productAction";
import {useParams} from "react-router-dom"
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';



const ProductDetails = ({match}) => {

  const alert = useAlert();
  const {id} = useParams();
  const dispatch = useDispatch();
  const {product , loading , error} = useSelector((state) => state.productDetails);

  window.scrollTo(0, 0);
  useEffect(() => {
    
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));

  },[dispatch,id,error,alert])


// Options for react stars
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  value: product.ratings,
  isHalf: true,
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
                  <ReactStars {...options}/>
                  <span> ({product.numOfReview} Reviews) </span>
                </div>

                <div className="detailsBlock-3">
                  <h1>{`₹ ${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button>-</button>
                      <input type="number" value="1"/>
                      <button>+</button>
                    </div>
                    <button>Add to Cart</button>
                  </div>

                  <p>
                    Status:
                    <b className= {product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description: <p>{product.description}</p>
                </div>

                <button className="submitReview">Submit Review</button>

            </div>

        </div>

                    
        <h3 className="reviewsHeading">REVIEWS</h3>

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