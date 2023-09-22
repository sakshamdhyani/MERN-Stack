import React, { useEffect } from 'react'
import "./LoginSignUp.css"
import Loader from "../layout/Loader/Loader";
import { Fragment , useRef , useState} from 'react';
import { Link, useLocation } from 'react-router-dom'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import Profile from "./Profile.png"
import {useAlert} from "react-alert";

import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from "react-redux";
import { clearErrors , login , register } from '../../actions/userAction';


const LoginSignup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error , loading , isAuthenticated} = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user , setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name , email , password} = user;

    const [avatar , setAvatar] = useState(null);
    const [avatarPreview , setAvatarPreview] = useState(Profile)



    const loginSubmit = (event) => {
        event.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("password" , password);
        myForm.set("avatar" , avatar);

        dispatch(register(myForm));
    };

    const registerDataChange = (event) => {

        if(event.target.name === "avatar"){

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(event.target.files[0]);

        }else{
            setUser({...user , [event.target.name] : event.target.value });
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";
    
    useEffect (() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        
        if(isAuthenticated){
            navigate(redirect);
        }
        
    },[dispatch , alert , error,isAuthenticated,navigate,redirect]);
    
    
    // Css for div present below login or register buttons
    const switchTabs = (event , tab) => {

        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    }

    
  return (
    
    <Fragment>
        {loading ? <Loader/> : 
        
            <Fragment>

                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className='login_signUp_toggle'>
                                <p onClick={(event) => switchTabs(event,"login")}>LOGIN</p>
                                <p onClick={(event) => switchTabs(event,"register")}>Register</p> 
                            </div>
                            <button ref={switcherTab}></button>
                        </div>

                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon/>
                                <input 
                                type="email" 
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(event) => setLoginEmail(event.target.value)}
                                />
                            </div>

                            <div className="loginPassword">
                                <LockOpenIcon/>
                                <input 
                                type="password" 
                                placeholder='password'
                                required
                                value={loginPassword}
                                onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className='loginBtn'/>
                        </form>


                        <form 
                            className='signUpForm'
                            ref={registerTab}
                            encType='multipart/form-data'
                            onSubmit={registerSubmit}
                        >

                            <div className="signUpName" >
                                <FaceIcon/>
                                <input 
                                type="text" 
                                name="name"
                                placeholder='Name'
                                required
                                value={name}
                                onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpEmail">
                                <MailOutlineIcon/>
                                <input 
                                type="email" 
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpPassword">
                                <LockOpenIcon/>
                                <input 
                                type="password"
                                placeholder='password'
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                                />
                            </div>

                            <div id="registerImage">
                                <img src={avatar === null ? Profile : avatar} alt="Avatar Preview" />
                                <input 
                                type="file" 
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}    
                                />
                            </div>

                            <input 
                            type="submit" 
                            value= "Register"
                            className='signUpBtn'
                            />

                        </form>

                    </div>
                </div>

            </Fragment>

        }

    </Fragment>

  )
}

export default LoginSignup