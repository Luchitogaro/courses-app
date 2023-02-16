/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import { isLogedIn } from '../../helpers/localStorage';
import PropTypes from 'prop-types';

function Layout({ children }) {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			(location.pathname !== '/login' ||
				location.pathname !== '/registration') &&
			!isLogedIn()
		) {
			navigate('/login');
		}
	}, []);

	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;
