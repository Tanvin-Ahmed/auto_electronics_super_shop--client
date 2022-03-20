import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, register } from "../../app/actions/userActions";
import FormContainer from "../../components/FormContainer/FormContainer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Meta from "../../components/Meta/Meta";

const LoginScreen = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.userLogin);
	const [isSignIn, setIsSignIn] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	let navigate = useNavigate();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	const submitHandler = e => {
		e.preventDefault();
		if (isSignIn) {
			dispatch(login({ email, password }, navigate, from));
		} else {
			setMessage("");
			if (password !== confirmPassword) {
				setMessage("Passwords do not match!");
			} else {
				dispatch(
					register({ name, email, password, confirmPassword }, navigate, from)
				);
			}
		}
	};

	return (
		<>
			<Meta title={isSignIn ? "Sign In" : "Register"} />
			<FormContainer>
				<h1>{isSignIn ? "Sign In" : "Register"}</h1>
				<Form onSubmit={submitHandler}>
					{isSignIn ? null : (
						<FormGroup controlId="name">
							<Form.Label>User name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</FormGroup>
					)}

					<FormGroup controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</FormGroup>

					<FormGroup controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</FormGroup>

					{isSignIn ? null : (
						<FormGroup controlId="confirmPassword">
							<Form.Label>Confirm password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter confirm password"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								required
							/>
						</FormGroup>
					)}

					<Button type="submit" variant="primary" className="my-3">
						{isSignIn ? "Sign In" : "Register"}
					</Button>
				</Form>

				{message ? (
					<Message variant="danger">{message}</Message>
				) : loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : null}

				<Row className="py-3">
					<Col>
						{isSignIn ? "New customer?" : "Have an account?"}{" "}
						<span
							style={{ textDecoration: "underline", cursor: "pointer" }}
							onClick={() => {
								setIsSignIn(!isSignIn);
								setMessage("");
							}}
						>
							{isSignIn ? "Register" : "Sign In"}
						</span>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default LoginScreen;
