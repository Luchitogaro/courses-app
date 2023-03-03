/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import { isLogedIn } from '../../helpers/localStorage';
import PropTypes from 'prop-types';
import { getCourses, getAuthors } from '../../services';
import { useDispatch } from 'react-redux';
import { saveCoursesAction } from '../../store/courses/actions';
import { saveAuthorsAction } from '../../store/authors/actions';

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
		getCourses().then((response) => {
			dispatch(saveCoursesAction([...response.result]));
		});
		getAuthors().then((response) => {
			dispatch(saveAuthorsAction([...response.result]));
		});
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
