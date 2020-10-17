import axios from 'axios';
import { getJwt } from '../config/auth/credentials';

const http = axios.create({
    //baseURL: 'https://spring-boot-mitocode-webflux.herokuapp.com'
    baseURL: 'http://localhost:8080'
});

//To add token
http.interceptors.request.use(
    (config) => {
        const token = getJwt();
        if(token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const responseBody = (response) => response.data;

const baseApi = {
    get: (url) => http.get(url).then(responseBody),
    post: (url, body) => http.post(url, body).then(responseBody),
    put: (url, body) => http.put(url, body).then(responseBody),
    delete: (url) => http.delete(url).then(responseBody),
    //upload files
}

export default baseApi;