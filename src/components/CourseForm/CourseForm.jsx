/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

// import styles
import './CourseForm.scss';
import { todayDate } from '../../helpers/formatCreationDate';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	addCourseAction,
	updateCoursesAction,
} from '../../store/courses/actions';
import { addAuthorAction } from '../../store/authors/actions';
import { addAuthor, addCourse, updateCourse } from '../../services';

const forbiddenSymbols = /[@#$%^&]/;

const CourseForm = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const isEditingCourse = courseId && courseId.length > 0;

	const dispatch = useDispatch();
	const { courses, authors } = useSelector((state) => state);

	useEffect(() => {
		if (isEditingCourse) {
			const course = courses.find((course) => course.id === courseId);
			if (course) {
				setId(course.id);
				setTitle(course.title);
				setDuration(course.duration);
				setDescription(course.description);
				setCreationDate(course.creationDate);
				const authorsCourse = authors.filter((author) =>
					course.authors.includes(author.id)
				);
				authorsCourse.forEach((author) => addAuthorEvent(author));
			}
		}
	}, []);

	const [id, setId] = useState('');
	const [creationDate, setCreationDate] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(0);
	const [currentAuthorList, setCurrentAuthorList] = useState([]);
	const [generalAuthorList, setGeneralAuthorList] = useState(authors);

	const addAuthorEvent = (author) => {
		setCurrentAuthorList([...currentAuthorList, author]);
		const index = generalAuthorList.findIndex((auth) => auth.id === author.id);
		if (index !== -1) {
			const tmp = [...generalAuthorList];
			tmp.splice(index, 1);
			setGeneralAuthorList(tmp);
		}
	};

	const handleDeleteAuthorEvent = ($e) => {
		$e.preventDefault();
		const author = $e.target.value;

		const index = currentAuthorList.findIndex((auth) => auth.id === author);
		if (index !== -1) {
			const toReturn = currentAuthorList.find((auth) => auth.id === author);
			const tmp = [...currentAuthorList];
			tmp.splice(index, 1);
			setCurrentAuthorList(tmp);
			setGeneralAuthorList([...generalAuthorList, toReturn]);
		}
	};

	const isValidForm = () => {
		if (title.length < 2) {
			alert('Title should have more than 2 letters');
			return false;
		}
		if (description.length < 2) {
			alert('Description should have more than 2 letters');
			return false;
		}
		if (duration < 1) {
			alert('Duration should be more than 1');
			return false;
		}
		if (currentAuthorList.length === 0) {
			alert('Course should have at leat 1 Author');
			return false;
		}
		return true;
	};

	const handleCourseFormEvent = (e) => {
		e.preventDefault();
		if (isValidForm()) {
			const newCourse = {
				id: isEditingCourse ? id : uuidv4(),
				title: title,
				description: description,
				creationDate: isEditingCourse ? creationDate : todayDate(),
				duration: duration,
				authors: currentAuthorList.map((author) => author.id),
			};
			if (isEditingCourse) {
				updateCourse(newCourse)
					.then((response) => {
						if (!response.successful) {
							throw new Error(response.errors);
						}
						navigate('/courses');
						dispatch(updateCoursesAction(newCourse));
					})
					.catch((e) => alert('Error during Course cration: ' + e));
			} else {
				addCourse(newCourse)
					.then((response) => {
						if (!response.successful) {
							throw new Error(response.errors);
						}
						dispatch(addCourseAction({ ...newCourse, id: response.result.id }));
						navigate('/courses');
					})
					.catch((e) => alert('Error during Course cration: ' + e));
			}
		}
	};

	const handleCreateAuthorEvent = ($e) => {
		$e.preventDefault();
		if (authorName.length < 2) {
			alert('Invalid Author name, almost 2 characteres are required');
			return;
		}
		addAuthor({
			name: authorName,
		})
			.then((response) => {
				if (!response.successful) {
					throw new Error(response.errors);
				}

				const newAuthor = {
					name: authorName,
					id: response.result.id,
				};
				dispatch(addAuthorAction(newAuthor));
				setAuthorName('');
				setGeneralAuthorList([...generalAuthorList, newAuthor]);
			})
			.catch((e) => alert('Error during Author cration: ' + e));
	};

	const handleTitleChange = (value) => {
		const text = value.target.value;
		if (!forbiddenSymbols.test(text)) {
			setTitle(text);
		}
	};

	const handleDescriptionChange = (value) => {
		const text = value.target.value;
		if (!forbiddenSymbols.test(text)) {
			setDescription(text);
		}
	};

	const handleAuthorNameChange = (value) => {
		const text = value.target.value;
		if (!forbiddenSymbols.test(text)) {
			setAuthorName(text);
		}
	};

	const handleDurationChange = (value) => {
		const duration = +value.target.value;
		setDuration(duration);
	};

	return (
		<form className='create-course'>
			<div className='course-card-back'>
				<Link to='/courses'>
					<h3>&#60; Back to courses</h3>
				</Link>
			</div>
			<div className='course-info'>
				<div className='course-info-title'>
					<Input
						labelText='Title'
						type='text'
						placeholder='Enter title...'
						id='course-title'
						value={title}
						onChange={handleTitleChange}
						twoLines
						minLength='2'
						required
					/>
					<Button
						buttonText={isEditingCourse ? 'Update course' : 'Create Course'}
						onClick={handleCourseFormEvent}
					/>
				</div>
				<div className='course-info-desc'>
					<Input
						labelText='Description'
						type='text'
						placeholder='Enter description...'
						id='course-description'
						value={description}
						onChange={handleDescriptionChange}
						twoLines
						minLength='2'
						required
					/>
				</div>
			</div>
			<div className='course-additional-info'>
				<div className='row'>
					<div className='col course-authors-create'>
						<h3>Add author</h3>
						<Input
							labelText='Author name'
							type='text'
							placeholder='Enter author name...'
							id='author-name'
							value={authorName}
							onChange={handleAuthorNameChange}
							twoLines={true}
						/>
						<Button
							buttonText='Create author'
							onClick={handleCreateAuthorEvent}
						/>
					</div>
					<div className='col course-duration'>
						<h3>Duration</h3>
						<Input
							labelText='Duration'
							type='number'
							placeholder='Enter course duration...'
							id='course-duration'
							value={duration.toString()}
							onChange={handleDurationChange}
							twoLines
							required
							min='1'
						/>
						<span className='duration-value'>
							Duration: {getCourseDuration(duration)}
						</span>
					</div>
				</div>
				<div className='row'>
					<div className='col course-authors-link'>
						<h3>Authors</h3>

						{generalAuthorList.map((author, index) => {
							return (
								<AuthorItem
									key={index}
									author={author}
									addAuthorEvent={addAuthorEvent}
								/>
							);
						})}
					</div>
					<div className='col course-authors-list'>
						<h3>Course authors</h3>
						{currentAuthorList.map((author, index) => {
							return (
								<div className='add-author' key={index}>
									<span>{author.name}</span>
									<Button
										buttonText='Delete author'
										value={author.id}
										onClick={(e) => handleDeleteAuthorEvent(e, 'value')}
									/>
								</div>
							);
						})}
						{currentAuthorList.length === 0 && (
							<span className='empty'>Author list is empty</span>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

CourseForm.propTypes = {
	CourseFormEvent: PropTypes.func,
	createAuthorEvent: PropTypes.func,
	authorsList: PropTypes.array,
};

export default CourseForm;
