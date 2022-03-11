import React, { useState } from "react";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../app/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";

const PaymentScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingAddress } = useSelector(state => state.cart);
	const [paymentMethod, setPaymentMethod] = useState("paypal");

	console.log(paymentMethod);

	if (!shippingAddress) {
		navigate("/shipping");
	}

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/place-order");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId="address">
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or credit cart"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</FormGroup>
				<Button type="submit" variant="primary" className="my-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;