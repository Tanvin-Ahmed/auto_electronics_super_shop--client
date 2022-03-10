import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productReducer,
	productDetailsReducer,
} from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	updateUserReducer,
} from "./reducers/userReducers";

const rootReducer = combineReducers({
	productList: productReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	updateUserProfile: updateUserReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? { cartItems: [...JSON.parse(localStorage.getItem("cartItems"))] }
	: { cartItems: [] };

const userInfoFromStorage = localStorage.getItem("userInfo")
	? { userInfo: JSON.parse(localStorage.getItem("userInfo")) }
	: { userInfo: {} };

const initialState = {
	cart: cartItemsFromStorage,
	userLogin: userInfoFromStorage,
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
