import { ENROLLMENT_ENDPOINT } from '../core/appConstants';
import baseApi from './baseApi';

//Esta clase se manejará con reducer a lo que se creara el reducer y el action correspondiente
const getEnrollmentUrl = (id) => `${ENROLLMENT_ENDPOINT}/${id}`;

class EnrollmentService {
    static fetchEnrollments = () => baseApi.get(ENROLLMENT_ENDPOINT);

    static fetchEnroll = (id) => baseApi.get(getEnrollmentUrl(id));

    static addEnroll = (enroll) => baseApi.post(ENROLLMENT_ENDPOINT, enroll);

    static updateEnroll = (enroll) => baseApi.put(getEnrollmentUrl(enroll.id), enroll);

    static deleteEnroll = (id) => baseApi.delete(getEnrollmentUrl(id));
}

export default EnrollmentService;