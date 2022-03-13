import axios from "axios";
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
} from "../types";

const rootUrl = "http://localhost:5000";

export const createOrder = info => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.post(
			`${rootUrl}/order/make-order`,
			info,
			config
		);

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const getOrderDetails = id => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.get(`${rootUrl}/order/get/${id}`, config);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const getClientSecret =
	(setClientSecret, price) => async (dispatch, getState) => {
		try {
			const {
				userLogin: {
					userInfo: { token },
				},
			} = getState();
			const config = { headers: { Authorization: `Bearer ${token}` } };

			const { data } = await axios.post(
				`${rootUrl}/order/create-payment-intent`,
				{ price },
				config
			);
			setClientSecret(data.clientSecret);
		} catch (error) {}
	};

export const payOrder =
	(id, paymentInfo, setPaymentStatus) => async (dispatch, getState) => {
		try {
			setPaymentStatus({ success: "", error: "" });
			dispatch({ type: ORDER_PAY_REQUEST });

			const {
				userLogin: {
					userInfo: { token },
				},
			} = getState();

			const config = { headers: { Authorization: `Bearer ${token}` } };

			const { data } = await axios.put(
				`${rootUrl}/order/pay/${id}`,
				paymentInfo,
				config
			);

			dispatch({ type: ORDER_PAY_SUCCESS });
			dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
			setPaymentStatus({ success: "Payment successful!", error: "" });
		} catch (error) {
			setPaymentStatus({
				success: "",
				error: error.response ? error.response.data.message : error.message,
			});
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: error.response ? error.response.data.message : error.message,
			});
		}
	};

export const resetOrderPay = () => dispatch => {
	dispatch({ type: ORDER_PAY_RESET });
};
