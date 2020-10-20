import createReducer from './reducerUtils'
import {
    LOADING_COURSES,
    LOADING_CURRENT_COURSE,
    FETCH_COURSES,
    FETCH_CURRENT_COURSE,
    UPDATE_COURSE,
    ADD_COURSE,
    DELETE_COURSE
} from '../actions/actionTypes'

const initialState = {
    courses: [],
    currentCourse: null,
    loadingCourses: false,
    loadingCurrentCourse: false
}

const loadingCourses = (state, payload) => {
    return { ...state, loadingCourses: payload.loading }
}

const loadingCurrentCourse = (state, payload) => {
    return { ...state, loadingCurrentCourse: payload.loading }
}

const fetchCourses = (state, payload) => {
    return { ...state, courses: payload.courses }
}

const fetchCurrentCourse = (state, payload) => {
    return { ...state, currentCourse: payload.currentCourse }
}

const addCourse = (state, payload) => {
    return { ...state, courses: payload.courses }
}

const updateCourse = (state, payload) => {
    return { ...state, courses: payload.courses }
}

const deleteCourse = (state, payload) => {
    return { ...state, courses: payload.courses }
}

export default createReducer(initialState, {
    [LOADING_COURSES]: loadingCourses,
    [LOADING_CURRENT_COURSE]: loadingCurrentCourse,
    [FETCH_COURSES]: fetchCourses,
    [FETCH_CURRENT_COURSE]: fetchCurrentCourse,
    [ADD_COURSE]: addCourse,
    [UPDATE_COURSE]: updateCourse,
    [DELETE_COURSE]: deleteCourse
})