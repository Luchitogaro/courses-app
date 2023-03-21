/* eslint-disable no-undef */
import { mockedAuthorsList, mockedCoursesList } from '../../constants';

export const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: [...mockedCoursesList],
	authors: [...mockedAuthorsList],
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
