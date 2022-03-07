import { Container } from "react-bootstrap";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./views/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./views/ProductScreen/ProductScreen";

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
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
		</>
	);
}

export default App;
