import { getCourses } from '../../services';

export const getAllCourses = () => {
	return async function (dispatch) {
		const coursesFromServer = await getCourses();

		dispatch({
			type: 'SAVE_COURSES',
			payload: coursesFromServer.result,
		});
	};
};
