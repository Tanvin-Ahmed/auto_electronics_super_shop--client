import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minHeight: "60vh",
    maxHeight: "100%",
    width: "80vw",
    overflowY: "auto",
    overflowX: "hidden",
  },
};

Modal.setAppElement("#root");

const CustomModal = ({ modalIsOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
