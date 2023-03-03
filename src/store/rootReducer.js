import { combineReducers } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/reducer.js';
import { coursesReducer } from './courses/reducer.js';
import { userReducer } from './user/reducer.js';

export const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
});
