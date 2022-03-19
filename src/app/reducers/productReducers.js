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
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	TOP_RATED_PRODUCT_LIST_REQUEST,
	TOP_RATED_PRODUCT_LIST_SUCCESS,
	TOP_RATED_PRODUCT_LIST_FAIL,
} from "../types";

const productState = {
	products: [],
	pages: "",
	page: "",
	loading: false,
	error: "",
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			};

		case PRODUCT_LIST_FAIL:
			return { ...state, error: action.payload, loading: false };

		default:
			return state;
	}
};

const topRatedProductState = {
	products: [],
	loading: false,
	error: "",
};

export const topRatedProductReducer = (
	state = topRatedProductState,
	action
) => {
	switch (action.type) {
		case TOP_RATED_PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, error: "" };

		case TOP_RATED_PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
			};

		case TOP_RATED_PRODUCT_LIST_FAIL:
			return { ...state, error: action.payload, loading: false };

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
			return { ...state, error: action.payload, loading: false };

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
			return {
				...state,
				error: action.payload,
				success: false,
				loading: false,
			};

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
			return {
				error: action.payload,
				success: false,
				loading: false,
			};

		case PRODUCT_UPDATE_RESET:
			return productUpdateState;

		default:
			return state;
	}
};

const productCreateState = {
	success: false,
	loading: false,
	error: "",
};

export const productCreateReducer = (state = productCreateState, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};

		case PRODUCT_CREATE_FAIL:
			return {
				error: action.payload,
				success: false,
				loading: false,
			};

		case PRODUCT_CREATE_RESET:
			return productCreateState;

		default:
			return state;
	}
};

const productCreateReviewState = {
	success: false,
	loading: false,
	error: "",
};

export const productCreateReviewReducer = (
	state = productCreateReviewState,
	action
) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { ...state, loading: true, error: "" };

		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};

		case PRODUCT_CREATE_REVIEW_FAIL:
			return {
				error: action.payload,
				success: false,
				loading: false,
			};

		case PRODUCT_CREATE_REVIEW_RESET:
			return productCreateReviewState;

		default:
			return state;
	}
};
