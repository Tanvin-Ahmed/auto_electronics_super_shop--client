import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
} from "../types";

const productState = {
	products: [],
	loading: false,
	error: "",
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true };

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
			return { ...state, loading: true };

		case PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, product: action.payload };

		case PRODUCT_DETAILS_FAIL:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};
