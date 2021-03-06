import { logEvent } from "firebase/analytics";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../app/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import Meta from "../../components/Meta/Meta";
import { firebaseAnalytics } from "../../firebase/config";

const ShippingScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingAddress } = useSelector(state => state.cart);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	// add google analytics
	useEffect(() => {
		logEvent(firebaseAnalytics, `Shipping page visited`);
	}, []);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};

	return (
		<>
			<Meta title="Shipping Address" />
			<FormContainer>
				<CheckoutSteps step1 step2 />
				<h1>Shipping</h1>
				<Form onSubmit={submitHandler}>
					<FormGroup controlId="address">
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter address"
							value={address}
							onChange={e => setAddress(e.target.value)}
							required
						/>
					</FormGroup>
					<FormGroup controlId="city">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter city"
							value={city}
							onChange={e => setCity(e.target.value)}
							required
						/>
					</FormGroup>
					<FormGroup controlId="postalCode">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter postalCode"
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
							required
						/>
					</FormGroup>
					<FormGroup controlId="country">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter country"
							value={country}
							onChange={e => setCountry(e.target.value)}
							required
						/>
					</FormGroup>
					<Button type="submit" variant="primary" className="my-3 col-12">
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default ShippingScreen;
