import React, { useState } from "react";
import { getSubString } from "../../utils/getSubString";
import Rating from "../Rating/Rating";
import Avatar from "../shared/Avatar/Avatar";
import DetailsModal from "./DetailsModal";
import "./UserFeedbackCard.scss";

const UserFeedbackCard = ({ feedbackData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (!feedbackData?._id) return null;

  return (
    <>
      <div className="feedback">
        <Avatar photoURL={feedbackData.photoURL} size="lg" />
        <h5 className="name mt-2">{feedbackData.username}</h5>
        <small className="email">{feedbackData.email}</small>
        <p className="opinion">{getSubString(feedbackData.opinion, 100)}...</p>
        <Rating value={feedbackData.rating} text="" />
        <button className="btn-primary mt-2 px-3" onClick={handleOpenModal}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <DetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={feedbackData}
      />
    </>
  );
};

export default UserFeedbackCard;
