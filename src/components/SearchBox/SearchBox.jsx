import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const submitHandler = e => {
		e.preventDefault();

		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate(`/`);
		}
	};

	return (
		<Form className="d-flex" onSubmit={submitHandler}>
			<Form.Control
				type="search"
				className="me-2"
				aria-label="Search"
				onChange={e => setKeyword(e.target.value)}
				placeholder="Search products..."
				value={keyword}
			/>
			<Button variant="outline-success" type="submit">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
