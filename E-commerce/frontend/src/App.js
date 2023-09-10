import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Header/Navbar.js';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"

import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import Profile from "./component/User/Profile.js"
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";


function App() {


  useEffect(() => {

    WebFont.load({
      google:{
        families:["Roboto" , "Droid Sans" , "Chilanka"],
      },
      
    });

    store.dispatch(loadUser());
  
  },[]);


  return (

    <Router>

      <Navbar/>

      <Routes>
        <Route exact path='/' element = {<Home/>} />
        <Route exact path='/product/:id' element = {<ProductDetails/>} />
        <Route exact path='/products' element = {<Products/>} />
        <Route  path='/products/:keyword' element = {<Products/>} />
        
        <Route exact path='/login' element={<LoginSignUp/>}/>

        <Route exact path='/account' element={<ProtectedRoute component = {Profile} />}/>

        <Route exact path='/me/update' element={<ProtectedRoute component = {UpdateProfile} />}/>

        <Route exact path='/password/update' element={<ProtectedRoute component = {UpdatePassword} />}/>
        
        <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
        
        <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
    
        <Route exact path='/cart' element={<Cart/>}/>

        <Route exact path='/login/shipping' element={<ProtectedRoute component = {Shipping} />}/>

        <Route exact path='/order/confirm' element={<ProtectedRoute component = {ConfirmOrder} />}/>



      </Routes>
      

      <Footer/>
    </Router>

  );
}

export default App;


