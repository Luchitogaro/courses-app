import {
	ADD_COURSE,
	DELETE_COURSE,
	SAVE_COURSES,
	UPDATE_COURSE,
} from './types';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case SAVE_COURSES:
			return action.payload;

		case ADD_COURSE:
			return [...state, action.payload];

		case UPDATE_COURSE: {
			const index = state.find((course) => {
				return course.id === action.payload.id;
			});
			state[index] = action.payload;
			return [...state];
		}

		case DELETE_COURSE: {
			const index = state.findIndex((course) => {
				return course.id === action.payload;
			});
			return [...state.slice(0, index), ...state.slice(index + 1)];
		}
		default:
			return state;
	}
};
