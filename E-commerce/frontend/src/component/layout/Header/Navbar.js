import React, { useState } from 'react'
// import {ReactNavbar} from "overlay-navbar";
import logo from "../../../Images/logo.png";
import {BiSolidUserCircle} from "react-icons/bi";
import { useSelector } from 'react-redux';

import "./Navbar.css";
import { Link , useNavigate  } from 'react-router-dom';

import UserOptions from "../Header/UserOptions.js"



const Navbar = () => {

  const {isAuthenticated , user} = useSelector (state => state.user);

  const [keyword , setKeyword] = useState("");
  const navigate = useNavigate();

  // Search bar form submit handler
  const searchSubmitHandler = (event) => {

    event.preventDefault();

    if(keyword.trim()){
      navigate(`/products/${keyword}`);
    }
    else{
      navigate("/products");
    }

  
  };

  return (
    <div className='navParent'>

      <div className='navbar'>

       <div className = "logo" >

          <Link className='navbarLogo' to="/">
            <img src={logo} alt="logo" />
          </Link>

       </div>


       <div className = "centerArea">

      
            <form className='searchBox' onSubmit={searchSubmitHandler}>

              <input 
              type="text" 
              placeholder='Search a Product ...'
              onChange={(event) => setKeyword(event.target.value)}  
              />

              <input type="submit" value="Search"/>

            </form>


          <div className="navigators">
            <div className='links'>

            <Link className='link' to= "/">Home</Link>
            <Link className='link' to= "/products" >Products</Link>
            <Link className='link' to="/contact">Contact</Link>
            <Link className='link' to="/about">About</Link>

            </div>
          </div>

       </div>

       <div className = "user">

              {isAuthenticated ? 

              (
                <UserOptions user={user}/>
              ) 

              : 

              (
              <Link to='/login'>
                  <BiSolidUserCircle className='user-login-icon'/>
              </Link>
              )}

       </div>

      </div>

    </div>
  );
};

export default Navbar




// 6:51:0