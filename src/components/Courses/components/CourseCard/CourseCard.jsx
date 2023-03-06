/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../common/Button/Button';
import { formatDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteCourseAction } from '../../../../store/courses/actions';
import { useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';

// import styles
import './CourseCard.scss';
import { deleteCourse } from '../../../../services';

const getAuthorlist = (authorList) => authorList.join(', ');

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	showMoreButton,
	isAdminUser,
	backButton,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleEvent = () => {
		navigate('/courses/' + id);
	};
	const handleEventEdit = () => {
		navigate('/courses/update/' + id);
	};
	const handleEventRemove = () => {
		deleteCourse(id)
			.then(() => {
				dispatch(deleteCourseAction(id));
			})
			.catch((e) => alert('Error during Course deleting: ' + e));
	};

	return (
		<div className='course-card'>
			<div className='course-card-main'>
				{backButton && (
					<div className='course-card-back'>
						<Link to={navigate(-1)}>
							<h3>&#60; Back to courses</h3>
						</Link>
					</div>
				)}
				<h1>{title}</h1>
				<p className='course-description'>{description}</p>
			</div>
			<div className='course-card-desc'>
				<div className='course-card-id'>
					<span className='subTitle'>ID: </span>
					<span className='description'>{id}</span>
				</div>
				<div className='course-card-authors'>
					<span className='subTitle'>Authors: </span>
					<span className='description'>{getAuthorlist(authors)}</span>
				</div>
				<div className='course-card-duration'>
					<span className='subTitle'>Duration: </span>
					<span className='description'>{getCourseDuration(duration)}</span>
				</div>
				<div className='course-card-date'>
					<span className='subTitle'>Created: </span>
					<span className='description'>{formatDate(creationDate)}</span>
				</div>
				{showMoreButton && (
					<div className='course-card-actions'>
						<Button buttonText='Show course' onClick={handleEvent}></Button>
						{isAdminUser && (
							<>
								<Button onClick={handleEventEdit}>
									<FaEdit />
								</Button>
								<Button onClick={handleEventRemove}>
									<FaTrash />
								</Button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.array,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	showMoreButton: PropTypes.bool,
	isAdminUser: PropTypes.bool,
	backButton: PropTypes.bool,
};

export default CourseCard;
