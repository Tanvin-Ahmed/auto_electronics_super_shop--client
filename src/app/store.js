import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReducer,
  productCreateReviewReducer,
  topRatedProductReducer,
} from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  myOrderReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderReducer,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
  productList: productReducer.reducer,
  topRatedProductList: topRatedProductReducer.reducer,
  productDetails: productDetailsReducer.reducer,
  productDelete: productDeleteReducer.reducer,
  productUpdate: productUpdateReducer.reducer,
  productCreate: productCreateReducer.reducer,
  productReviewCreate: productCreateReviewReducer.reducer,
  cart: cartReducer.reducer,
  userLogin: userLoginReducer.reducer,
  userRegister: userRegisterReducer.reducer,
  userDetails: userDetailsReducer.reducer,
  updateUserProfile: updateUserReducer.reducer,
  userList: userListReducer.reducer,
  userDelete: userDeleteReducer.reducer,
  userUpdate: userUpdateReducer.reducer,
  order: orderReducer.reducer,
  orderDetails: orderDetailsReducer.reducer,
  orderPay: orderPayReducer.reducer,
  orderDeliver: orderDeliveredReducer.reducer,
  myOrderList: myOrderReducer.reducer,
  orderList: orderListReducer.reducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
