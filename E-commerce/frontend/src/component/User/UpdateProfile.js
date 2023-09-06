import React, { Fragment , useState ,useEffect } from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import { useSelector , useDispatch } from "react-redux";
import { clearErrors , loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Profile from "./Profile.png"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    const {error , isUpdated , loading} = useSelector(state => state.profile);

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatar , setAvatar] = useState(user.avatar.url);
    const [avatarPreview , setAvatarPreview] = useState(user.avatar.url);

    const updateProfileSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("avatar" , avatar);

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (event) => {

        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    
    useEffect (() => {

        if(isUpdated){
            alert.success("Profile Updated Successfully");
            
            dispatch(loadUser());

            navigate("/account");
            
            dispatch({type: UPDATE_PROFILE_RESET})
        }
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        
        
    },[dispatch , alert , error, navigate , isUpdated , user])




  return (
    
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Update Profile" />

            <div className="updateProfileContainer">
                <div className="updateProfileBox">

                    <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form 
                                className='updateProfileForm'
                                encType='multipart/form-data'
                                onSubmit={updateProfileSubmit}
                            >

                                <div className="updateProfileName" >
                                    <FaceIcon/>
                                    <input 
                                    type="text" 
                                    name="name"
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    />
                                </div>

                                <div className="updateProfileEmail">
                                    <MailOutlineIcon/>
                                    <input 
                                    type="email" 
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>


                                <div id="updateProfileImage">
                                    <img src={avatar === null ? Profile : avatarPreview} alt="Avatar Preview" />
                                    <input 
                                    type="file" 
                                    name='avatar'
                                    accept='image/*'
                                    onChange={updateProfileDataChange}    
                                    />
                                </div>

                                <input 
                                type="submit" 
                                value= "Update Profile"
                                className='updateProfileBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>

        }
    </Fragment>

  )
}

export default UpdateProfile