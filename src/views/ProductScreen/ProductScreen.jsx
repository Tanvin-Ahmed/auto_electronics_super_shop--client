import { logEvent } from "firebase/analytics";
import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	Button,
	Image,
	ListGroup,
	Card,
	FormControl,
	Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
	listProductDetails,
	createProductReview,
	resetCreateReviewState,
} from "../../app/actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Meta from "../../components/Meta/Meta";
import Rating from "../../components/Rating/Rating";
import { firebaseAnalytics } from "../../firebase/config";

const ProductScreen = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const { product, loading, error } = useSelector(
		state => state.productDetails
	);

	const {
		success,
		loading: loadingReview,
		error: errorReview,
	} = useSelector(state => state.productReviewCreate);

	const { userInfo } = useSelector(state => state.userLogin);

	useEffect(() => {
		if (success) {
			alert("Review Submitted!");
			setRating(0);
			setComment("");
			dispatch(resetCreateReviewState());
		}
		if (!product._id || product._id !== id) {
			dispatch(listProductDetails(id));
		}
	}, [id, dispatch, success, product]);

	// add google analytics
	useEffect(() => {
		logEvent(firebaseAnalytics, `${product.name} details page visited`);
	}, [product]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(createProductReview({ comment, rating }, id));
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid="true" />
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating || 0}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Price: </Col>
											<Col>
												<strong>{product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status: </Col>
											<Col>
												{product.countInStock > 0 ? "In stack" : "Out of Stack"}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 ? (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<FormControl
														as="select"
														value={qty}
														onChange={e => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(x => (
															<option key={x} value={x + 1}>
																{x + 1}
															</option>
														))}
													</FormControl>
												</Col>
											</Row>
										</ListGroup.Item>
									) : null}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className="btn-block col-12"
											type="button"
											disabled={product.countInStock === 0}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews && product.reviews.length === 0 ? (
								<Message variant="info">No reviews</Message>
							) : (
								<ListGroup variant="flush">
									{product.reviews &&
										product.reviews.map((review, index) => (
											<ListGroup.Item key={index}>
												<strong>{review.name}</strong>
												<Rating value={review.rating} text="" />
												<p>{new Date(review.createdAt).toLocaleDateString()}</p>
												<p>{review.comment}</p>
											</ListGroup.Item>
										))}
								</ListGroup>
							)}
							<ListGroup.Item>
								<h2>Write a Customer Review</h2>
								{userInfo._id ? (
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="rating">
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as="select"
												onChange={e => setRating(e.target.value)}
											>
												<option value="">Select...</option>
												<option value="1">1 - 😠</option>
												<option value="2">2 - 😑</option>
												<option value="3">3 - 😐</option>
												<option value="4">4 - 🙂</option>
												<option value="5">5 - 😊</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId="comment">
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as="textarea"
												row="3"
												value={comment}
												placeholder="Write your comment..."
												onChange={e => setComment(e.target.value)}
											></Form.Control>
										</Form.Group>
										<Button variant="primary" type="submit" className="my-3">
											Submit
										</Button>
									</Form>
								) : (
									<Message variant="warning">
										<Link to="/login">sing in</Link> to write a review
									</Message>
								)}
								{errorReview ? (
									<Message variant="danger">{errorReview}</Message>
								) : loadingReview ? (
									<Loader />
								) : null}
							</ListGroup.Item>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
