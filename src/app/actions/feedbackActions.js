import {
  feedbackListReducer,
  feedbacksReducer,
} from "../reducers/feedbackReducers";
import axios from "axios";
import { userLoginReducer } from "../reducers/userReducers";
import _ from "lodash";

const { actions: feedbackActions } = feedbacksReducer;
const { actions: userActions } = userLoginReducer;
const { actions: getFeedbackActions } = feedbackListReducer;

const rootUrl = "http://localhost:5000/feedback";

export const addFeedback = (details) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    dispatch(feedbackActions.setFedbacksRequest());
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.post(
      `${rootUrl}/create-feedback`,
      details,
      config
    );

    dispatch(
      userActions.setUserLoginSuccess({
        ...userInfo,
        feedback: {
          _id: data._id,
          rating: data.rating,
          opinion: data.opinion,
        },
      })
    );
    dispatch(feedbackActions.setFeedbackSuccess(data));
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
    getFeedbackActions.setFedbacksRequest();
    const { data } = await axios(`${rootUrl}/get-feedbacks`);
    dispatch(getFeedbackActions.setFeedbackSuccess(data));
  } catch (error) {
    dispatch(
      getFeedbackActions.setFeedbackFail(
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

    dispatch(
      userActions.setUserLoginSuccess({
        ...userInfo,
        feedback: {
          _id: data._id,
          rating: data.rating,
          opinion: data.opinion,
        },
      })
    );

    const { feedbacks } = getState().feedbackList;
    const feedbackList = _.cloneDeep(feedbacks);
    const index = feedbackList.findIndex((f) => f._id === data._id);
    if (index !== -1) {
      feedbackList.splice(index, 1, data);
      dispatch(getFeedbackActions.setFeedbackSuccess(data));
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
    const { userInfo } = getState().userLogin;
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    await axios.put(`${rootUrl}/delete-feedback`, info, config);

    const { feedbacks } = getState().feedbackList;
    const feedbackList = _.cloneDeep(feedbacks);

    const updatedFeedbackList = feedbackList.filter(
      (f) => f._id !== info.feedbackId
    );
    dispatch(getFeedbackActions.setFeedbackSuccess(updatedFeedbackList));
  } catch (error) {
    dispatch(
      feedbackActions.setFeedbackFail(
        error.response ? error.response.data.message : error.message
      )
    );
  }
};
