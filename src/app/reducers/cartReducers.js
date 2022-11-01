import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  error: "",
  shippingAddress: {},
  paymentMethod: "",
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    setItemInCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === item.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload.id
      );
    },
    setCartSaveShoppingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setCartSavePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetCart: (state, action) => {
      state = initialState;
    },
  },
});

export default cartReducer;
