import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	Button,
	Image,
	ListGroup,
	Card,
	FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { listProductDetails } from "../../app/actions/productActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Rating from "../../components/Rating/Rating";

const ProductScreen = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const { product, loading, error } = useSelector(
		state => state.productDetails
	);

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [id, dispatch]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
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
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
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
			)}
		</>
	);
};

export default ProductScreen;
