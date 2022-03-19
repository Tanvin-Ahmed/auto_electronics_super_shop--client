import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTopProducts } from "../../app/actions/productActions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import "./ProductCarousel.scss";

const ProductCarousel = () => {
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector(
		state => state.topRatedProductList
	);

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Carousel>
			{products.map(product => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} fluid alt={product.name} />
						<Carousel.Caption className="carousel-caption">
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
