import { ADD_AUTHOR, DELETE_AUTHOR, SAVE_AUTHORS } from './types';

export const authorsInitialState = [];

// Use the initialState as a default value
export const authorsReducer = (state = authorsInitialState, action) => {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case SAVE_AUTHORS:
			return [...state, ...action.payload];

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
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
};
