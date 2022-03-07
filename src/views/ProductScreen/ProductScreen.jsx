import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import axios from "axios";

const ProductScreen = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	useEffect(() => {
		axios
			.get(`http://localhost:5000/product/get-single/${id}`)
			.then(({ data }) => {
				setProduct(data);
			})
			.catch(err => {
				console.log(err.message);
			});
	}, [id]);
	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price: </Col>
									<Col>
										<strong>{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status: </Col>
									<Col>
										{product.countInStock > 0 ? "In stack" : "Out of Stack"}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className="mx-auto">
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
