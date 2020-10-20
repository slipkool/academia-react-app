import { COURSES_ENDPOINT } from '../core/appConstants';
import baseApi from './baseApi';

//Esta clase se manejará con reducer a lo que se creara el reducer y el action correspondiente
const getCourseUrl = (id) => `${COURSES_ENDPOINT}/${id}`;

class CourseService {
    static fetchCourses = () => baseApi.get(COURSES_ENDPOINT);

    static fetchCourse = (id) => baseApi.get(getCourseUrl(id));

    static addCourse = (course) => baseApi.post(COURSES_ENDPOINT, course);

    static updateCourse = (course) => baseApi.put(getCourseUrl(course.id), course);

    static deleteCourse = (id) => baseApi.delete(getCourseUrl(id));
}

export default CourseService;