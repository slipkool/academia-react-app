import { toast } from 'react-toastify'
import * as actionTypes from './actionTypes'
import CourseService from '../../api/CourseService'
import { closeModal } from './modalActions'

const loadingCoursesAction = (loading) => {
    return { type: actionTypes.LOADING_COURSES, payload: { loading } }
}

const loadingCurrentCourseAction = (loading) => {
    return { type: actionTypes.LOADING_CURRENT_COURSE, payload: { loading } }
}

const fetchCoursesAction = (courses) => {
    return { type: actionTypes.FETCH_COURSES, payload: { courses } }
}

const fetchCurrentCourseAction = (currentCourse) => {
    return { type: actionTypes.FETCH_CURRENT_COURSE, payload: { currentCourse } }
}

const addCourseAction = (courses) => {
    return { type: actionTypes.ADD_COURSE, payload: { courses } }
}

const updateCourseAction = (courses) => {
    return { type: actionTypes.UPDATE_COURSE, payload: { courses } }
}

const deleteCourseAction = (courses) => {
    return { type: actionTypes.DELETE_COURSE, payload: { courses } }
}

export const fetchCourses = () => async (dispatch) => {
    dispatch(loadingCoursesAction(true))
    try {
        const courses = await CourseService.fetchCourses()

        dispatch(fetchCoursesAction(courses))
        dispatch(loadingCoursesAction(false))
    } catch (error) {
        dispatch(loadingCoursesAction(false))
        toast.error('Problem loading courses')
    }
}

export const fetchCurrentCourse = (id) => async (dispatch) => {
    dispatch(loadingCurrentCourseAction(true))
    try {
        const currentCourse = await CourseService.fetchCourse(id)

        dispatch(fetchCurrentCourseAction(currentCourse))
        dispatch(loadingCurrentCourseAction(false))
    } catch (error) {
        dispatch(loadingCurrentCourseAction(false))
        toast.error('Problem loading the selected course')
    }
}

export const addCourse = (course) => async (dispatch, getState) => {
    dispatch(loadingCurrentCourseAction(true))
    try {
        const newCourse = await CourseService.addCourse(course)
        const coursesUpdate = [...getState().course.courses]
        coursesUpdate.push(newCourse)

        //actualizamos el estado global
        dispatch(addCourseAction(coursesUpdate))
        dispatch(closeModal())
        dispatch(loadingCurrentCourseAction(false))
        toast.success('The course was added successfully')
    } catch (error) {
        dispatch(loadingCurrentCourseAction(false))
        toast.error('Problem adding the course')
    }
}

export const updateCourse = (course) => async (dispatch, getState) => {
    dispatch(loadingCurrentCourseAction(true))
    try {
        const updateCourse = await CourseService.updateCourse(course)
        
        const coursesUpdate = [...getState().course.courses]
        const index = coursesUpdate.findIndex((a) => a.id === updateCourse.id)
        coursesUpdate[index] = updateCourse

        //actualizamos el estado global
        dispatch(updateCourseAction(coursesUpdate))
        dispatch(closeModal())
        dispatch(loadingCurrentCourseAction(false))
        toast.success('The course was updated successfully')
    } catch (error) {
        dispatch(loadingCurrentCourseAction(false))
        toast.error('Problem updating the course')
    }
}

export const deleteCourse = (id) => async (dispatch, getState) => {
    dispatch(loadingCurrentCourseAction(true))
    try {
        await CourseService.deleteCourse(id)
        
        let coursesUpdate = [...getState().course.courses]
        coursesUpdate = coursesUpdate.filter((a) => a.id !== id)

        //actualizamos el estado global
        dispatch(deleteCourseAction(coursesUpdate))
        dispatch(loadingCurrentCourseAction(false))
        toast.success('The course was removed successfully')
    } catch (error) {
        dispatch(loadingCurrentCourseAction(false))
        toast.error('Problem deleting the course')
    }
}