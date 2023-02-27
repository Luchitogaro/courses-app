import { DELETE_USER, SAVE_USER } from './types';

export const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage.
	// After success login - value from API /login response. See Swagger.
};

// Use the initialState as a default value
export const userReducer = (state = userInitialState, action) => {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case SAVE_USER:
			return action.payload;

		case DELETE_USER:
			return userInitialState;

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
};
