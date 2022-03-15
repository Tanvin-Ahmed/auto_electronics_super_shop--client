import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
} from "../types";

const productState = {
	products: [],
	loading: false,
	error: "",
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_LIST_SUCCESS:
			return { ...state, loading: false, products: action.payload };

		case PRODUCT_LIST_FAIL:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const productDetailsState = {
	product: {},
	loading: false,
	error: "",
};

export const productDetailsReducer = (state = productDetailsState, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, product: action.payload };

		case PRODUCT_DETAILS_FAIL:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const productDeleteState = {
	success: false,
	loading: false,
	error: "",
};

export const productDeleteReducer = (state = productDeleteState, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_DELETE_SUCCESS:
			return { ...state, loading: false, success: true };

		case PRODUCT_DELETE_FAIL:
			return { ...state, error: action.payload, success: false };

		default:
			return state;
	}
};

const productUpdateState = {
	success: false,
	loading: false,
	error: "",
};

export const productUpdateReducer = (state = productUpdateState, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_UPDATE_SUCCESS:
			return { ...state, loading: false, success: true };

		case PRODUCT_UPDATE_FAIL:
			return { ...state, error: action.payload, success: false };

		default:
			return state;
	}
};
