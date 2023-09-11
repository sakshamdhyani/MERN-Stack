import {CREATE_ORDER_REQUEST
    ,CREATE_ORDER_SUCCESS,
     CREATE_ORDER_FAIL,
     MY_ORDERS_SUCCESS,
     MY_ORDERS_REQUEST,
     MY_ORDERS_FAIL,
     CLEAR_ERRORS} from "../constants/orderConstant";

import axios from "axios";

// Create Order
export const createOrder = (order) => async(dispatch) => {


    try{
 
        dispatch({type: CREATE_ORDER_REQUEST});

        const config = {
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const {data} = await axios.post("/api/v1/order/new" , 
        
        {      
            "shippingInfo": {
                "address": order.shippingInfo.address,
                "city": order.shippingInfo.city,
                "state": order.shippingInfo.state,
                "country": order.shippingInfo.country,
                "pincode": order.shippingInfo.pinCode,
                "phoneNo": order.shippingInfo.phoneNo
            },
        
            "itemsPrice": order.itemsPrice,
            "taxPrice" : order.taxPrice,
            "shippingPrice": order.shippingPrice,
            "totalPrice": order.totalPrice,
            "orderItems": order.orderItems,
            "paymentInfo": {
                "id": order.paymentInfo.id,
                "status": order.paymentInfo.status
            }
        }
        , config);

        dispatch({type: CREATE_ORDER_SUCCESS , payload: data});

    }catch(error){
        console.log("Error occured while creating order")
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }

};



// My Orders
export const myOrders = () => async(dispatch) => {


    try{
 
        dispatch({type: MY_ORDERS_REQUEST});

        const {data} = await axios.get("/api/v1/orders/me");
        

        dispatch({type: MY_ORDERS_SUCCESS , payload: data.orders});

    }catch(error){

        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }

};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}