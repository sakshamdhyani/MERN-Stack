import React ,{Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css"
import {useDispatch , useSelector} from "react-redux"
import {myOrders , clearErrors} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link, useSearchParams } from "react-router-dom";
import {useAlert} from "react-alert";
import { Typography } from '@material-ui/core';
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";



const MyOrders = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading , error , orders} = useSelector((state) => state.myOrders);
  const {user} = useSelector((state) => state.user);

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
      flex: 0.3,
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
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      type:"number",

      renderCell: (params) => {
            return(
              <Link to={`/order/${params.id}`}>
                  <LaunchIcon/>
              </Link>
            );
      }
    }
    
  ];


  const rows = [];

  orders &&
    orders.forEach((item,index) => {
      <Link to={`order/${item._id}`}> {item._id} </Link>
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());

  } , [dispatch , alert , error])



  return (
    <Fragment>
        <MetaData title={`${user ? user.name : 'Unknown' } - Orders`} />
        
        {loading ? (<Loader/>)  : 
        
        (
          
          <div className='myOrdersPage'>
            
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions = {[10 , 100]}
              pagination={true}
              disableRowSelectionOnClick
              className='myOrdersTable'
              autoHeight
            />

            <Typography id="myOrderHeading">{user ? user.name : 'Unknown'}'s Orders</Typography>

          </div>


        )
        
        }
    </Fragment>
  )
}

export default MyOrders