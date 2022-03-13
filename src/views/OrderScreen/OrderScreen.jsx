import React, { useEffect } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, resetOrderPay } from "../../app/actions/orderActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import StripeFormScreen from "../StripeFormScreen/StripeFormScreen";

const OrderScreen = () => {
	const { id } = useParams();
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const { order, loading, error } = useSelector(state => state.orderDetails);
	const { success } = useSelector(state => state.orderPay);

	useEffect(() => {
		if (!order?._id || success) {
			dispatch(resetOrderPay());
			dispatch(getOrderDetails(id));
		}
	}, [dispatch, id, order, success]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : order?.orderItems ? (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<strong>Name: </strong> {order.user.name}
							<br />
							<strong>Email: </strong>{" "}
							<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered at {new Date(order.deliveredAt).toLocaleString()}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">
									Paid at {new Date(order.paidAt).toLocaleString()}
								</Message>
							) : (
								<Message variant="danger">Not paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							{order.orderItems.length === 0 ? (
								<Message variant="warning">Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((product, index) => (
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
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{order.totalPrice ? (
								order.isPaid ? null : (
									<ListGroup.Item>
										<StripeFormScreen />
									</ListGroup.Item>
								)
							) : null}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	) : null;
};

export default OrderScreen;
