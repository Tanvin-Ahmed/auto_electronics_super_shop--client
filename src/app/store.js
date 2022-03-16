import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productReducer,
	productDetailsReducer,
	productDeleteReducer,
	productUpdateReducer,
	productCreateReducer,
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
	productList: productReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productUpdate: productUpdateReducer,
	productCreate: productCreateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	updateUserProfile: updateUserReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	order: orderReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliveredReducer,
	myOrderList: myOrderReducer,
	orderList: orderListReducer,
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

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
