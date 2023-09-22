import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';



const ProtectedRoute = ({component: Component , isAdmin }) => {

    const {isAuthenticated} = useSelector(state => state.user);
    const userRole = localStorage.getItem("userRole");

    const navigate = useNavigate();
    
    if(isAuthenticated === false){
        return navigate("/login");
    }

    if(isAdmin === true && userRole !== "superMan"){
        return navigate("/login");
    }

    return <Component/>
   
    

    
  };

export default ProtectedRoute