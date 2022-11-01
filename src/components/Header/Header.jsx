import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/image/Logo.png";
import "./Header.scss";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/actions/userActions";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.userLogin);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} className="brand" fluid="true" alt="" />
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
									<div style={{ width: "90px" }}>
										<i className="fas fa-shopping-cart"></i> Cart
									</div>
								</Nav.Link>
							</LinkContainer>
							{userInfo?.email ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={handleLogout}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign in
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin ? (
								<NavDropdown title="Admin" id="adminMenu">
									<LinkContainer to={`/admin/user-list/${1}`}>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={`/admin/product-list/${1}`}>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={`/admin/order-list/${1}`}>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : null}
						</Nav>
						<SearchBox />
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
