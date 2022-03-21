import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
	deliverOrder,
	getOrderDetails,
	resetDeliverState,
	resetOrderPay,
} from "../../app/actions/orderActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import StripeFormScreen from "../StripeFormScreen/StripeFormScreen";
import Meta from "../../components/Meta/Meta";
import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "../../firebase/config";

const OrderScreen = () => {
	const { id } = useParams();
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const { order, loading, error } = useSelector(state => state.orderDetails);
	const { userInfo } = useSelector(state => state.userLogin);
	const { success } = useSelector(state => state.orderPay);
	const {
		success: successDeliver,
		loading: loadingDeliver,
		error: errorDeliver,
	} = useSelector(state => state.orderDeliver);

	useEffect(() => {
		if (!order?._id || success || successDeliver) {
			dispatch(resetOrderPay());
			dispatch(resetDeliverState());
		}
		if (!order._id || order._id !== id) {
			dispatch(getOrderDetails(id));
		}
	}, [dispatch, id, order, success, successDeliver]);

	const handleDeliver = orderId => {
		dispatch(deliverOrder(orderId));
	};

	// add google analytics
	useEffect(() => {
		logEvent(firebaseAnalytics, `Payment page visited`);
	}, []);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : order?.orderItems ? (
		<>
			<Meta title="Order details" />
			<LinkContainer to="/admin/order-list">
				<Button className="btn-light">Go back</Button>
			</LinkContainer>
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
							{userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
								<ListGroup.Item>
									<Button
										type="button"
										variant="primary"
										onClick={() => handleDeliver(order._id)}
										className="col-12"
									>
										Make As Delivered
									</Button>
								</ListGroup.Item>
							) : null}
						</ListGroup>
						{loadingDeliver ? (
							<Loader />
						) : errorDeliver ? (
							<Message variant="danger">{errorDeliver}</Message>
						) : null}
					</Card>
				</Col>
			</Row>
		</>
	) : null;
};

export default OrderScreen;
