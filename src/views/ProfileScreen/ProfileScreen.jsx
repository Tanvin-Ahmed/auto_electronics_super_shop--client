import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getMyOrders } from "../../app/actions/orderActions";
import {
	getUserDetails,
	updateUserProfile,
} from "../../app/actions/userActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, user } = useSelector(state => state.userDetails);
	const {
		loading: myOrderLoading,
		error: myOrderError,
		myOrders,
	} = useSelector(state => state.myOrderList);
	const {
		success,
		loading: updateLoader,
		error: updateError,
	} = useSelector(state => state.updateUserProfile);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!user.name) {
			dispatch(getUserDetails());
			dispatch(getMyOrders());
		} else {
			setEmail(user.email);
			setName(user.name);
		}
	}, [dispatch, user]);

	const submitHandler = e => {
		e.preventDefault();

		if (password && password !== confirmPassword) {
			setMessage("Passwords not match");
		} else {
			let updatedInfo = {};
			if (password) updatedInfo = { ...user, name, email, password };
			else updatedInfo = { ...user, name, email };
			dispatch(updateUserProfile(updatedInfo));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : null}
				<Form onSubmit={submitHandler}>
					<FormGroup controlId="name">
						<Form.Label>User name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId="confirmPassword">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter confirm password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</FormGroup>

					<Button type="submit" variant="primary" className="my-3 col-12">
						Update
					</Button>
				</Form>

				{message ? (
					<Message variant="danger">{message}</Message>
				) : updateLoader ? (
					<Loader />
				) : updateError ? (
					<Message variant="danger">{updateError}</Message>
				) : success ? (
					<Message variant="success">Update successfully!</Message>
				) : null}
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{myOrderLoading ? (
					<Loader />
				) : myOrderError ? (
					<Message>{myOrderError}</Message>
				) : (
					<Table
						striped
						hover
						bordered
						responsive
						className="table-sm text-center"
					>
						<thead>
							<tr>
								<td>ID</td>
								<td>DATE</td>
								<td>TOTAL</td>
								<td>PAID</td>
								<td>DELIVERED</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{myOrders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{new Date(order.createdAt).toLocaleDateString()}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											new Date(order.paidAt).toLocaleDateString()
										) : (
											<i className="fas fa-times" style={{ color: "red" }} />
										)}
									</td>
									<td>
										{order.isDelivered ? (
											new Date(order.deliveredAt).toLocaleDateString()
										) : (
											<i className="fas fa-times" style={{ color: "red" }} />
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button type="button" variant="light" className="btn-sm">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
