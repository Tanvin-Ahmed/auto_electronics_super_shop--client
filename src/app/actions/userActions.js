import axios from "axios";
import cartReducer from "../reducers/cartReducers";
import { myOrderReducer } from "../reducers/orderReducers";
import {
  updateUserReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "../reducers/userReducers";

const { actions: userLoginActions } = userLoginReducer;
const { actions: userRegisterActions } = userRegisterReducer;
const { actions: userDetailsActions } = userDetailsReducer;
const { actions: updateUserActions } = updateUserReducer;
const { actions: userListActions } = userListReducer;
const { actions: userDeleteActions } = userDeleteReducer;
const { actions: userUpdateActions } = userUpdateReducer;
const { actions: cartActions } = cartReducer;
const { actions: myOrderActions } = myOrderReducer;

const api = "https://auto-electronic-server.vercel.app";

export const login = (info, navigate, from) => async (dispatch) => {
  try {
    dispatch(userLoginActions.setUserLoginRequest());

    const { data } = await axios.post(`${api}/users/login`, info);

    dispatch(userLoginActions.setUserLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate(from);
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message;
    dispatch(userLoginActions.setUserLoginFail(msg));
  }
};

export const register = (info, navigate, from) => async (dispatch) => {
  try {
    dispatch(userRegisterActions.setUserRegisterRequest());

    const { data } = await axios.post(`${api}/users/register`, info);

    dispatch(userRegisterActions.setUserRegisterSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate(from);
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message;
    dispatch(userRegisterActions.setUserRegisterFail(msg));
  }
};

export const getUserDetails =
  (id = "") =>
  async (dispatch, getState) => {
    try {
      dispatch(userDetailsActions.setUserDetailsRequest());

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

      dispatch(userDetailsActions.setUserDetailsSuccess(data));
    } catch (error) {
      const msg = error.response ? error.response.data.message : error.message;
      dispatch(userDetailsActions.setUserDetailsFail(msg));
    }
  };

export const updateUserProfile = (info) => async (dispatch, getState) => {
  try {
    dispatch(updateUserActions.setUpdateUserProfileRequest());

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.put(`${api}/users/update`, info, config);

    dispatch(updateUserActions.setUpdateUserProfileSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message;
    dispatch(updateUserActions.setUpdateUserProfileFail(msg));
  }
};

// * admin
export const getUserList =
  (pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch(userListActions.setUserListRequest());

      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.get(
        `${api}/users/admin/all?page=${pageNumber}&limit=${20}`,
        config
      );

      dispatch(userListActions.setUserListSuccess(data));
    } catch (error) {
      const msg = error.response ? error.response.data.message : error.message;
      dispatch(userListActions.setUserListFail(msg));
    }
  };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteActions.setUserDeleteRequest());

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

    const updatedUserList = users.filter((user) => user._id !== data._id);
    dispatch(userListActions.setUserListSuccess(updatedUserList));
    dispatch(userDeleteActions.setUserDeleteSuccess());
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message;
    dispatch(userDeleteActions.setUserDeleteFail(msg));
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateActions.setUserUpdateRequest());

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
    const findIndex = users.findIndex((u) => u._id === data._id);
    users.splice(findIndex, 1, data);

    dispatch(userListActions.setUserListSuccess(users));
    dispatch(userDetailsActions.setUserDetailsSuccess(data));
    dispatch(userUpdateActions.setUserUpdateSuccess());
  } catch (error) {
    const msg = error.response ? error.response.data.message : error.message;
    dispatch(userUpdateActions.setUserUpdateFail(msg));
  }
};

export const resetUserUpdateStates = () => (dispatch) => {
  dispatch(userUpdateActions.resetUserUpdateState());
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLoginActions.setUserLogout());
  dispatch(userDetailsActions.resetUserDetailsState());
  dispatch(myOrderActions.resetMyOrderListState());
  dispatch(userListActions.resetUserListState());
  dispatch(cartActions.resetCart());
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

    dispatch(
      userLoginActions.setUserLoginSuccess({ ...userInfo, token: data })
    );
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, token: data })
    );
  } catch (error) {
    if (error.response && error.response.data.message === "jwt expired") {
      localStorage.removeItem("userInfo");
      dispatch(userLoginActions.setUserLoginSuccess({}));
    }
  }
};
