import { ADD_COURSE, DELETE_COURSE, SAVE_COURSES } from './types';

export const coursesInitialState = [];

// Use the initialState as a default value
export const coursesReducer = (state = coursesInitialState, action) => {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case SAVE_COURSES:
			return [...state, ...action.payload];

		case ADD_COURSE:
			return [...state, action.payload];

		case DELETE_COURSE: {
			const index = state.findIndex((course) => {
				return course.id === action.payload;
			});
			return [...state.slice(0, index), ...state.slice(index + 1)];
		}
		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
};
