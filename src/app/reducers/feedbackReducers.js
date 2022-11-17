import { createSlice } from "@reduxjs/toolkit";

export const feedbacksReducer = createSlice({
  name: "feedbacksReducer",
  initialState: {
    loading: false,
    error: "",
    feedbacks: [],
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
