import { ADD_AUTHOR, DELETE_AUTHOR, SAVE_AUTHORS } from './types';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case SAVE_AUTHORS:
			return action.payload;

		case ADD_AUTHOR:
			return [...state, action.payload];

		case DELETE_AUTHOR: {
			const index = state.authors.indexOf(
				(course) => course.id === action.payload
			);
			return [
				...state.authors.slice(0, index),
				...state.authors.slice(index + 1),
			];
		}

		default:
			return state;
	}
};
