/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../common/Button/Button';
import { formatDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';

// import styles
import './CourseCard.scss';

const getAuthorlist = (authorList) => authorList.join(',');

const CourseCard = (props) => {
	const handleEvent = () => {
		alert('Show course clicked');
	};

	return (
		<div className='course-card'>
			<div className='course-card-main'>
				<h1>{props.title}</h1>
				<p className='course-description'>{props.description}</p>
			</div>
			<div className='course-card-desc'>
				<div className='course-card-authors'>
					<span className='subTitle'>Authors: </span>
					<span className='description'>{getAuthorlist(props.authors)}</span>
				</div>
				<div className='course-card-duration'>
					<span className='subTitle'>Duration: </span>
					<span className='description'>
						{getCourseDuration(props.duration)}
					</span>
				</div>
				<div className='course-card-date'>
					<span className='subTitle'>Created: </span>
					<span className='description'>{formatDate(props.creationDate)}</span>
				</div>
				<div className='course-card-actions'>
					<Button buttonText='Show course' onClick={handleEvent}></Button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
