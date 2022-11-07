import { createSlice } from "@reduxjs/toolkit";

const feedbackInitialState = {
  feedbacks: [],
};

export const feedbacksReducer = createSlice({
  name: "feedbacksReducer",
  initialState: {
    loading: false,
    error: "",
    ...feedbackInitialState,
  },

  reducers: {
    setFedbacksRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setFeedbackSuccess: (state, action) => {
      state.loading = false;
      state.feedbacks = [action.payload, ...state.feedbacks];
    },
    setFeedbackFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const feedbackListReducer = createSlice({
  name: "feedbackListReducer",
  initialState: {
    loading: false,
    error: "",
    ...feedbackInitialState,
  },

  reducers: {
    setFedbacksRequest: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    setFeedbackSuccess: (state, action) => {
      state.loading = false;
      state.feedbacks = action.payload;
    },
    setFeedbackFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
