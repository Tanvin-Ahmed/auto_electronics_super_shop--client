import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../app/actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	const { order, loading, success, error } = useSelector(state => state.order);

	const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

	cart.itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 50);
	cart.totalPrice = addDecimals(
		Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
	);

	useEffect(() => {
		if (success && order._id) {
			navigate(`/order/${order._id}`);
		}
	}, [success, order, navigate]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingAddress.address}, {shippingAddress.city},{" "}
								{shippingAddress.postalCode}, {shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							{cartItems.length === 0 ? (
								<Message variant="warning">Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((product, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={product.image}
														alt={product.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${product?.product}`}>
														{/* in cartItems the id of a product is product*/}
														{product.name}
													</Link>
												</Col>
												<Col md={4}>
													{product.qty} x {product.price} ={" "}
													{product.price * product.qty}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block col-12"
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
							<ListGroup.Item>
								{loading ? (
									<Loader />
								) : error ? (
									<Message variant="danger">{error}</Message>
								) : null}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
