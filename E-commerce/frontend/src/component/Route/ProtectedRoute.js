import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router';
import { useNavigate } from 'react-router';
import Loader from '../layout/Loader/Loader';
import LoginSignUp from '../User/LoginSignUp';


const ProtectedRoute = ({component: Component}) => {

    const {isAuthenticated , loading} = useSelector(state => state.user);
    const navigate = useNavigate();

    if(isAuthenticated){
        return <Component/>
    }
    else{
        return navigate("/login");
    }
    
  };

export default ProtectedRoute