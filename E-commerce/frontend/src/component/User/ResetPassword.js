import React, { Fragment , useState ,useEffect } from 'react'
import "./resetPassword.css"
import Loader from "../layout/Loader/Loader";
import { useSelector , useDispatch } from "react-redux";
import { clearErrors , loadUser, resetPassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Profile from "./Profile.png"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useParams } from 'react-router-dom';




const ResetPassword = () => {

    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error , success , loading} = useSelector(state => state.forgotPassword);

    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const resetPasswordSubmit = (event) => {

        event.preventDefault();

        const myForm = new FormData();

        myForm.set("password" , password);
        myForm.set("confirmPassword" , confirmPassword);

        dispatch(resetPassword(params.token,myForm));
    };

    
    useEffect (() => {

        if(success){

            alert.success("Password Updated Successfully");
            
            navigate("/login");
            
        }


        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        
        
    },[dispatch , alert , error, navigate , success])




  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Change Password" />

            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">

                    <h2 className='resetPasswordHeading'>Update Password</h2>
                            <form 
                                className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit}
                            >


                                <div>
                                    <LockOpenIcon/>
                                    <input 
                                    type="password" 
                                    placeholder='New Password'
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>

                                <div>
                                    <LockIcon/>
                                    <input 
                                    type="password" 
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>

                                <input 
                                type="submit" 
                                value= "Update"
                                className='resetPasswordBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>

        }
    </Fragment>

  )
}

export default ResetPassword