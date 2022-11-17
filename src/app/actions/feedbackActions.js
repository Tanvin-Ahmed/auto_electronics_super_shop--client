import { feedbacksReducer } from "../reducers/feedbackReducers";
import axios from "axios";
import { userLoginReducer } from "../reducers/userReducers";
import _ from "lodash";

const { actions: feedbackActions } = feedbacksReducer;
const { actions: userActions } = userLoginReducer;

const rootUrl = "https://supershop-server.herokuapp.com/feedback";

export const addFeedback = (details) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    const { feedbacks } = getState().feedbackList;
    dispatch(feedbackActions.setFedbacksRequest());
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.post(
      `${rootUrl}/create-feedback`,
      details,
      config
    );

    const updatedUserInfo = {
      ...userInfo,
      feedback: {
        _id: data._id,
        rating: data.rating,
        opinion: data.opinion,
      },
    };

    dispatch(userActions.setUserLoginSuccess(updatedUserInfo));
    dispatch(feedbackActions.setFeedbackSuccess([data, ...feedbacks]));
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  } catch (error) {
    dispatch(
      feedbackActions.setFeedbackFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const getFeedbacks = () => async (dispatch) => {
  try {
    dispatch(feedbackActions.setFedbacksRequest());
    const { data } = await axios(`${rootUrl}/get-feedbacks`);
    dispatch(feedbackActions.setFeedbackSuccess(data));
  } catch (error) {
    dispatch(
      feedbackActions.setFeedbackFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const udateFeedback = (updatedDetails) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    dispatch(feedbackActions.setFedbacksRequest());

    const { data } = await axios.put(
      `${rootUrl}/update-feedback`,
      updatedDetails,
      config
    );

    const updatedUserInfo = {
      ...userInfo,
      feedback: {
        _id: data._id,
        rating: data.rating,
        opinion: data.opinion,
      },
    };

    dispatch(userActions.setUserLoginSuccess(updatedUserInfo));
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

    const { feedbacks } = getState().feedbackList;
    const feedbackList = _.cloneDeep(feedbacks);
    const index = feedbackList.findIndex((f) => f._id === data._id);
    if (index !== -1) {
      feedbackList.splice(index, 1, data);
      dispatch(feedbackActions.setFeedbackSuccess(feedbackList));
    }
  } catch (error) {
    dispatch(
      feedbackActions.setFeedbackFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};

export const deleteFeedback = (info) => async (dispatch, getState) => {
  try {
    dispatch(feedbackActions.setFedbacksRequest());
    const { userInfo } = getState().userLogin;
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    await axios.put(`${rootUrl}/delete-feedback`, info, config);

    const { feedbacks } = getState().feedbackList;
    const feedbackList = _.cloneDeep(feedbacks);

    const updatedFeedbackList = feedbackList.filter(
      (f) => f._id !== info.feedbackId
    );
    dispatch(feedbackActions.setFeedbackSuccess(updatedFeedbackList));
    const updatedUserInfo = {
      ...userInfo,
      feedback: {},
    };
    dispatch(userActions.setUserLoginSuccess(updatedUserInfo));
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  } catch (error) {
    dispatch(
      feedbackActions.setFeedbackFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};
