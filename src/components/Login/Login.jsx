/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { loginUser } from '../../services';

import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginData } from '../../helpers/localStorage';
import { FORBIDDEN_SYMBOLS, VALID_EMAIL } from '../../helpers/validateStrings';
import { useDispatch } from 'react-redux';
import { saveUsersAction } from '../../store/user/actions';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const loginUserFunc = async (logUser) => {
		loginUser(logUser)
			.then((response) => {
				if (!response.successful) {
					throw new Error(response.result);
				}
				const name = response.user.name;
				const token = response.result.split(' ')[1];
				setLoginData(token, name);
				dispatch(
					saveUsersAction({
						name,
						email: response.user.email,
						token,
					})
				);
				navigate('../courses', { replace: true });
			})
			.catch((e) => alert('Error during user login: ' + e));
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

	const handleLoginEvent = (e) => {
		e.preventDefault();
		if (isValidForm()) {
			const logUser = {
				email,
				password,
			};
			loginUserFunc(logUser);
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
		<form className='login' onSubmit={handleLoginEvent}>
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
