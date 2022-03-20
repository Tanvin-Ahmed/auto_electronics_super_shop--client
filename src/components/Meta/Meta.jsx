import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to Auto super shop",
	description: "We sell the best product for cheap",
	keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
