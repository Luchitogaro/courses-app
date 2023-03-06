import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
	const { user } = useSelector((state) => state);

	const getUserRole = () => {
		return user && user.role === 'admin';
	};
	return getUserRole() ? children : <Navigate to='/login' />;
}

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
