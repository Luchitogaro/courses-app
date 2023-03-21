import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../../../App';
import { mockedStore } from '../../../store/tests/mockedStore';
import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';

describe('Courses tests', () => {
	beforeEach(() =>
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Routes>
						<Route path='courses' element={<Courses />} />
						<Route path='courses/add' element={<CourseForm />} />

						<Route path='*' element={<Navigate to='courses' />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		)
	);

	test('should display amount of CourseCard equal length of courses array', () => {
		expect(screen.queryAllByTestId('course-duration').length).toBe(2);
	});

	test('should be shown after a click on the "Add new course" button', async () => {
		await fireEvent.click(screen.queryByText('Create course'), {});
		expect(screen.queryByPlaceholderText('Enter title...')).toBeInTheDocument();
	});
});
