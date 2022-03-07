import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/image/Logo.png";
import "./Header.scss";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} className="brand" alt="" />
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="my-2 my-lg-0 me-auto"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i> Sign in
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
