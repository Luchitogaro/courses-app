import { DELETE_USER, SAVE_USER } from './types';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

// Use the initialState as a default value
export const userReducer = (state = userInitialState, action) => {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case SAVE_USER:
			return { ...state, ...action.payload, isAuth: true };

		case DELETE_USER:
			return userInitialState;

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
};
