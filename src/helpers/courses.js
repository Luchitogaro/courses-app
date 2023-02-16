export const getAuthors = (authors, authorsList) => {
	return authors.map((author) => {
		const found = authorsList.find((authorN) => author === authorN.id);
		return found ? found.name : '';
	});
};
