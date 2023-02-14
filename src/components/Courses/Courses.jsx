/* eslint-disable react/prop-types */
import React from 'react';
import './Courses.scss';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';

const Courses = ({ createCourseEvent, coursesList, authorsList }) => {
	const getAuthors = (authors) => {
		return authors.map((author) => {
			const found = authorsList.find((authorN) => author === authorN.id);
			return found ? found.name : '';
		});
	};
	const createCourseEventCourse = ($e) => {
		$e.preventDefault();
		createCourseEvent();
	};

	return (
		<>
			<div className='banner-bar'>
				<SearchBar />
				<Button buttonText='Create course' onClick={createCourseEventCourse} />
			</div>
			<div className='courses'>
				{coursesList.map((course, index) => {
					return (
						<CourseCard
							key={index}
							id={course.id}
							title={course.title}
							description={course.description}
							duration={course.duration}
							creationDate={course.creationDate}
							authors={getAuthors(course.authors)}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Courses;
