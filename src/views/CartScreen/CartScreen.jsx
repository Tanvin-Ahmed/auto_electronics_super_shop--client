import React, { useEffect } from "react";
import {
	Button,
	Col,
	FormControl,
	Image,
	ListGroup,
	Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../../app/actions/cartActions";
import Message from "../../components/Message/Message";

const CartScreen = () => {
	const navigate = useNavigate();
	const { id: productId } = useParams();
	const [searchParams] = useSearchParams();
	const { qty } = Object.fromEntries([...searchParams]);
	const dispatch = useDispatch();
	const { cartItems } = useSelector(state => state.cart);

	console.log(cartItems);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFroCartHandler = productId => {
		dispatch(removeFromCart(productId));
	};

	const checkoutHandler = () => {
		navigate("/shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty! <Link to="/">Go back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={3}>
										<FormControl
											as="select"
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(x => (
												<option key={x} value={x + 1}>
													{x + 1}
												</option>
											))}
										</FormControl>
									</Col>
									<Col md={2}>
										<Button
											variant="light"
											onClick={() => removeFroCartHandler(item.product)}
										>
											<i className="fas fa-trash" />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<ListGroup>
					<ListGroup.Item>
						<h2>
							Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
							items
						</h2>
						$
						{cartItems
							.reduce((acc, item) => acc + item.qty * item.price, 0)
							.toFixed(2)}
					</ListGroup.Item>
					<ListGroup.Item>
						<Button
							type="button"
							className="btn-black"
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							Proceed to checkout
						</Button>
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	);
};

export default CartScreen;
