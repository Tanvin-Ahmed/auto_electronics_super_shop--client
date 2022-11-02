import { logEvent } from "firebase/analytics";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../../app/actions/productActions";
import CustomerSwiper from "../../components/Custom/Swiper/CustomerSwiper";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Meta from "../../components/Meta/Meta";
import Paginate from "../../components/Paginate/Paginate";
import Product from "../../components/Product/Product";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import UserFeedback from "../../components/UserFeedback/Main/UserFeedback";
import { firebaseAnalytics } from "../../firebase/config";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // add google analytics
  useEffect(() => {
    logEvent(firebaseAnalytics, "Home page visited");
  }, []);

  return (
    <>
      <Meta />
      {keyword ? (
        <Link to="/" className="btn btn-light mb-2">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
      <UserFeedback />
    </>
  );
};

export default HomeScreen;
