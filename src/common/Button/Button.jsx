import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, buttonText, onClick, value }) => (
	<button value={value} onClick={onClick}>
		{children ?? buttonText}
	</button>
);
Button.propTypes = {
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
	value: PropTypes.string,
	children: PropTypes.node,
};
export default Button;
