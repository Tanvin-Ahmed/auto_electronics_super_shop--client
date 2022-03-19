import axios from "axios";
import {
	CART_SAVE_RESET,
	MY_ORDER_LIST_RESET,
	UPDATE_USER_PROFILE_FAIL,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
} from "../types";

const api = "http://localhost:5000";

export const login = (info, navigate, from) => async dispatch => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const { data } = await axios.post(`${api}/users/login`, info);

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

		const { data } = await axios.post(`${api}/users/register`, info);

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

export const getUserDetails =
	(id = "") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_DETAILS_REQUEST });

			const {
				userLogin: {
					userInfo: { token, _id },
				},
			} = getState();

			const config = { headers: { Authorization: `Bearer ${token}` } };

			const { data } = await axios.get(
				`${api}/users/profile/${id ? id : _id}`,
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

		const { data } = await axios.put(`${api}/users/update`, info, config);

		dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: UPDATE_USER_PROFILE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const getUserList = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.get(`${api}/users/admin/all`, config);

		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const deleteUser = id => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.delete(
			`${api}/users/admin/delete/${id}`,
			config
		);

		const {
			userList: { users },
		} = getState();

		const updatedUserList = users.filter(user => user._id !== data._id);
		dispatch({ type: USER_LIST_SUCCESS, payload: updatedUserList });
		dispatch({ type: USER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const updateUser = user => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.put(
			`${api}/users/admin/update/${user._id}`,
			user,
			config
		);

		const { users } = getState().userList;
		const findIndex = users.findIndex(u => u._id === data._id);
		users.splice(findIndex, 1, data);

		dispatch({ type: USER_LIST_SUCCESS, payload: users });
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
		dispatch({ type: USER_UPDATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const resetUserUpdateStates = () => dispatch => {
	dispatch({ type: USER_UPDATE_RESET });
};

export const logout = () => dispatch => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: MY_ORDER_LIST_RESET });
	dispatch({ type: USER_LIST_RESET });
	dispatch({ type: CART_SAVE_RESET });
};

export const refreshToken = () => async (dispatch, getState) => {
	try {
		const {
			userLogin: { userInfo },
		} = getState();

		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

		const { data } = await axios.post(
			`${api}/users/refresh-token`,
			{ token: userInfo.token },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: { ...userInfo, token: data },
		});
		localStorage.setItem(
			"userInfo",
			JSON.stringify({ ...userInfo, token: data })
		);
	} catch (error) {
		if (error.response && error.response.data.message === "jwt expired") {
			localStorage.removeItem("userInfo");
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: {},
			});
		}
	}
};
