import { post, get, del } from '../modules/axios';

const login = (data, callback) => post('/auth/login', data, callback);

const register = (data, callback) => post('/auth/register', data, callback);

const logout = (callback) => del('/auth/logout', callback);

const getUser = (callback) => get('/auth/me', callback);

const forgotPassword = (data, callback) => post('/auth/forgot-password', data, callback);

const resetPassword = (data, callback) => post('/auth/reset-password', data, callback);

export { login, register, logout, getUser, forgotPassword, resetPassword };