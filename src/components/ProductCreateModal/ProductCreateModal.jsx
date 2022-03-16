import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	createProduct,
	listProductDetails,
	updateProduct,
	resetUpdateProductState,
	resetCreateProductState,
} from "../../app/actions/productActions";
import FormContainer from "../FormContainer/FormContainer";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "80vw",
		height: "95vh",
		overflowX: "hidden",
		overflowY: "auto",
	},
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ProductCreateModal = ({ modalIsOpen, setIsOpen, productId }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const { product, loading, error } = useSelector(
		state => state.productDetails
	);
	const {
		success,
		loading: updateLoading,
		error: updateError,
	} = useSelector(state => state.productUpdate);

	const {
		success: createSuccess,
		loading: createLoading,
		error: createError,
	} = useSelector(state => state.productCreate);

	useEffect(() => {
		if (!productId) return;
		if (!product.name || product._id !== productId) {
			dispatch(listProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [dispatch, productId, product]);

	useEffect(() => {
		dispatch(resetCreateProductState());
		dispatch(resetUpdateProductState());
	}, [dispatch]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleCreateProduct = e => {
		e.preventDefault();
		const data = {
			name,
			price,
			brand,
			category,
			countInStock,
			description,
		};
		if (productId) {
			dispatch(updateProduct({ ...product, ...data }, closeModal));
		} else {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = () => {
				const base64 = reader.result;
				dispatch(createProduct(data, base64, closeModal));
			};
		}
	};

	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Create Product"
			>
				<div className="text-right">
					<Button
						type="button"
						variant="primary"
						className="btn-sm"
						onClick={closeModal}
					>
						<i className="fas fa-times" />
					</Button>
				</div>
				<FormContainer>
					<h2>{productId ? "Update Product" : "Create Product"}</h2>
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{error}</Message>
					) : (
						<Form onSubmit={handleCreateProduct}>
							<FormGroup controlId="name">
								<Form.Label>Product name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</FormGroup>

							<FormGroup controlId="price">
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter price"
									value={price}
									onChange={e => setPrice(e.target.value)}
									required
								/>
							</FormGroup>

							<FormGroup controlId="image">
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="file"
									accept="image/png, image/jpg, image/jpeg"
									onChange={e => setImage(e.target.files[0])}
									required
									className="btn btn-primary"
								/>
							</FormGroup>

							<FormGroup controlId="brand">
								<Form.Label>Brand</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter brand"
									value={brand}
									onChange={e => setBrand(e.target.value)}
									required
								/>
							</FormGroup>

							<FormGroup controlId="category">
								<Form.Label>Category</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter category"
									value={category}
									onChange={e => setCategory(e.target.value)}
									required
								/>
							</FormGroup>

							<FormGroup controlId="countInStock">
								<Form.Label>Count in Stack</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter count in stock"
									value={countInStock}
									onChange={e => setCountInStock(e.target.value)}
									required
								/>
							</FormGroup>

							<FormGroup controlId="description">
								<Form.Label>Price</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="Enter description"
									value={description}
									onChange={e => setDescription(e.target.value)}
									required
								/>
							</FormGroup>

							{productId ? (
								<Button type="submit" variant="primary" className="my-3">
									<i className="fas fa-edit"></i> &nbsp; Update
								</Button>
							) : (
								<Button type="submit" variant="primary" className="my-3">
									<i className="fas fa-plus-circle" /> &nbsp; Create
								</Button>
							)}
						</Form>
					)}
					{updateLoading ? (
						<Loader />
					) : updateError ? (
						<Message variant="danger">
							<i className="fas fa-times-circle" /> {updateError}
						</Message>
					) : success ? (
						<Message variant="success">
							<i className="fas fa-check-circle" /> Product updated
							successfully!
						</Message>
					) : null}
					{createLoading ? (
						<Loader />
					) : createError ? (
						<Message variant="danger">
							<i className="fas fa-times-circle" /> {createError}
						</Message>
					) : createSuccess ? (
						<Message variant="success">
							<i className="fas fa-check-circle" /> Product added successfully!
						</Message>
					) : null}
				</FormContainer>
			</Modal>
		</div>
	);
};

export default ProductCreateModal;
