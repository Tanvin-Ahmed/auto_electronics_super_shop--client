import axios from "axios";
import cartReducer from "../reducers/cartReducers";

const { actions: CartActions } = cartReducer;

const rootUrl = "https://auto-electronic-server.vercel.app";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${rootUrl}/product/get-single/${id}`);

    dispatch(
      CartActions.setItemInCart({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty),
      })
    );

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(CartActions.removeCartItem({ id }));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address) => (dispatch) => {
  dispatch(CartActions.setCartSaveShoppingAddress(address));
  localStorage.setItem("shippingAddress", JSON.stringify(address));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch(CartActions.setCartSavePaymentMethod(method));
  localStorage.setItem("paymentMethod", JSON.stringify(method));
};
