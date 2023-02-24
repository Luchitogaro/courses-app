/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

// import styles
import './Header.scss';
import {
	getToken,
	getUserName,
	isLogedIn,
	removeLoginData,
} from '../../helpers/localStorage';
import { useNavigate } from 'react-router';

const Header = () => {
	const navigate = useNavigate();
	const handleEvent = async () => {
		if (isLogedIn) {
			const response = await fetch('http://localhost:4000/logout', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken(),
				},
			});

			if (response.status !== 200) {
				alert('Error during user logout.');
				return;
			} else {
				removeLoginData();
				navigate('/login', true);
			}
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
