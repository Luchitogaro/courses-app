import { getToken } from './helpers/localStorage';

export const HOST = 'http://localhost:4000';

export const getCourses = async () => {
	const response = await fetch(`${HOST}/courses/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const getAuthors = async () => {
	const response = await fetch(`${HOST}/authors/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const loginUser = async (logUser) => {
	const response = await fetch(`${HOST}/login`, {
		method: 'POST',
		body: JSON.stringify(logUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const registerUser = async (newUser) => {
	const response = await fetch(`${HOST}/register`, {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const logoutUser = async () => {
	const response = await fetch(`${HOST}/logout`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getToken(),
		},
	});
	return response;
};
