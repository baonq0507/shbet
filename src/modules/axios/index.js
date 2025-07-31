import axios from 'axios';
import { getToken } from '@/utils';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(async (response) => {
    return response.data;
}, async (error) => {
    // if (error.response.status === 401) {
    //     localStorage.removeItem('token');
    //     window.location.href = '/login';
    // }
    return Promise.reject(error);
});

export const get = (url, params, callback) => {
    const promise = api.get(url, { params });
    return callback ? promise.then(callback) : promise;
};
export const post = (url, data, callback) => {
    const promise = api.post(url, data);
    return callback ? promise.then(callback) : promise;
};
export const put = (url, data, callback) => {
    const promise = api.put(url, data);
    return callback ? promise.then(callback) : promise;
};
export const del = (url, callback) => {
    const promise = api.delete(url);
    return callback ? promise.then(callback) : promise;
};
export const patch = (url, data, callback) => {
    const promise = api.patch(url, data);
    return callback ? promise.then(callback) : promise;
};

export default api;