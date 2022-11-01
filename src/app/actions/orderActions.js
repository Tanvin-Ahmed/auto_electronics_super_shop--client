import axios from "axios";
import {
  myOrderReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderReducer,
} from "../reducers/orderReducers";

const { actions: orderActions } = orderReducer;
const { actions: orderDetailsActions } = orderDetailsReducer;
const { actions: orderPayActions } = orderPayReducer;
const { actions: orderDeliveredActions } = orderDeliveredReducer;
const { actions: myOrderActions } = myOrderReducer;
const { actions: orderListActions } = orderListReducer;

const rootUrl = "http://localhost:5000";

export const createOrder = (info) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.setOrderCreateRequest());

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `${rootUrl}/order/make-order`,
      info,
      config
    );

    dispatch(orderActions.setOrderCreateSuccess(data));
  } catch (error) {
    dispatch(
      orderActions.setOrderCreateFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsActions.setOrderDetailsRequest());

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`${rootUrl}/order/get/${id}`, config);

    dispatch(orderDetailsActions.setOrderDetails(data));
  } catch (error) {
    dispatch(
      orderDetailsActions.setOrderDetailsFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const getClientSecret =
  (setClientSecret, price) => async (dispatch, getState) => {
    try {
      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${rootUrl}/order/create-payment-intent`,
        { price },
        config
      );
      setClientSecret(data.clientSecret);
    } catch (error) {}
  };

export const payOrder =
  (id, paymentInfo, setPaymentStatus) => async (dispatch, getState) => {
    try {
      setPaymentStatus({ success: "", error: "" });
      dispatch(orderPayActions.setOrderPayRequest());

      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.put(
        `${rootUrl}/order/pay/${id}`,
        paymentInfo,
        config
      );

      dispatch(orderPayActions.setOrderPaySuccess());
      dispatch(orderDetailsActions.setOrderDetails(data));
      setPaymentStatus({ success: "Payment successful!", error: "" });
    } catch (error) {
      setPaymentStatus({
        success: "",
        error: error.response ? error.response.data.message : error.message,
      });
      dispatch(
        orderPayActions.setOrderPayFail(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };

export const payOrderWithSSL =
  (payInfo, setStatus) => async (dispatch, getState) => {
    try {
      setStatus({ error: "", loading: true });
      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${rootUrl}/order/create-payment-ssl`,
        payInfo,
        config
      );
      console.log(data);
      setStatus({ error: "", loading: false });
      window.location.replace(data);
    } catch (error) {
      setStatus({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  };

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliveredActions.setAdminOrderDeliveredRequest());

    const {
      userLogin: {
        userInfo: { token },
      },
      orderList: { orders },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.put(
      `${rootUrl}/order/admin/update-as-delivered/${id}`,
      {},
      config
    );

    if (orders) {
      const index = orders.findIndex((order) => order._id === data._id);
      orders.splice(index, 1, data);
      dispatch(orderListActions.setAdminOrderListSuccess(orders));
    }

    dispatch(orderDeliveredActions.setAdminOrderDeliveredSuccess());
    dispatch(orderDetailsActions.setOrderDetails(data));
  } catch (error) {
    dispatch(
      orderDeliveredActions.setAdminOrderDeliveredFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const resetDeliverState = () => (dispatch) => {
  dispatch(orderDeliveredActions.resetAdminOrderDeliveredState());
};

export const resetOrderPay = () => (dispatch) => {
  dispatch(orderPayActions.resetOrderPay());
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(myOrderActions.setMyOrderListRequest());
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`${rootUrl}/order/get-my-orders`, config);
    dispatch(myOrderActions.setMyOrderListSuccess(data));
  } catch (error) {
    dispatch(
      myOrderActions.setMyOrderListFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const getAllOrder =
  (pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch(orderListActions.setAdminOrderListRequest());
      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.get(
        `${rootUrl}/order/admin/get-all?page=${pageNumber}&limit=${20}`,
        config
      );
      dispatch(orderListActions.setAdminOrderListSuccess(data));
    } catch (error) {
      dispatch(
        orderListActions.setAdminOrderListFail(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };
