import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer/FormContainer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
	getUserDetails,
	resetUserUpdateStates,
	updateUser,
} from "../../app/actions/userActions";

const UserEditScreen = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, user } = useSelector(state => state.userDetails);
	const {
		loading: updateLoading,
		error: updateError,
		success,
	} = useSelector(state => state.userUpdate);
	const [name, setName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (success) {
			dispatch(resetUserUpdateStates());
			navigate("/admin/user-list");
		} else {
			if (!user._id || (user._id && user._id !== id)) {
				dispatch(getUserDetails(id));
			} else {
				setName(user.name);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, id, user, success, navigate]);

	const submitHandler = e => {
		e.preventDefault();
		const data = { _id: id, name, isAdmin };
		dispatch(updateUser(data));
	};

	return (
		<>
			<Link to="/admin/user-list" className="btn btn-light my-3">
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<FormGroup controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</FormGroup>

						<FormGroup controlId="isAdmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								onChange={e => setIsAdmin(e.target.checked)}
								checked={isAdmin}
							/>
						</FormGroup>

						<Button type="submit" variant="primary" className="my-3">
							Update
						</Button>
					</Form>
				)}
				{updateLoading ? (
					<Loader />
				) : updateError ? (
					<Message variant="danger">{updateError}</Message>
				) : null}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
