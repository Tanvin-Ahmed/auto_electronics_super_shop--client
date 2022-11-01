import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { payOrderWithSSL } from "../../app/actions/orderActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const SslPayment = () => {
	const dispatch = useDispatch();
	const { order } = useSelector(state => state.orderDetails);
	const [number, setNumber] = useState("+880");
	const [status, setStatus] = useState({ error: "", loading: false });

	const submitHandler = e => {
		e.preventDefault();
		const matched = number.startsWith("+8801");
		if (number.length !== 13 && !matched) {
			alert("Please enter your phone number!!");
		} else {
			dispatch(payOrderWithSSL(order, setStatus));
		}
	};

	return (
		<>
			<Form onSubmit={submitHandler}>
				<Form.Control
					type="text"
					value={number}
					onChange={e => setNumber(e.target.value)}
					required
				/>
				<br />
				<Button type="submit" className="col-12">
					Pay $({order.totalPrice})
				</Button>
			</Form>
			<br />
			{status.loading ? (
				<Loader />
			) : status.error ? (
				<Message variant="danger">{status.error}</Message>
			) : null}
		</>
	);
};

export default SslPayment;
