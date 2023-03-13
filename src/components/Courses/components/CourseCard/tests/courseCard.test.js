import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from '../../../../../constants';
import { getAuthors } from '../../../../../helpers/courses';
import { mockedStore } from '../../../../../store/tests/mockedStore';
import CourseCard from '../CourseCard';

describe('CourseCard tests', () => {
	const course = { ...mockedCoursesList[0] };
	beforeEach(() =>
		render(
			<BrowserRouter>
				<Provider store={mockedStore}>
					<CourseCard
						id={course.id}
						title={course.title}
						description={course.description}
						duration={course.duration}
						creationDate={course.creationDate}
						authors={getAuthors(course.authors, mockedAuthorsList)}
					/>
				</Provider>
			</BrowserRouter>
		)
	);

	test('should display title', () => {
		expect(screen.queryByText('JavaScript')).toBeInTheDocument();
	});

	test('should display description', () => {
		expect(screen.queryByTestId('course-description')).toBeInTheDocument();
	});

	test('should display duration in the correct format', () => {
		expect(screen.queryByTestId('course-duration').innerHTML).toEqual(
			'02:40 hours'
		);
	});

	test('should display authors list', () => {
		expect(screen.queryByTestId('course-authors').innerHTML).toEqual(
			'Vasiliy Dobkin, Nicolas Kim'
		);
	});

	test('should display created date in the correct format', () => {
		expect(screen.queryByTestId('course-creation-date').innerHTML).toEqual(
			'08.03.2021'
		);
	});
});
