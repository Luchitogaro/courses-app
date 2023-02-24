/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

// import styles
import './Registration.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FORBIDDEN_SYMBOLS, VALID_EMAIL } from '../../helpers/validateStrings';

const Registration = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const registerUser = async (newUser) => {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();

		if (response.status !== 201) {
			alert('Error during user registration: ' + result.errors[0]);
			return;
		} else {
			navigate('../courses', { replace: true });
		}
	};

	const isValidForm = () => {
		if (name.length < 2) {
			alert('Name should have more than 2 letters');
			return false;
		}

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
			const newUser = {
				name,
				email,
				password,
			};
			registerUser(newUser);
		}
	};

	const handleNameChange = (value) => {
		const text = value.target.value;
		if (!FORBIDDEN_SYMBOLS.test(text)) {
			setName(text);
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
		<form className='registration' onSubmit={handleRegisterEvent}>
			<h1>Registration</h1>
			<div className='registration-info'>
				<Input
					labelText='Name'
					type='text'
					placeholder='Enter your name...'
					id='user-name'
					value={name}
					onChange={handleNameChange}
					twoLines
					minLength='2'
					required
				/>
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
			<div className='registration-actions'>
				<Button buttonText='Registration' />
				<div>
					<span>
						If you have an account you can <Link to='/login'> Login </Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default Registration;
