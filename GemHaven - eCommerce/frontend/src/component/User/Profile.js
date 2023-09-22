import React, { Fragment ,useEffect, useState} from 'react';
import MetaData from '../layout/MetaData';
import {useSelector , useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import "./Profile.css"
import ProfileImage from "./Profile.png"
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'



const Profile = () => {

    const navigate = useNavigate();
    const {loading , user} = useSelector (state => state.user);

    console.log(user)
  return (

      <Fragment>

        {loading ? <Loader/> : 

            <Fragment>
                <MetaData title={`${user.name}'s Profile`}/>

                <div className="profileContainer">
                    <div>
                        <h1>Profile</h1>
                        <img src= {user.avatar ? user.avatar.url : ProfileImage } alt={user.name} />
                        <Link to="/me/update">Edit Profile</Link>
                    </div>

                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>

                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substr(0,10)}</p>
                        </div>

                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Change Password</Link>
                        </div>

                    </div>
                </div>

            </Fragment>
        }
    </Fragment>

  )
}

export default  Profile;
