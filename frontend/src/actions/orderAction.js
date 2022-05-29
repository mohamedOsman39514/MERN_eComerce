import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_SUCCESS,
} from "../actionTypes/index";
import axios from "axios";

// Create Order
export const Order = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("2_configAction   ", config);
    console.log("dataActionBBefore   ", order);

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/orders",
      order,
      config
    );

    console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Order Details
export const OrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("2_configAction   ", config);
    // console.log("dataActionBBefore   ", id);

    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/orders/${id}`,

      config
    );

    // console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Order Payment
export const PayOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("2_configAction   ", config);
    // console.log("dataActionBBefore   ", id);

    const { data } = await axios.put(
      `http://127.0.0.1:5000/api/orders/${id}/pay`,
      paymentResult,

      config
    );

    //   console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_PAID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Order Delivered
export const DeliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("2_configAction   ", config);
    console.log("dataActionBBefore   ", order._id);

    const { data } = await axios.put(
      `http://127.0.0.1:5000/api/orders/${order._id}/deliver`,
      {},
      config
    );

    console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// All Orders
export const OrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("2_configAction   ", config);
    // console.log("dataActionBBefore   ", id);

    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/orders/myorders`,
      config
    );

    //   console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// All Orders List By Admin Action
export const ListOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("1_userInfoAction   ", userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("2_configAction   ", config);
    // console.log("dataActionBBefore   ", id);

    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/orders`,
      config
    );

    //   console.log("3_dataAction   ", data);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
