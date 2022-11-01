import React from "react";
import { getSubString } from "../../utils/getSubString";
import Rating from "../Rating/Rating";
import "./UserFeedback.scss";

const UserFeedback = ({ feedbackData }) => {
  if (!feedbackData?._id) return null;

  return (
    <div className="feedback">
      <img src={feedbackData.photoURL} alt="" />
      <h5 className="name mt-2">{feedbackData.username}</h5>
      <small className="email">{feedbackData.email}</small>
      <p className="opinion">{getSubString(feedbackData.opinion, 120)}</p>
      <Rating value={feedbackData.rating} text="" />
    </div>
  );
};

export default UserFeedback;
