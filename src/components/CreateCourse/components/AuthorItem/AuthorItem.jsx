/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../common/Button/Button';

// import styles
import './AuthorItem.scss';

const AuthorItem = ({ author, addAuthorEvent }) => {
	const handleCreateAuthorEvent = ($e) => {
		$e.preventDefault();
		addAuthorEvent(author);
	};
	return (
		<div className='add-author'>
			<span>{author.name}</span>
			<Button buttonText='Add author' onClick={handleCreateAuthorEvent} />
		</div>
	);
};

export default AuthorItem;
