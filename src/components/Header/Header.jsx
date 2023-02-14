/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

// import styles
import './Header.scss';

const Header = (props) => {
	const handleEvent = () => {
		alert('Logout clicked');
	};

	return (
		<div className='header'>
			<Logo />
			<span>{props.name}</span>
			<Button buttonText='Logout' onClick={handleEvent}></Button>
		</div>
	);
};

export default Header;
