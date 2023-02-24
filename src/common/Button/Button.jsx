import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonText, onClick, value }) => (
	<button value={value} onClick={onClick}>
		{buttonText}
	</button>
);
Button.propTypes = {
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
	value: PropTypes.string,
};
export default Button;
