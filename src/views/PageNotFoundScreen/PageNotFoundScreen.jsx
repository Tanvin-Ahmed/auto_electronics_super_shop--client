import React from "react";
import { Container } from "react-bootstrap";
import Meta from "../../components/Meta/Meta";

const PageNotFoundScreen = () => {
	return (
		<>
			<Meta title="Page not found" />
			<Container>
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					style={{ height: "60vh" }}
				>
					<h1>
						<strong>Page not found</strong>
					</h1>
					<h2>
						<strong>
							<i className="fas fa-globe-asia"></i> 404
						</strong>
					</h2>
				</div>
			</Container>
		</>
	);
};

export default PageNotFoundScreen;
