/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ buttonText, onClick, value }) => (
	<button value={value} onClick={onClick}>
		{buttonText}
	</button>
);

export default Button;
