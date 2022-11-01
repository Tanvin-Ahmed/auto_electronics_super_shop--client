import { createSlice } from "@reduxjs/toolkit";

export const productReducer = createSlice({
  name: "productReducer",
  initialState: {
    products: [],
    pages: "",
    page: "",
    loading: false,
    error: "",
  },

  reducers: {
    setGetProductListRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setProductList: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    setGetProductListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const topRatedProductReducer = createSlice({
  name: "topRatedProductReducer",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
  reducers: {
    setGetTopRatedProductListRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },

    setTopRatedProductList: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },

    setGetTopRatedProductListFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const productDetailsReducer = createSlice({
  name: "productDetailsReducer",
  initialState: {
    product: {},
    loading: false,
    error: "",
  },
  reducers: {
    setGetProductDetailsRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },

    setProductDetails: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },

    setGetProductDetailsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const productDeleteReducer = createSlice({
  name: "productDeleteReducer",
  initialState: {
    success: false,
    loading: false,
    error: "",
  },

  reducers: {
    setProductDeleteRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setProductDeleteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setProductDeleteFail: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.loading = false;
    },
  },
});

export const productUpdateReducer = createSlice({
  name: "productUpdateReducer",
  initialState: {
    success: false,
    loading: false,
    error: "",
  },
  reducers: {
    setProductUpdateRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setProductUpdateSuccss: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setProductUpdateFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetProductUpdate: (state, action) => {
      state = {
        success: false,
        loading: false,
        error: "",
      };
    },
  },
});

export const productCreateReducer = createSlice({
  name: "productCreateReducer",
  initialState: {
    success: false,
    loading: false,
    error: "",
  },
  reducers: {
    setProductCreateRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setProductCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setProductCreateFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetProductCreateState: (state, action) => {
      state = {
        success: false,
        loading: false,
        error: "",
      };
    },
  },
});

export const productCreateReviewReducer = createSlice({
  name: "productCreateReviewReducer",
  initialState: {
    success: false,
    loading: false,
    error: "",
  },
  reducers: {
    setProductCreateReviewRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setProductCreateReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setProductCreateReviewFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetProductCreateReviewState: (state, action) => {
      state = {
        success: false,
        loading: false,
        error: "",
      };
    },
  },
});
