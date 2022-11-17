import React from "react";
import CustomModal from "../Custom/CustomModal/CustomModal";
import Rating from "../Rating/Rating";
import Avatar from "../shared/Avatar/Avatar";

const DetailsModal = ({ isModalOpen, setIsModalOpen, data }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomModal closeModal={closeModal} modalIsOpen={isModalOpen}>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Feedback Review</h2>
          <button className="btn-primary" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column mb-3">
          <Avatar
            photoURL={data?.user?.photoURL}
            alt={data?.user?.name}
            size="lg"
          />
          <h6 className="mt-2 font-weight-bold">{data?.user?.name}</h6>
          <small className="font-weight-bold mb-2">{data?.user?.email}</small>
          <Rating value={data.rating} text="" />
        </div>
        <p>{data.opinion}</p>
      </div>
    </CustomModal>
  );
};

export default DetailsModal;
