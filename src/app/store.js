import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productReducer,
	productDetailsReducer,
} from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducers";

const rootReducer = combineReducers({
	productList: productReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? { cartItems: [...JSON.parse(localStorage.getItem("cartItems"))] }
	: { cartItems: [] };

const initialState = {
	cart: cartItemsFromStorage,
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
