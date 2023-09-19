import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./ProductList.css"
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button, FormControl, FormLabel, FormGroup, FormHelperText } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import {getAllUsers , clearErrors, deleteUser} from "../../actions/userAction";
import { DELETE_USER_RESET } from '../../constants/userConstants'


const UsersList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error , users} = useSelector((state) => state.allUsers);

    const {error: deleteError , isDeleted , message} = useSelector((state) => state.profile)

    useEffect(() => {
      
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success(message);
            dispatch({type: DELETE_USER_RESET});
        }

        dispatch(getAllUsers());

    }, [dispatch , alert , error , deleteError , isDeleted,message]);
    

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };


    const columns = [

        {field: "id" , headerName: "User ID" , minWidth: 180 , flec: 0.8},

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },

        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5, 
        },

        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "actions",
            flex:0.3,
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return(
                    <Fragment>
                        <Link to={`/admin/user/${params.id}`} >
                            <EditIcon/>
                        </Link>
                        
                        <Button onClick={() => deleteUserHandler(params.id)} >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                );
            }
        }

    ];

    const rows = [];

    users && 
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            })
        })

  return (
    <Fragment>
        <MetaData title={`All Users - Admin`} />

        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>

                <DataGrid
                rows={rows}
                columns={columns} 
                disableRowSelectionOnClick
                pageSizeOptions={[10,100]}
                className='productListTable'
                autoHeight
                />
            </div>
        </div>

    </Fragment>
  )
}

export default UsersList