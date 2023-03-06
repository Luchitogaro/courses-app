/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import { isLogedIn } from '../../helpers/localStorage';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../../store/courses/thunk';
import { getAllAuthors } from '../../store/authors/thunk';
import { getUserLoggedIn } from '../../store/user/thunk';

function Layout({ children }) {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			(location.pathname !== '/login' ||
				location.pathname !== '/registration') &&
			!isLogedIn()
		) {
			navigate('/login');
		} else if (
			(location.pathname === '/login' ||
				location.pathname === '/registration') &&
			isLogedIn()
		) {
			navigate('/courses');
		}
		dispatch(getAllCourses());
		dispatch(getAllAuthors());
		dispatch(getUserLoggedIn());
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
