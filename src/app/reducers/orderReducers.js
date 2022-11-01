import { createSlice } from "@reduxjs/toolkit";

export const orderReducer = createSlice({
  name: "orderReducer",
  initialState: {
    loading: false,
    success: false,
    order: {},
    error: "",
  },
  reducers: {
    setOrderCreateRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setOrderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    setOrderCreateFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const orderDetailsReducer = createSlice({
  name: "orderDetailsReducer",
  initialState: {
    loading: true,
    shippingAddress: {},
    order: {},
    error: "",
  },
  reducers: {
    setOrderDetailsRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setOrderDetails: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    setOrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderPayReducer = createSlice({
  name: "orderPayReducer",
  initialState: {
    loading: false,
    success: false,
    error: "",
  },

  reducers: {
    setOrderPayRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setOrderPaySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setOrderPayFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetOrderPay: (state, action) => {
      state = {
        loading: false,
        success: false,
        error: "",
      };
    },
  },
});

export const orderDeliveredReducer = createSlice({
  name: "orderDeliveredReducer",
  initialState: {
    loading: false,
    success: false,
    error: "",
  },
  reducers: {
    setAdminOrderDeliveredRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setAdminOrderDeliveredSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setAdminOrderDeliveredFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetAdminOrderDeliveredState: (state, action) => {
      state = {
        loading: false,
        success: false,
        error: "",
      };
    },
  },
});

export const myOrderReducer = createSlice({
  name: "myOrderReducer",
  initialState: {
    myOrders: [],
    error: "",
    loading: false,
  },
  reducers: {
    setMyOrderListRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setMyOrderListSuccess: (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
    },
    setMyOrderListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetMyOrderListState: (state, action) => {
      state = {
        myOrders: [],
        error: "",
        loading: false,
      };
    },
  },
});

export const orderListReducer = createSlice({
  name: "orderListReducer",
  initialState: {
    orders: [],
    error: "",
    loading: false,
    pages: 1,
    page: 1,
  },
  reducers: {
    setAdminOrderListRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setAdminOrderListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    setAdminOrderListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
