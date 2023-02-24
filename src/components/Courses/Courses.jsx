/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import './Courses.scss';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import { getAuthors } from '../../helpers/courses.js';
import { useNavigate } from 'react-router';
import { Context } from '../../Store';

const Courses = () => {
	const [state] = useContext(Context);
	const navigate = useNavigate();

	const createCourseEventCourse = () => {
		navigate('/courses/add');
	};

	return (
		<>
			<div className='banner-bar'>
				<SearchBar />
				<Button buttonText='Create course' onClick={createCourseEventCourse} />
			</div>
			<div className='courses'>
				{state.courses.map((course, index) => {
					return (
						<CourseCard
							key={index}
							id={course.id}
							title={course.title}
							description={course.description}
							duration={course.duration}
							creationDate={course.creationDate}
							authors={getAuthors(course.authors, state.authors)}
							showMoreButton
						/>
					);
				})}
			</div>
		</>
	);
};

export default Courses;
