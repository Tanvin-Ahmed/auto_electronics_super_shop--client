import { logEvent } from "firebase/analytics";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../app/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import Meta from "../../components/Meta/Meta";
import { firebaseAnalytics } from "../../firebase/config";

const PaymentScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingAddress } = useSelector(state => state.cart);
	const [paymentMethod, setPaymentMethod] = useState("Stripe");

	if (!shippingAddress) {
		navigate("/shipping");
	}

	// add google analytics
	useEffect(() => {
		logEvent(firebaseAnalytics, `Payment page visited`);
	}, []);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/place-order");
	};

	return (
		<>
			<Meta title="Payment" />
			<FormContainer>
				<CheckoutSteps step1 step2 step3 />
				<h1>Payment Method</h1>
				<Form onSubmit={submitHandler}>
					<FormGroup controlId="address">
						<Form.Label as="legend">Select Method</Form.Label>
						<Col>
							{/* <Form.Check
							type="radio"
							label="PayPal or credit cart"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={e => setPaymentMethod(e.target.value)}
						></Form.Check> */}

							<Form.Check
								type="radio"
								label="Stripe"
								id="Stripe"
								name="paymentMethod"
								value="Stripe"
								checked
								onChange={e => setPaymentMethod(e.target.value)}
							></Form.Check>
						</Col>
					</FormGroup>
					<Button type="submit" variant="primary" className="my-3 col-12">
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default PaymentScreen;
