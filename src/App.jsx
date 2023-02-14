import React, { useState } from 'react';
import './App.scss';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import { mockedAuthorsList, mockedCoursesList } from './constants';

function App() {
	const [listCourses, setListCourses] = useState(true);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

	const createCourseButtonEvent = () => {
		setListCourses(!listCourses);
	};

	const createCourseFormEvent = (course) => {
		setCoursesList([...coursesList, course]);
		setListCourses(!listCourses);
	};

	const createAuthorFormEvent = (author) => {
		setAuthorsList([...authorsList, author]);
	};

	return (
		<>
			<header>
				<Header name='Luis G.'></Header>
			</header>
			<body>
				{listCourses ? (
					<Courses
						coursesList={coursesList}
						authorsList={authorsList}
						createCourseEvent={createCourseButtonEvent}
					/>
				) : (
					<CreateCourse
						authorsList={authorsList}
						createCourseEvent={createCourseFormEvent}
						createAuthorEvent={createAuthorFormEvent}
					/>
				)}
			</body>
		</>
	);
}

export default App;
