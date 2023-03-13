import { getAuthors } from '../../services';

export const getAllAuthors = () => {
	return async function (dispatch) {
		const authorsFromServer = await getAuthors();

		dispatch({
			type: 'SAVE_AUTHORS',
			payload: authorsFromServer.result,
		});
	};
};
