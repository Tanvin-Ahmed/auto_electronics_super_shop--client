import { Container } from "react-bootstrap";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./views/ProductScreen/ProductScreen";
import CartScreen from "./views/CartScreen/CartScreen";

function App() {
	return (
		<>
			<Router>
				<Header />
				<main className="py-3">
					<Container>
						<Routes>
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
