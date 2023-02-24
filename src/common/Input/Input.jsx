import React from 'react';
import PropTypes from 'prop-types';

function Input({
	id,
	labelText,
	twoLines,
	value,
	type,
	placeholder,
	onChange,
	minLength,
	required,
	min,
}) {
	return (
		<div className='input-group'>
			<label htmlFor={id}>{labelText}</label>
			{twoLines ? <br /> : ''}
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				minLength={minLength}
				required={required}
				min={min}
			/>
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	labelText: PropTypes.string,
	twoLines: PropTypes.bool,
	value: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	minLength: PropTypes.string,
	required: PropTypes.bool,
	min: PropTypes.string,
};

export default Input;
