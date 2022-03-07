import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product/Product";

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/product/get-many/${10}/${1}`)
			.then(({ data }) => {
				setProducts(data);
			})
			.catch(err => {
				console.log(err.message);
			});
	}, []);

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
