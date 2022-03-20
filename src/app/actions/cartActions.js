import axios from "axios";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from "../types";

const rootUrl = "https://supershop-server.herokuapp.com";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(`${rootUrl}/product/get-single/${id}`);

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty: Number(qty),
			},
		});

		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cart.cartItems)
		);
	} catch (error) {
		console.log(error.message);
	}
};

export const removeFromCart = id => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: { id },
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = address => dispatch => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: address,
	});
	localStorage.setItem("shippingAddress", JSON.stringify(address));
};

export const savePaymentMethod = method => dispatch => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: method,
	});
	localStorage.setItem("paymentMethod", JSON.stringify(method));
};
