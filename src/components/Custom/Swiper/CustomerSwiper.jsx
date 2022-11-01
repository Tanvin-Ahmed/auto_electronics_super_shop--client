import React, { useState } from "react";
import "./CustomerSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import { reviewData } from "../../../utils/swiperData";
import UserFeedback from "../../UserFeedback/UserFeedback";

const CustomerSwiper = () => {
  const [swiperData, setSwiperData] = useState(reviewData || []);

  return (
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
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {!!swiperData.length &&
        swiperData.map((data) => (
          <SwiperSlide
            key={data._id}
            style={{ width: "200px", height: "400px" }}
          >
            <UserFeedback feedbackData={data} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CustomerSwiper;
