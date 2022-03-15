import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
} from "../types";

const api = "http://localhost:5000";

export const listProducts = () => async dispatch => {
	dispatch({ type: PRODUCT_LIST_REQUEST });

	try {
		const { data } = await axios.get(`${api}/product/get-many/${10}/${1}`);

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error?.response?.data?.message || error.message,
		});
	}
};

export const listProductDetails = id => async dispatch => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST });

	try {
		const { data } = await axios.get(`${api}/product/get-single/${id}`);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error?.response?.data?.message || error.message,
		});
	}
};

export const deleteProduct = id => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });
		const {
			userLogin: {
				userInfo: { token },
			},
			productList: { products },
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.delete(
			`${api}/product/admin/delete-single/${id}`,
			config
		);
		const updatedList = products.filter(p => p._id !== data._id);
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: updatedList });
		dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};

export const updateProduct = productInfo => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_UPDATE_REQUEST });

		const {
			userLogin: {
				userInfo: { token },
			},
			productList: { products },
		} = getState();

		const config = { headers: { Authorization: `Bearer ${token}` } };

		const { data } = await axios.put(
			`${api}/product/admin/update/${productInfo._id}`,
			productInfo,
			config
		);

		const findIndex = products.findIndex(u => u._id === data._id);
		products.splice(findIndex, 1, data);

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
		dispatch({ type: PRODUCT_UPDATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: error.response ? error.response.data.message : error.message,
		});
	}
};
