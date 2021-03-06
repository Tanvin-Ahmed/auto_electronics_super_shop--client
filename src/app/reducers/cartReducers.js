import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_RESET,
	CART_SAVE_SHIPPING_ADDRESS,
} from "../types";

const initialState = {
	cartItems: [],
	loading: false,
	error: "",
	shippingAddress: {},
	paymentMethod: "",
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(x => x.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(x =>
						x.product === item.product ? item : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(x => x.product !== action.payload.id),
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};

		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};

		case CART_SAVE_RESET:
			return initialState;

		default:
			return state;
	}
};

export default cartReducer;
