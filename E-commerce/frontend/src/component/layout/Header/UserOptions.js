import React, { Fragment, useState } from 'react'
import "./Navbar.css"
import {SpeedDial , SpeedDialAction} from "@material-ui/lab";
import Profile from "./Profile.png"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import {logout} from "../../../actions/userAction"
import {useDispatch} from "react-redux";




const UserOptions = ({user}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [open , setOpen] = useState(false);

    const options = [
        {icon: <ListAltIcon/> , name:"Orders" , func: orders},
        {icon: <PersonIcon/> , name:"Profile" , func: account},
        {icon: <ExitToAppIcon/> , name:"Logout" , func: logoutUser},
    ]


    if(user.role === "admin"){
        options.unshift
        (
            {icon: <DashboardIcon/> , name:"Dashboard" , func: dashboard},
        )
    }


    function dashboard () {
        navigate("/dashboard")
    }
    function orders () {
        navigate("/orders")
    }
    function account () {
        navigate("/account")
    }
    function logoutUser () {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: 100}}/>
        <SpeedDial 
        className='speedDial'
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ position: 'absolute', bottom: "16px", right: "16px" }}
        FabProps={{ size: "medium" }}
        open = {open}
        direction='down'
        
        icon = {<img 
            className='speedDialIcon'
            src={user.avatar.url ? user.avatar.url: Profile}
            alt='Profile'
        />}
        >
            
            {options.map((item) => (
                <SpeedDialAction 
                key={item.name}
                icon={item.icon} 
                tooltipTitle = {item.name}
                onClick={item.func}
                />
            ))}

        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions