/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import { mockedAuthorsList, mockedCoursesList } from './constants';
import Reducer from './helpers/reducer';

const initialState = {
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const Store = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
	);
};

export const Context = createContext(initialState);
export default Store;