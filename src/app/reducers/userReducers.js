import {
	UPDATE_USER_PROFILE_FAIL,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "../types";

const initialState = {
	userInfo: {},
	loading: false,
	error: "",
};

export const userLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true, error: "" };

		case USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };

		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };

		case USER_LOGOUT:
			return { ...state, userInfo: {} };

		default:
			return state;
	}
};

export const userRegisterReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true, error: "" };

		case USER_REGISTER_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };

		case USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

const initialStateForUserDetails = {
	user: {},
	loading: false,
	error: "",
};

export const userDetailsReducer = (
	state = initialStateForUserDetails,
	action
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true, error: "" };

		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case USER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

const initialStateForUserUpdate = {
	userInfo: {},
	loading: false,
	success: false,
	error: "",
};

export const updateUserReducer = (
	state = initialStateForUserUpdate,
	action
) => {
	switch (action.type) {
		case UPDATE_USER_PROFILE_REQUEST:
			return { ...state, loading: true, error: "" };

		case UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: action.payload,
				success: true,
			};

		case UPDATE_USER_PROFILE_FAIL:
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
