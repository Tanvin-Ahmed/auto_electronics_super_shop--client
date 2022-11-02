import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "../../Custom/CustomModal/CustomModal";
import Avatar from "../../shared/Avatar/Avatar";

const GiveFeedbackModal = ({ isModalOpen, setIsModalOpen }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [opinion, setOpinion] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: userInfo.name,
      email: userInfo.email,
      opinion,
    };

    console.log(data);
  };

  return (
    <CustomModal modalIsOpen={isModalOpen} closeModal={handleClose}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>Feedback Review</h2>
        <button className="btn-primary" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Avatar text={userInfo.name} size="lg" />
      </div>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          className="form-control my-3"
          name="name"
          placeholder="User Name"
          value={userInfo.name}
          readOnly
        />
        <input
          type="email"
          className="form-control my-3"
          name="email"
          placeholder="Email Address"
          value={userInfo.email}
          readOnly
        />
        <textarea
          className="form-control my-3"
          name="opinion"
          cols="30"
          rows="5"
          placeholder="Leave your opinion..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        ></textarea>

        <button className="btn-primary p-2" type="submit">
          Submit
        </button>
      </form>
    </CustomModal>
  );
};

export default GiveFeedbackModal;
