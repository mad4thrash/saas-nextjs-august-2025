import React from "react";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-auto bg-slate-100 p-4 text-center">
			<p className="text-sm text-gray-600">
				&copy; {year} Converso. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
