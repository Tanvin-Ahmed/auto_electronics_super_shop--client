import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../Custom/CustomModal/CustomModal";
import Avatar from "../../shared/Avatar/Avatar";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import {
  addFeedback,
  deleteFeedback,
  udateFeedback,
} from "../../../app/actions/feedbackActions";
import Loader from "../../Loader/Loader";

const GiveFeedbackModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error } = useSelector((state) => state.feedbackList);
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState("5");

  useEffect(() => {
    if (userInfo._id) {
      setOpinion(userInfo?.feedback?.opinion || "");
      setRating(userInfo?.feedback?.rating || "5");
    }
  }, [userInfo]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user: userInfo._id,
      opinion,
      rating,
    };

    if (userInfo?.feedback?.opinion) {
      if (opinion.trim().length)
        dispatch(
          udateFeedback({ details: data, _id: userInfo?.feedback?._id })
        );
    } else {
      if (opinion.trim().length) dispatch(addFeedback(data));
      else alert("Please give some feedback!");
    }
  };

  const handleDelete = () => {
    const data = {
      feedbackId: userInfo?.feedback?._id,
      userId: userInfo._id,
    };

    dispatch(deleteFeedback(data));
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
        <Avatar alt={userInfo.name} photoURL={userInfo?.photoURL} size="lg" />
      </div>
      <form onSubmit={handleSubmit} className="text-center mb-3">
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
          required
        ></textarea>

        <Form.Select className="my-3" value={rating} onChange={handleRating}>
          <option value="5">5</option>
          <option value="4.5">4.5</option>
          <option value="4">4</option>
          <option value="3.5">3.5</option>
          <option value="3">3</option>
          <option value="2.5">2.5</option>
          <option value="2">2</option>
          <option value="1.5">1.5</option>
          <option value="1">1</option>
        </Form.Select>

        <ButtonGroup>
          <Button className="p-2" type="sumbit">
            Submit
          </Button>
          <Button className="p-2 btn-danger" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </form>
      <div className="text-center">
        {loading ? <Loader /> : null}
        {!loading && error ? (
          <p className="text-danger font-weight-bold">{error}</p>
        ) : null}
      </div>
    </CustomModal>
  );
};

export default GiveFeedbackModal;
