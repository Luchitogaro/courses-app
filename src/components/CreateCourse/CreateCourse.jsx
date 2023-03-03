/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

// import styles
import './CreateCourse.scss';
import { todayDate } from '../../helpers/formatCreationDate';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseAction } from '../../store/courses/actions';
import { addAuthorAction } from '../../store/authors/actions';

const forbiddenSymbols = /[@#$%^&]/;

const CreateCourse = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { authors } = useSelector((state) => state);

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

	const handleCreateCourseEvent = (e) => {
		e.preventDefault();
		if (isValidForm()) {
			const newCourse = {
				id: uuidv4(),
				title: title,
				description: description,
				creationDate: todayDate(),
				duration: duration,
				authors: currentAuthorList.map((author) => author.id),
			};
			dispatch(addCourseAction(newCourse));
			navigate('/courses');
		}
	};

	const handleCreateAuthorEvent = ($e) => {
		$e.preventDefault();
		if (authorName.length < 2) {
			alert('Invalid Author name, almost 2 characteres are required');
			return;
		}
		const newAuthor = {
			id: uuidv4(),
			name: authorName,
		};
		dispatch(addAuthorAction(newAuthor));
		setAuthorName('');
		setGeneralAuthorList([...generalAuthorList, newAuthor]);
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
						buttonText='Create Course'
						onClick={handleCreateCourseEvent}
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

CreateCourse.propTypes = {
	createCourseEvent: PropTypes.func,
	createAuthorEvent: PropTypes.func,
	authorsList: PropTypes.array,
};

export default CreateCourse;
