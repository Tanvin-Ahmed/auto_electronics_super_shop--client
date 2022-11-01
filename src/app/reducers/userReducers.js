import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  loading: false,
  error: "",
};

export const userLoginReducer = createSlice({
  name: "userLoginReducer",
  initialState,
  reducers: {
    setUserLoginRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setUserLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    setUserLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserLogout: (state, action) => {
      state.userInfo = {};
    },
  },
});

export const userRegisterReducer = createSlice({
  name: "userRegisterReducer",
  initialState,
  reducers: {
    setUserRegisterRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setUserRegisterSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    setUserRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const initialStateForUserDetails = {
  user: {},
  loading: false,
  error: "",
};

export const userDetailsReducer = createSlice({
  name: "userDetailsReducer",
  initialState: initialStateForUserDetails,
  reducers: {
    setUserDetailsRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },

    setUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    setUserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserDetailsState: (state, action) => {
      state = initialStateForUserDetails;
    },
  },
});

export const updateUserReducer = createSlice({
  name: "updateUserReducer",
  initialState: {
    userInfo: {},
    loading: false,
    success: false,
    error: "",
  },
  reducers: {
    setUpdateUserProfileRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setUpdateUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    setUpdateUserProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

const initialStateForUserList = {
  users: [],
  loading: false,
  error: "",
  pages: 1,
  page: 1,
};

export const userListReducer = createSlice({
  name: "userListReducer",
  initialState: initialStateForUserList,
  reducers: {
    setUserListRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setUserListSuccess: (state, action) => {
      state.error = "";
      state.loading = false;
      state.users = action.payload.users;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    },
    setUserListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserListState: (state, action) => {
      state = initialStateForUserList;
    },
  },
});

export const userDeleteReducer = createSlice({
  name: "userDeleteReducer",
  initialState: {
    success: false,
    loading: false,
    error: "",
  },
  reducers: {
    setUserDeleteRequest: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = "";
    },
    setUserDeleteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setUserDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

const initForUserUpdate = {
  success: false,
  loading: false,
  error: "",
};

export const userUpdateReducer = createSlice({
  name: "userUpdateReducer",
  initialState: initForUserUpdate,
  reducers: {
    setUserUpdateRequest: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = "";
    },
    setUserUpdateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    setUserUpdateFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetUserUpdateState: (state, action) => {
      state = initForUserUpdate;
    },
  },
});
