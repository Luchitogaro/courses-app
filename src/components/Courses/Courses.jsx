/* eslint-disable react/prop-types */
import React from 'react';
import './Courses.scss';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import { getAuthors } from '../../helpers/courses.js';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Courses = () => {
	const { courses, authors } = useSelector((state) => state);

	const navigate = useNavigate();

	const CourseFormEventCourse = () => {
		navigate('/courses/add');
	};

	return (
		<>
			<div className='banner-bar'>
				<SearchBar />
				<Button buttonText='Create course' onClick={CourseFormEventCourse} />
			</div>
			<div className='courses'>
				{courses.map((course, index) => {
					return (
						<CourseCard
							key={index}
							id={course.id}
							title={course.title}
							description={course.description}
							duration={course.duration}
							creationDate={course.creationDate}
							authors={getAuthors(course.authors, authors)}
							showMoreButton
						/>
					);
				})}
			</div>
		</>
	);
};

export default Courses;
