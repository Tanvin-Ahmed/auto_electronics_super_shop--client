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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./app/actions/userActions";

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
							<Route path="/" element={<HomeScreen />} />
							<Route path="/product/:id" element={<ProductScreen />} />
							<Route path="/cart/:id" element={<CartScreen />} />
							<Route path="/cart" element={<CartScreen />} />
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
		</>
	);
}

export default App;
