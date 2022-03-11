import axios from "axios";
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

const rootUrl = "http://localhost:5000";

export const login = (info, navigate, from) => async dispatch => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const { data } = await axios.post(`${rootUrl}/users/login`, info);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
		navigate(from);
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const register = (info, navigate, from) => async dispatch => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const { data } = await axios.post(`${rootUrl}/users/register`, info);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
		navigate(from);
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const getUserDetails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const {
			userLogin: {
				userInfo: { token, email },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.get(
			`${rootUrl}/users/profile/${email}`,
			config
		);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const updateUserProfile = info => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.put(`${rootUrl}/users/update`, info, config);

		dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: UPDATE_USER_PROFILE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const logout = () => dispatch => {
	localStorage.removeItem("userInfo");
	dispatch(dispatch({ type: USER_LOGOUT }));
};

export const refreshToken = () => async (dispatch, getState) => {
	try {
		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.post(
			`${rootUrl}/users/refresh-token`,
			token,
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};
