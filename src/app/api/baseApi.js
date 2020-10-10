import axios from 'axios';

const http = axios.create({
    //baseURL: 'https://spring-boot-mitocode-webflux.herokuapp.com'
    baseURL: 'http://localhost:8080'
});

//To add token
http.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ0ZXN0IjoicHJvYmFuZG8uLi4uIiwicm9sZXMiOlsiQURNSU4iXSwic3ViIjoibWl0b2NvZGUiLCJpYXQiOjE2MDIyOTkxNTYsImV4cCI6MTYwMjMwMjc1Nn0.TY11WHzDUSm_qWAqxSZJ-Z842OcXpnT41SfCTDR0Witl84xbmn1Ku4m5bVlh4t-J5DgmQ53AqzKcSH4cJu4M2g';
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