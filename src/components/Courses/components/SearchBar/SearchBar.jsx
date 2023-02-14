/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

// import styles
import './SearchBar.scss';

const SearchBar = () => {
	const searchEvent = () => {
		alert('Search clicked');
	};

	const onInputChange = (value) => {
		console.log('Input value:', value);
	};

	return (
		<div className='search-bar'>
			<Input
				placeholder='Enter course name or Id...'
				onChange={onInputChange}
				id='course-search'
				labelText=''
			/>
			<Button buttonText='Search' onClick={searchEvent}></Button>
		</div>
	);
};

export default SearchBar;
