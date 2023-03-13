import {
	ADD_COURSE,
	DELETE_COURSE,
	SAVE_COURSES,
	UPDATE_COURSE,
} from './types';

export const addCourseAction = (payload) => ({ type: ADD_COURSE, payload });
export const deleteCourseAction = (payload) => ({
	type: DELETE_COURSE,
	payload,
});
export const saveCoursesAction = (payload) => ({ type: SAVE_COURSES, payload });
export const updateCoursesAction = (payload) => ({
	type: UPDATE_COURSE,
	payload,
});
