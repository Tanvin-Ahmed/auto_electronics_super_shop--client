import { Container } from "react-bootstrap";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./views/ProductScreen/ProductScreen";
import CartScreen from "./views/CartScreen/CartScreen";
import LoginScreen from "./views/LoginScreen/LoginScreen";
import ProfileScreen from "./views/ProfileScreen/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ShippingScreen from "./views/ShippingScreen/ShippingScreen";
import { useEffect } from "react";
import { refreshToken } from "./app/actions/userActions";
import { useDispatch } from "react-redux";
import PaymentScreen from "./views/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./views/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./views/OrderScreen/OrderScreen";
import UserListScreen from "./views/UserListScreen/UserListScreen";
import PageNotFoundScreen from "./views/PageNotFoundScreen/PageNotFoundScreen";
import UserEditScreen from "./views/UserEditScreen/UserEditScreen";
import ProductListScreen from "./views/ProductListScreen/ProductListScreen";
import OrderListScreen from "./views/OrderListScreen/OrderListScreen";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);

	return (
		<>
			<Router>
				<Header />
				<main className="py-3">
					<Container>
						<Routes>
							<Route path="/login" element={<LoginScreen />} />
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<ProfileScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/shipping"
								element={
									<PrivateRoute>
										<ShippingScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/payment"
								element={
									<PrivateRoute>
										<PaymentScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/place-order"
								element={
									<PrivateRoute>
										<PlaceOrderScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/order/:id"
								element={
									<PrivateRoute>
										<OrderScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/user-list"
								element={
									<PrivateRoute>
										<UserListScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/user/:id/edit"
								element={
									<PrivateRoute>
										<UserEditScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/product-list"
								element={
									<PrivateRoute>
										<ProductListScreen />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/order-list"
								element={
									<PrivateRoute>
										<OrderListScreen />
									</PrivateRoute>
								}
							/>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/product/:id" element={<ProductScreen />} />
							<Route path="/cart/:id" element={<CartScreen />} />
							<Route path="/cart" element={<CartScreen />} />
							<Route path="*" element={<PageNotFoundScreen />} />
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
		</>
	);
}

export default App;
