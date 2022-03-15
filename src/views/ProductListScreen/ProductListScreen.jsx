import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { deleteProduct, listProducts } from "../../app/actions/productActions";

const ProductListScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, products, error } = useSelector(state => state.productList);
	const { userInfo } = useSelector(state => state.userLogin);
	const {
		success,
		loading: deleteLoading,
		error: deleteError,
	} = useSelector(state => state.productDelete);

	useEffect(() => {
		if (userInfo.email) {
			if (userInfo.isAdmin) {
				if (products.length === 0) {
					dispatch(listProducts());
				}
			} else if (!userInfo.isAdmin) {
				navigate("/page not found");
			} else {
				navigate("/login");
			}
		}
	}, [dispatch, userInfo, navigate, products.length]);

	const handleDeleteUser = id => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(id));
		}
	};

	const handleCreateProduct = product => {};

	return (
		<>
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<h1>Products</h1>
				<Button className="my-3" onClick={handleCreateProduct}>
					<i className="fas fa-plus" />
					&nbsp;&nbsp; Create Product
				</Button>
			</div>

			{deleteLoading ? (
				<Loader />
			) : deleteError ? (
				<Message variant="danger">{deleteError}</Message>
			) : success ? (
				<Message variant="success">
					<i class="far fa-check-circle" style={{ color: "green" }}></i> Product
					deleted successfully
				</Message>
			) : null}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
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
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>$ {product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
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
										onClick={() => handleDeleteUser(product._id)}
									>
										<i className="fas fa-trash" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListScreen;
