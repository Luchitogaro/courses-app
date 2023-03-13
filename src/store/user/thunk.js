import { getUser } from '../../services';

export const getUserLoggedIn = () => {
	return async function (dispatch) {
		const userFromServe = await getUser();

		dispatch({
			type: 'SAVE_USER',
			payload: userFromServe.result,
		});
	};
};
