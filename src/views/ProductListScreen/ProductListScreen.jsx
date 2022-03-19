import React, { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
	deleteProduct,
	listProducts,
	resetCreateProductState,
} from "../../app/actions/productActions";
import ProductCreateModal from "../../components/ProductCreateModal/ProductCreateModal";
import Paginate from "../../components/Paginate/Paginate";

const ProductListScreen = () => {
	const { pageNumber } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, products, error, pages, page } = useSelector(
		state => state.productList
	);
	const {
		loading: createLoading,
		createdProduct,
		error: createError,
		success: createSuccess,
	} = useSelector(state => state.productCreate);
	const { userInfo } = useSelector(state => state.userLogin);
	const {
		success,
		loading: deleteLoading,
		error: deleteError,
	} = useSelector(state => state.productDelete);

	const [modalIsOpen, setIsOpen] = useState(false);
	const selectedIdRef = useRef("");

	useEffect(() => {
		dispatch(resetCreateProductState());
		if (userInfo.email) {
			if (userInfo.isAdmin) {
				dispatch(listProducts("", pageNumber));
			} else if (!userInfo.isAdmin) {
				navigate("/page not found");
			} else {
				navigate("/login");
			}
		}
		if (createSuccess) {
			navigate(`/admin/product/${createdProduct._id}/edit`);
		}
	}, [
		dispatch,
		userInfo,
		navigate,
		products.length,
		createSuccess,
		createdProduct,
		pageNumber,
	]);

	const handleDeleteUser = id => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(id));
		}
	};

	const handleSelectProduct = id => {
		selectedIdRef.current = id;
		setIsOpen(true);
	};

	const constHandleCreateButton = () => {
		setIsOpen(true);
		handleSelectProduct("");
	};

	return (
		<>
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<h1>Products</h1>
				<Button className="my-3" onClick={constHandleCreateButton}>
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

			{createLoading ? (
				<Loader />
			) : createError ? (
				<Message variant="danger">{createError}</Message>
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
										<Button
											onClick={() => handleSelectProduct(product._id)}
											type="button"
											variant="light"
											className="btn-sm mx-1"
										>
											<i className="fas fa-edit" />
										</Button>
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
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
			{modalIsOpen ? (
				selectedIdRef.current ? (
					<ProductCreateModal
						modalIsOpen={modalIsOpen}
						setIsOpen={setIsOpen}
						productId={selectedIdRef.current}
					/>
				) : (
					<ProductCreateModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
				)
			) : null}
		</>
	);
};

export default ProductListScreen;
