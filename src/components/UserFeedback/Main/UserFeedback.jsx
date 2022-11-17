import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomerSwiper from "../../Custom/Swiper/CustomerSwiper";
import GiveFeedbackModal from "../GiveFeedbackModal/GiveFeedbackModal";

const UserFeedback = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt-3">
      <h1>Users Feedback</h1>
      <CustomerSwiper />
      <div className="text-center">
        <p className="mt-5">
          Feel free to leave a feedback. We will try our best to solve your
          problem...!
        </p>
        {userInfo?._id && userInfo?.feedback?._id ? (
          <button className="btn-primary py-2" onClick={handleOpen}>
            Update Feedback
          </button>
        ) : (
          <button
            className="btn-primary py-2"
            onClick={handleOpen}
            disabled={!userInfo._id}
          >
            Give Feedback
          </button>
        )}
        {!userInfo._id && (
          <p className="mt-2 text-danger">Please login to give feedback!!!</p>
        )}
      </div>
      <GiveFeedbackModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UserFeedback;
