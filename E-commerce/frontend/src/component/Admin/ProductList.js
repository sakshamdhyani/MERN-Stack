import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./ProductList.css"
import { useDispatch , useSelector } from 'react-redux'
import { getAdminProduct , clearErrors , deleteProduct} from '../../actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button, FormControl, FormLabel, FormGroup, FormHelperText } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'



const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error , products} = useSelector((state) => state.products);

    const {error: deleteError , isDeleted} = useSelector((state) => state.product)

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
            alert.success("Product Deleted Successfully");
            dispatch({type: DELETE_PRODUCT_RESET});
        }

        dispatch(getAdminProduct());

    }, [dispatch , alert , error , deleteError , isDeleted]);
    

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };


    const columns = [

        {field: "id" , headerName: "Product ID" , minWidth: 200 , flec: 0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "stock",
            headerName: "Stock",
            minWidth: 150,
            flex: 0.3, 
        },

        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            flex: 0.5,
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
                        <Link to={`/admin/product/${params.id}`} >
                            <EditIcon/>
                        </Link>
                        
                        <Button onClick={() => deleteProductHandler(params.id)} >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                );
            }
        }

    ];

    const rows = [];

    products && 
        products.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                stock: item.stock,
                price: item.price,
            })
        })

  return (
    <Fragment>
        <MetaData title={`All Products - Admin`} />

        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList