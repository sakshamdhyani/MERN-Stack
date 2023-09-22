import React , {Fragment , useEffect , useState} from 'react'
import "./NewProduct.css"
import { useDispatch , useSelector } from 'react-redux'
import { createProduct , clearErrors } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate, useParams } from 'react-router'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUser } from '../../actions/userAction'



const UpdateUser = () => {

      const params = useParams(); 
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const alert = useAlert();
  
      const {error , user} = useSelector((state) => state.userDetails);

      const {
        loading: updateLoading ,
        error: updateError , 
        isUpdated 
        } = useSelector((state) => state.profile);
  
      const [name,setName] = useState("");
      const [email,setEmail] = useState("");
      const [role,setRole] = useState("");
      
      const userId = params.id;

    useEffect(() => {

        if(user && user._id !== userId){
            dispatch(getUserDetails(userId));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({type: UPDATE_USER_RESET});
        }

    },[dispatch , alert , error , navigate , isUpdated,user,userId,updateError]);
    
 
    const updateUserSubmitHandler = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("role" , role);


        dispatch(updateUser(userId,myForm));

    }




  return (
    <Fragment>
        <MetaData title="Update User" />

        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form 
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={updateUserSubmitHandler}
                >

                    <h1>Update User</h1>

                    <div>
                        <PersonIcon/>
                        <input 
                        type="text" 
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}    
                        />
                    </div>

                    <div>
                        <MailOutlineIcon/>
                        <input 
                        type="email" 
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}    
                        />
                    </div>

                   

                    <div>
                        <VerifiedUserIcon/>
                        <select
                        value={role} 
                        onChange={(event) => setRole(event.target.value)}
                        >

                            <option value="" > Choose Role </option>
                            <option value="admin" > Admin </option>
                            <option value="user" > User </option>

                        </select>
                    </div>
                                

                    <Button id='createProductBtn'
                    type='submit'
                    disabled= {updateLoading ? true : false || role==="" ? true : false}
                    >
                    Update     
                    </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}


export default UpdateUser