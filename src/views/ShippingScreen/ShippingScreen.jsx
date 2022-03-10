// import React, { useState } from "react";
// import { Button, Form, FormGroup } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import FormContainer from "../../components/FormContainer/FormContainer";

// const ShippingScreen = () => {
// 	const navigate = useNavigate();
// 	const [address, setAddress] = useState("");
// 	const [city, setCity] = useState("");
// 	const [postalCode, setPostalCode] = useState("");
// 	const [country, setCountry] = useState("");

// 	const submitHandler = e => {
// 		e.preventDefault();
// 	};

// 	return (
// 		<FormContainer>
// 			<h1>Shipping</h1>
// 			<Form onSubmit={submitHandler}>
// 				<FormGroup controlId="address">
// 					<Form.Label>Address</Form.Label>
// 					<Form.Control
// 						type="text"
// 						placeholder="Enter address"
// 						value={address}
// 						onChange={e => setAddress(e.target.value)}
// 						required
// 					/>
// 				</FormGroup>

// 				<FormGroup controlId="city">
// 					<Form.Label>City</Form.Label>
// 					<Form.Control
// 						type="text"
// 						placeholder="Enter city"
// 						value={city}
// 						onChange={e => setCity(e.target.value)}
// 						required
// 					/>
// 				</FormGroup>

// 				<FormGroup controlId="postalCode">
// 					<Form.Label>City</Form.Label>
// 					<Form.Control
// 						type="text"
// 						placeholder="Enter postalCode"
// 						value={postalCode}
// 						onChange={e => setPostalCode(e.target.value)}
// 						required
// 					/>
// 				</FormGroup>

// 				<FormGroup controlId="country">
// 					<Form.Label>City</Form.Label>
// 					<Form.Control
// 						type="text"
// 						placeholder="Enter country"
// 						value={country}
// 						onChange={e => setCountry(e.target.value)}
// 						required
// 					/>
// 				</FormGroup>

// 				<Button type="submit" variant="primary" className="my-3">
// 					Continue
// 				</Button>
// 			</Form>
// 		</FormContainer>
// 	);
// };

// export default ShippingScreen;
