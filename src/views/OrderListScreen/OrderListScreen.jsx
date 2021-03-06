import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getAllOrder } from "../../app/actions/orderActions";
import Paginate from "../../components/Paginate/Paginate";
import Meta from "../../components/Meta/Meta";

const OrderListScreen = () => {
	const { pageNumber } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, orders, error, page, pages } = useSelector(
		state => state.orderList
	);
	const { userInfo } = useSelector(state => state.userLogin);

	useEffect(() => {
		if (userInfo.email) {
			if (userInfo.isAdmin) {
				dispatch(getAllOrder(Number(pageNumber)));
			} else if (!userInfo.isAdmin) {
				navigate("/page not found");
			} else {
				navigate("/login");
			}
		}
	}, [dispatch, userInfo, navigate, pageNumber]);

	return (
		<>
			<Meta title="Admin | Order list" />
			<h1>Orders</h1>
			{/* {success ? (
				<Message variant="success">
					<i class="far fa-check-circle" style={{ color: "green" }}></i> Delete
					Successful!
				</Message>
			) : error ? (
				<Message variant="danger">{deleteError}</Message>
			) : null} */}
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
								<th>USER</th>
								<th>DATE</th>
								<th>PRICE</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user && order.user.name}</td>
									<td>{new Date(order.createdAt).toLocaleDateString()}</td>
									<td>${order.totalPrice}</td>

									<td>
										{order.isPaid ? (
											<>
												<i
													className="far fa-check-circle"
													style={{ color: "green" }}
												></i>{" "}
												&nbsp;
												<span style={{ color: "green" }}>
													{new Date(order.paidAt).toLocaleDateString()}
												</span>
											</>
										) : (
											<i className="fas fa-times" style={{ color: "red" }} />
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<>
												<i
													className="far fa-check-circle"
													style={{ color: "green" }}
												></i>{" "}
												&nbsp;
												<span style={{ color: "green" }}>
													{new Date(order.deliveredAt).toLocaleDateString()}
												</span>
											</>
										) : (
											<i className="fas fa-times" style={{ color: "red" }} />
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button
												type="button"
												variant="light"
												className="btn-sm mx-1"
											>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate
						pages={pages}
						page={page}
						isAdmin={true}
						route={"/admin/order-list"}
					/>
				</>
			)}
		</>
	);
};

export default OrderListScreen;
