import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, getUserList } from "../../app/actions/userActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Paginate from "../../components/Paginate/Paginate";

const UserListScreen = () => {
	const { pageNumber } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, users, error, pages, page } = useSelector(
		state => state.userList
	);
	const { userInfo } = useSelector(state => state.userLogin);
	const { success, error: deleteError } = useSelector(
		state => state.userDelete
	);

	useEffect(() => {
		if (userInfo.email) {
			if (userInfo.isAdmin) {
				dispatch(getUserList(Number(pageNumber)));
			} else if (!userInfo.isAdmin) {
				navigate("/page not found");
			} else {
				navigate("/login");
			}
		}
	}, [dispatch, userInfo, navigate, pageNumber]);

	const handleDeleteUser = id => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{success ? (
				<Message variant="success">
					<i class="far fa-check-circle" style={{ color: "green" }}></i> Delete
					Successful!
				</Message>
			) : deleteError ? (
				<Message variant="danger">{deleteError}</Message>
			) : null}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table
						hover
						striped
						bordered
						responsive
						className="table-sm text-center"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>EMAIL</th>
								<th>ADMIN</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i className="fas fa-check" style={{ color: "green" }} />
										) : (
											<i className="fas fa-times" style={{ color: "red" }} />
										)}
									</td>
									<td>
										<LinkContainer to={`/admin/user/${user._id}/edit`}>
											<Button
												type="button"
												variant="light"
												className="btn-sm mx-1"
											>
												<i className="fas fa-edit" />
											</Button>
										</LinkContainer>
										<Button
											className="btn-sm mx-1"
											variant="danger"
											type="button"
											onClick={() => handleDeleteUser(user._id)}
										>
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate
						pages={pages}
						page={page}
						isAdmin={true}
						route={"/admin/user-list"}
					/>
				</>
			)}
		</>
	);
};

export default UserListScreen;
