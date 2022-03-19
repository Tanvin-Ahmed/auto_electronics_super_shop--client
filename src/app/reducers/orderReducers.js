import {
	MY_ORDER_LIST_FAIL,
	MY_ORDER_LIST_REQUEST,
	MY_ORDER_LIST_SUCCESS,
	MY_ORDER_LIST_RESET,
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
	ADMIN_ORDER_LIST_REQUEST,
	ADMIN_ORDER_LIST_SUCCESS,
	ADMIN_ORDER_LIST_FAIL,
	ADMIN_ORDER_DELIVERED_REQUEST,
	ADMIN_ORDER_DELIVERED_SUCCESS,
	ADMIN_ORDER_DELIVERED_FAIL,
	ADMIN_ORDER_DELIVERED_RESET,
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
			return { ...state, loading: true, error: "" };

		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				order: action.payload,
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
	shippingAddress: {},
	order: {},
	error: "",
};

export const orderDetailsReducer = (state = initialStateForDetails, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true, error: "" };

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
			return { loading: true, error: "" };

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
			return initialStateForPay;

		default:
			return state;
	}
};

const initialStateForDeliver = {
	loading: false,
	success: false,
	error: "",
};

export const orderDeliveredReducer = (
	state = initialStateForDeliver,
	action
) => {
	switch (action.type) {
		case ADMIN_ORDER_DELIVERED_REQUEST:
			return { loading: true, error: "" };

		case ADMIN_ORDER_DELIVERED_SUCCESS:
			return { ...state, loading: false, success: true };

		case ADMIN_ORDER_DELIVERED_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		case ADMIN_ORDER_DELIVERED_RESET:
			return initialStateForDeliver;

		default:
			return state;
	}
};

const myOrderInitial = {
	myOrders: [],
	error: "",
	loading: false,
};

export const myOrderReducer = (state = myOrderInitial, action) => {
	switch (action.type) {
		case MY_ORDER_LIST_REQUEST:
			return { loading: true, error: "" };

		case MY_ORDER_LIST_SUCCESS:
			return { ...state, loading: false, myOrders: action.payload };

		case MY_ORDER_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case MY_ORDER_LIST_RESET:
			return myOrderInitial;

		default:
			return state;
	}
};

const orderListInitial = {
	orders: [],
	error: "",
	loading: false,
};

export const orderListReducer = (state = orderListInitial, action) => {
	switch (action.type) {
		case ADMIN_ORDER_LIST_REQUEST:
			return { loading: true, error: "" };

		case ADMIN_ORDER_LIST_SUCCESS:
			return { ...state, loading: false, orders: action.payload };

		case ADMIN_ORDER_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
