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
import { deleteOrder, getAllOrders , clearErrors } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'


const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error , orders} = useSelector((state) => state.allOrders);

    const {error: deleteError , isDeleted} = useSelector((state) => state.order)

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
            alert.success("Order Deleted Successfully");
            dispatch({type: DELETE_ORDER_RESET});
        }

        dispatch(getAllOrders());

    }, [dispatch , alert , error , deleteError , isDeleted]);
    

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };


    const columns = [

        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1,
          },
          {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
              return params.row.status === "Delivered" 
                ? "greenColor"
                : "redColor"
            }
          },
          {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
          },
          {
            field: "amount",
            headerName: "Amount",
            type: "number",
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
                        <Link to={`/admin/order/${params.id}`} >
                            <EditIcon/>
                        </Link>
                        
                        <Button onClick={() => deleteOrderHandler(params.id)} >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                );
            }
        }

    ];

    const rows = [];

    orders &&
    orders.forEach((item,index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
        <MetaData title={`All Orders - Admin`} />

        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>

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


export default OrderList