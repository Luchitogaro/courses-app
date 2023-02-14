/* eslint-disable react/prop-types */
import React from 'react';

function Input(props) {
	return (
		<div className='input-group'>
			<label htmlFor={props.id}>{props.labelText}</label>
			{props.twoLines ? <br /> : ''}
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
				minLength={props.minLength}
				required={props.required}
				min={props.min}
			/>
		</div>
	);
}

export default Input;
