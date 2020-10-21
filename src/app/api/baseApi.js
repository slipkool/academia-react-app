import axios from 'axios';
import { toast } from 'react-toastify';
import { TOKEN_KEY } from '../core/appConstants'
import { getJwt } from '../config/auth/credentials';
import history from '../..' //significa que esta definido en el index

const http = axios.create({
    //baseURL: 'https://spring-boot-mitocode-webflux.herokuapp.com'
    baseURL: 'http://localhost:8080'
});

http.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
      toast.error('Network error - make sure the API server is running')
      window.localStorage.removeItem(TOKEN_KEY)
      history.push('/')
      toast.info('Your session has expired, please login again')
    }
  
    const { status, data, config } = error.response
/*
    if(status === 401 && headers['www-authenticate'].includes('Bearer error="invalid_token", error_description="The token expired"')) {

    }
 */ 
    if (status === 404) {
      history.push('/notFound')
    }
  
    // eslint-disable-next-line no-prototype-builtins
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
      history.push('/notFound')
    }
  
    if (status === 500) {
      toast.error('Server error - check the terminal for more info!')
    }
  
    throw error.response
  })

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