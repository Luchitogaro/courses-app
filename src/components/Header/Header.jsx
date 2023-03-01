/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

// import styles
import './Header.scss';
import { isLogedIn, removeLoginData } from '../../helpers/localStorage';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction } from '../../store/user/actions';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);

	const getUserName = () => {
		return user?.name;
	};

	const handleEvent = async () => {
		if (isLogedIn) {
			logoutUser()
				.then(() => {
					removeLoginData();
					dispatch(deleteUserAction());
					navigate('/login', true);
				})
				.catch((e) => alert('Error during user logout: ' + e));
		}
	};

	return (
		<header className='header'>
			<Logo />
			<span>{getUserName()}</span>
			{isLogedIn() && (
				<Button
					buttonText={isLogedIn ? 'Logout' : 'Login'}
					onClick={handleEvent}></Button>
			)}
		</header>
	);
};

export default Header;
