import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Header/Navbar.js';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"

import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"

function App() {

  // Rendering Font Families
  useEffect(() => {

    WebFont.load({
      google:{
        families:["Roboto" , "Droid Sans" , "Chilanka"],
      },
      
    });
  
  },[]);


  return (

    <Router>

      <Navbar/>

      <Routes>
        <Route exact path='/' element = {<Home/>} />
        <Route exact path='/product/:id' element = {<ProductDetails/>} />
        <Route exact path='/products' element = {<Products/>} />
        

      </Routes>
      

      <Footer/>
    </Router>

  );
}

export default App;


