import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector , useDispatch } from 'react-redux';
import { clearErrors , getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination"
import { useParams } from 'react-router';
import  Slider  from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Mobile"
]



const Products = () => {

  // for fetching parameters from URL
  const params = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  // state for Category
  const [category, setCategory] = useState("");

  // state for price filter
  const [price, setprice] = useState([0,25000]);

  const priceHandler = (event,newPrice) => {
    setprice(newPrice);
  }

  // state for pagination
  const [currentPage , setCurrentPage] = useState(1);

  const setCurrentPageNo = (event) => {
    setCurrentPage(event);
  }

  // State for rating
  const [ratings, setRatings] = useState(0);

  // fetching values from a state from store reducers
  const {
    products , 
    loading , 
    error , 
    productsCount ,
    resultPerPage} = useSelector((state) => state.products)
  
  //fetch if any keyword named value available in URL
  const keyword = params.keyword;


  // fetching products
  useEffect(() =>  {

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword,currentPage,price,category,ratings));

  },[dispatch,keyword,currentPage,price,category,ratings,alert,error])



  return (
    <Fragment>

      {loading ? <Loader/> : 
        
        <Fragment>

          <MetaData title="PRODUCTS -- ECOMMERCE"/>

          <h2 className="productsHeading">Products</h2>

          <div className="products">

            {products.length > 1 ? 
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
            
            :

            <div className='noProduct'>No Products Found</div>
            }

          </div>


          <div>

            {products.length >= 1 ? 

            <div className="filterBox">

              {/* Price Filter */}
                <Typography>Price</Typography>

                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                />

                {/* Categories */}

                <Typography>Categories</Typography>

                  <ul className="categoryBox">

                    {categories.map((category) => (
                      
                      <li
                      className='category-link'
                      key={category}
                      onClick={() => setCategory(category)}
                      >

                      {category}
                      </li>

                    ))}

                  </ul>
                  
                  {/* Ratings */}

                  <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                  
                    <Slider
                      value={ratings}
                      onChange={(event,newRating) => {
                        setRatings(newRating);
                      }}
                      valueLabelDisplay='auto'
                      aria-labelledby='continuous-slider'
                      min={0}
                      max = {5} 
                    />
                  </fieldset>
            </div>
            :
            null
            }
          </div>

          {/* Pagination */}
          {resultPerPage < productsCount && products.length >= 1 ?

            <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText= "Prev"
              firstPageText= "1st"
              lastPageText= "Last"
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
            />
          </div>

          :

          null

          }

        </Fragment>

      }

    </Fragment>
  )
}

export default Products