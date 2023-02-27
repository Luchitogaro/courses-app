import { DELETE_USER, SAVE_USER } from './types';

export const deleteUserAction = () => ({
	type: DELETE_USER,
});
export const saveUsersAction = (payload) => ({ type: SAVE_USER, payload });
