import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../types";

const rootUrl = "http://localhost:5000";

const addDataInLocalStorage = data => {
	localStorage.setItem("cartItems", JSON.stringify(data));
};

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

		addDataInLocalStorage(getState().cart.cartItems);
	} catch (error) {
		console.log(error.message);
	}
};

export const removeFromCart = id => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: { id },
	});

	addDataInLocalStorage(getState().cart.cartItems);
};
