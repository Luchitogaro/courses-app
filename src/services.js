import { getToken } from './helpers/localStorage';

export const HOST = 'http://localhost:4000';

export const getCourses = () => {
	const response = fetch(`${HOST}/courses/all`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.then((response) => response.json());
};

export const addCourse = async (course) => {
	const response = await fetch(`${HOST}/courses/add`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const updateCourse = async (course) => {
	const response = await fetch(`${HOST}/courses/${course.id}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const deleteCourse = async (id) => {
	const response = await fetch(`${HOST}/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const getAuthors = () => {
	const response = fetch(`${HOST}/authors/all`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.then((response) => response.json());
};

export const addAuthor = async (author) => {
	const response = await fetch(`${HOST}/authors/add`, {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			Authorization: 'Bearer ' + getToken(),
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
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const getUser = () => {
	const response = fetch(`${HOST}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
		},
	});
	return response.then((response) => response.json());
};

export const registerUser = async (newUser) => {
	const response = await fetch(`${HOST}/register`, {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			Authorization: 'Bearer ' + getToken(),
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
