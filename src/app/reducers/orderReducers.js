import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
} from "../types";

const initialState = {
	loading: false,
	success: false,
	order: {},
	error: "",
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { ...state, loading: true };

		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				orderItems: action.payload,
			};

		case ORDER_CREATE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

const initialStateForDetails = {
	loading: true,
	orderItems: [],
	shippingAddress: {},
	order: {},
	error: "",
};

export const orderDetailsReducer = (state = initialStateForDetails, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };

		case ORDER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

const initialStateForPay = {
	loading: false,
	success: false,
	error: "",
};

export const orderPayReducer = (state = initialStateForPay, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };

		case ORDER_PAY_SUCCESS:
			return { ...state, loading: false, success: true };

		case ORDER_PAY_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		case ORDER_PAY_RESET:
			return { loading: false, success: false, error: "" };

		default:
			return state;
	}
};
