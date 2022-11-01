import axios from "axios";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReducer,
  productUpdateReducer,
  topRatedProductReducer,
} from "../reducers/productReducers";

const { actions: productListActions } = productReducer;
const { actions: topRatedProductListAction } = topRatedProductReducer;
const { actions: productDetailsActions } = productDetailsReducer;
const { actions: productDeleteActions } = productDeleteReducer;
const { actions: productUpdateActions } = productUpdateReducer;
const { actions: productCreateActions } = productCreateReducer;
const { actions: productCreateReviewActions } = productCreateReviewReducer;

const api = "http://localhost:5000";

export const listProducts =
  (keyword = "", pageNumber = 1) =>
  async (dispatch) => {
    dispatch(productListActions.setGetProductListRequest());

    try {
      const { data } = await axios.get(
        `${api}/product/get-many/${20}/${pageNumber}?keyword=${keyword}`
      );

      dispatch(productListActions.setProductList(data));
    } catch (error) {
      dispatch(
        productListActions.setGetProductListFail(
          error?.response?.data?.message || error.message
        )
      );
    }
  };

export const listTopProducts = () => async (dispatch) => {
  dispatch(topRatedProductListAction.setGetTopRatedProductListRequest());

  try {
    const { data } = await axios.get(`${api}/product/get-top-rated`);

    dispatch(topRatedProductListAction.setTopRatedProductList(data));
  } catch (error) {
    dispatch(
      topRatedProductListAction.setGetTopRatedProductListFail(
        error?.response?.data?.message || error.message
      )
    );
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  dispatch(productDetailsActions.setGetProductDetailsRequest());

  try {
    const { data } = await axios.get(`${api}/product/get-single/${id}`);

    dispatch(productDetailsActions.setProductDetails(data));
  } catch (error) {
    dispatch(
      productDetailsActions.setGetProductDetailsFail(
        error?.response?.data?.message || error.message
      )
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteActions.setProductDeleteRequest());
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
    const updatedList = products.filter((p) => p._id !== data._id);
    dispatch(productListActions.setProductList(updatedList));
    dispatch(productDeleteActions.setProductDeleteSuccess());
  } catch (error) {
    dispatch(
      productDeleteActions.setProductDeleteFail(
        error?.response?.data?.message || error.message
      )
    );
  }
};

export const updateProduct =
  (productInfo, closeModal) => async (dispatch, getState) => {
    try {
      resetCreateProductState();
      resetUpdateProductState();
      dispatch(productUpdateActions.setProductUpdateRequest());

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

      const findIndex = products.findIndex((p) => p._id === data._id);
      products.splice(findIndex, 1, data);

      dispatch(productUpdateActions.setProductUpdateSuccss());
      dispatch(productListActions.setProductList(products));
      dispatch(productDetailsActions.setProductDetails(data));
      setTimeout(() => {
        closeModal();
        resetCreateProductState();
        resetUpdateProductState();
      }, 1500);
    } catch (error) {
      dispatch(
        productUpdateActions.setProductUpdateFail(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };

export const createProduct =
  (productInfo, base64, closeModal) => async (dispatch, getState) => {
    try {
      resetCreateProductState();
      resetUpdateProductState();
      dispatch(productCreateActions.setProductCreateRequest());

      const {
        userLogin: { userInfo },
        productList: { products },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const { data: imageData } = await axios.post(
        `${api}/product/admin/upload-image`,
        { data: base64 },
        config
      );

      productInfo.image = imageData.secure_url;

      const { data } = await axios.post(
        `${api}/product/admin/add`,
        { ...productInfo, admin: userInfo._id },
        config
      );
      dispatch(productCreateActions.setProductCreateSuccess());

      const newProductList = [...products, data];

      dispatch(productListActions.setProductList(newProductList));
      setTimeout(() => {
        closeModal();
        resetCreateProductState();
        resetUpdateProductState();
      }, 1500);
    } catch (error) {
      dispatch(
        productCreateActions.setProductCreateFail(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };

export const createProductReview =
  (reviewInfo, productId) => async (dispatch, getState) => {
    try {
      resetUpdateProductState();
      dispatch(productCreateReviewActions.setProductCreateReviewRequest());

      const {
        userLogin: {
          userInfo: { token },
        },
        productList: { products },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.put(
        `${api}/product/add-review/${productId}`,
        reviewInfo,
        config
      );

      const findIndex = products.findIndex((p) => p._id === data._id);
      products.splice(findIndex, 1, data);

      dispatch(productCreateReviewActions.setProductCreateReviewSuccess());
      dispatch(productListActions.setProductList(products));
      dispatch(productDetailsActions.setProductDetails(data));
      setTimeout(() => {
        resetUpdateProductState();
      }, 1500);
    } catch (error) {
      dispatch(
        productCreateReviewActions.setProductCreateReviewFail(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };

export const resetCreateReviewState = () => (dispatch) => {
  dispatch(productCreateReviewActions.resetProductCreateReviewState());
};

export const resetCreateProductState = () => (dispatch) => {
  dispatch(productCreateActions.resetProductCreateState());
};

export const resetUpdateProductState = () => (dispatch) => {
  dispatch(productUpdateActions.resetProductUpdate());
};
