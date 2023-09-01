import React, { useState } from 'react'
// import {ReactNavbar} from "overlay-navbar";
import logo from "../../../Images/logo.png";


// const options = {

//         burgerColor : "#eb4034",
//         burgerColorHover : "#a6d24",
//         logo,
//         logoWidth : "20vmax",
//         navColor1 : "white",
//         logoHoverSize : "10px",
//         logoHoverColor : "#eb4034",
//         link1Text : "Home",
//         link2Text : "Products",
//         link3Text : "Contact",
//         link4Text : "About",
//         link1Url : "/",
//         link2Url : "/products",
//         link3Url : "/contact",
//         link4Url : "/about",
//         link1Size : "1.2vamx",
//         link1Color : "rgba(35,35,35,0.8)",
//         nav1justifyContent : "flex-end",
//         nav2justifyContent : "flex-end",
//         nav3justifyContent : "flex-start",
//         nav4justifyContent : "flex-start",
//         link1ColorHover : "#eb4034",
//         link1Margin : "1vmax",
//         profileIconColor : "rgba(35,35,35,0.8)",
//         searchIconColor : "rgba(35,35,35,0.8)",
//         cartIconColor : "rgba(35,35,35,0.8)",
//         profileIconColorHover : "#eb4034",
//         searchIconColorHover : "#eb4034",
//         cartIconColorHover : "#eb4034",
//         cartIconMargin : "1vmax",

// }

// const Navbar = () => {
//   return (
//     <ReactNavbar
//         {...options}
//     />
//   );
// };

// export default Navbar


import "./Navbar.css";
import { Link , useNavigate  } from 'react-router-dom';

const Navbar = () => {

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

        <Link className='navbarLogo' to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className='searchArea'>
          
          <form className='searchBox' onSubmit={searchSubmitHandler}>

            <input 
            type="text" 
            placeholder='Search a Product ...'
            onChange={(event) => setKeyword(event.target.value)}  
            />

            <input type="submit" value="Search"/>

          </form>

        </div>

        <div className='links'>

          <Link className='link' to= "/">Home</Link>
          <Link className='link' to= "/products" >Products</Link>
          <Link className='link' to="/contact">Contact</Link>
          <Link className='link' to="/about">About</Link>

        </div>

      </div>

    </div>
  );
};

export default Navbar




// 6:51:0