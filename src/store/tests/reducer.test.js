import { mockedCoursesList } from '../../constants';
import { addCourseAction } from '../courses/actions';
import { coursesReducer } from '../courses/reducer';

describe('coursesReducer tests', () => {
	test('should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual([]);
	});

	test('should return the new state after SAVE', () => {
		const previousState = [];

		expect(
			coursesReducer(
				previousState,
				addCourseAction({ ...mockedCoursesList[0] })
			)
		).toEqual([mockedCoursesList[0]]);
	});
});
