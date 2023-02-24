/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

// import styles
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginData } from '../../helpers/localStorage';
import { FORBIDDEN_SYMBOLS, VALID_EMAIL } from '../../helpers/validateStrings';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const registerUser = async (logUser) => {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(logUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (response.status !== 201) {
			alert('Error during user login: ' + result.result);
			return;
		} else {
			setLoginData(result.result.split(' ')[1], result.user.name);
			navigate('../courses', { replace: true });
		}
	};

	const isValidForm = () => {
		if (email.length < 2 && !email.match(VALID_EMAIL)) {
			alert('Email should have more than 2 letters and valid email address');
			return false;
		}
		if (password < 4) {
			alert('Password should be more than 4');
			return false;
		}
		return true;
	};

	const handleRegisterEvent = (e) => {
		e.preventDefault();
		if (isValidForm()) {
			const logUser = {
				email,
				password,
			};
			registerUser(logUser);
		}
	};

	const handlePasswordChange = (value) => {
		const text = value.target.value;
		if (!FORBIDDEN_SYMBOLS.test(text)) {
			setPassword(text);
		}
	};

	const handleEmailChange = (value) => {
		const text = value.target.value;
		if (!FORBIDDEN_SYMBOLS.test(text)) {
			setEmail(text);
		}
	};

	return (
		<form className='login' onSubmit={handleRegisterEvent}>
			<h1>Login</h1>
			<div className='login-info'>
				<Input
					labelText='Email'
					type='email'
					placeholder='Enter your email...'
					id='user-email'
					value={email}
					onChange={handleEmailChange}
					twoLines
					minLength='2'
					required
				/>
				<Input
					labelText='Password'
					type='password'
					placeholder='Enter your password...'
					id='user-pass'
					value={password}
					onChange={handlePasswordChange}
					twoLines
					minLength='2'
					required
				/>
			</div>
			<div className='login-actions'>
				<Button buttonText='Login' />
				<div>
					<span>
						If you not have an account you can{' '}
						<Link to='/registration'>Registration</Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Login;
