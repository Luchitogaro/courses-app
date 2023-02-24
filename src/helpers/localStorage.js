export const TOKEN = 'token';
export const USER_NAME = 'userName';

export const getUserName = () => {
	return localStorage.getItem(USER_NAME);
};

export const getToken = () => {
	return localStorage.getItem(TOKEN);
};

export const setLoginData = (token, userName) => {
	localStorage.setItem(TOKEN, token);
	localStorage.setItem(USER_NAME, userName);
};

export const removeLoginData = () => {
	localStorage.removeItem(TOKEN);
	localStorage.removeItem(USER_NAME);
};

export const isLogedIn = () => {
	const token = getToken();
	return !!token;
};
