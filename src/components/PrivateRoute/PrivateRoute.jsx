import React from "react";
import { useSelector } from "react-redux";
import jwt_decoder from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const userAuth = token => {
	if (!token) return false;
	const { exp } = jwt_decoder(token);
	if (Date.now() >= exp * 1000) return false;
	return true;
};

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { userInfo } = useSelector(state => state.userLogin);
	const { token } = userInfo;
	const auth = userAuth(token);
	return auth ? (
		children
	) : (
		<Navigate to="/login" replace state={{ from: location }} />
	);
};

export default PrivateRoute;
