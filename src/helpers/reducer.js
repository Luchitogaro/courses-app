const Reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_COURSE':
			return {
				...state,
				courses: state.courses.concat(action.payload),
			};
		case 'ADD_AUTHOR':
			return {
				...state,
				authors: state.authors.concat(action.payload),
			};
		default:
			return state;
	}
};

export default Reducer;
