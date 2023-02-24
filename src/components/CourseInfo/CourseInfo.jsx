import React, { useContext } from 'react';

import './CourseInfo.scss';
import { getAuthors } from '../../helpers/courses.js';
import { useParams } from 'react-router';
import { mockedAuthorsList } from '../../constants';
import CourseCard from '../Courses/components/CourseCard/CourseCard';
import { Context } from '../../Store';

const CourseInfo = () => {
	const { courseId } = useParams();
	const [state] = useContext(Context);

	const course = state.courses.find((course) => course.id === courseId);
	return (
		<CourseCard
			id={course.id}
			title={course.title}
			description={course.description}
			duration={course.duration}
			creationDate={course.creationDate}
			authors={getAuthors(course.authors, mockedAuthorsList)}
			backButton
		/>
	);
};

export default CourseInfo;
