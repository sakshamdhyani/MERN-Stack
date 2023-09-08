import React, { Fragment , useState ,useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader";
import { useSelector , useDispatch } from "react-redux";
import { clearErrors , loadUser, updatePassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Profile from "./Profile.png"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";





const UpdatePassword = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error , isUpdated , loading} = useSelector(state => state.profile);

    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const updatePasswordSubmit = (event) => {

        event.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword" , oldPassword);
        myForm.set("newPassword" , newPassword);
        myForm.set("confirmPassword" , confirmPassword);

        dispatch(updatePassword(myForm));
    };

    
    useEffect (() => {

        if(isUpdated){

            alert.success("Password Updated Successfully");
            
            navigate("/account");
            
            dispatch({type: UPDATE_PASSWORD_RESET})
        }


        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        
        
    },[dispatch , alert , error, navigate , isUpdated])




  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Change Password" />

            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">

                    <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form 
                                className='updatePasswordForm'
                                onSubmit={updatePasswordSubmit}
                            >

                                <div className="loginPassword">
                                    <VpnKeyIcon/>
                                    <input 
                                    type="password" 
                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(event) => setOldPassword(event.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon/>
                                    <input 
                                    type="password" 
                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
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
                                value= "Change Password"
                                className='updatePasswordBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>

        }
    </Fragment>

  )
}

export default UpdatePassword