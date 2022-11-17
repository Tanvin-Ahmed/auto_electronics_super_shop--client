import React from "react";
import "./CustomerSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import UserFeedbackCard from "../../UserFeedback/UserFeedbackCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbacks } from "../../../app/actions/feedbackActions";

const CustomerSwiper = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.feedbackList);

  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);

  return feedbacks.length > 0 ? (
    <Swiper
      effect={"coverflow"}
      loop={true}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {feedbacks.map((data) => (
        <SwiperSlide key={data._id} style={{ width: "200px", height: "400px" }}>
          <UserFeedbackCard feedbackData={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : null;
};

export default CustomerSwiper;
