import { login, register, logout, getUser as getUserAPI, forgotPassword, resetPassword } from '../../services/auth';
import { saveToken, removeToken, getToken, saveUser, removeUser, getUser } from '../../utils';

const state = {
    user: null,
    isLogin: false,
};

// Khởi tạo state từ localStorage khi module được load
const initState = () => {
    const token = getToken();
    const user = getUser();
    
    console.log('initState - token:', token);
    console.log('initState - user:', user);
    
    if (token && user) {
        try {
            state.user = user;
            state.isLogin = true;
            console.log('initState - State restored from localStorage:', state);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            removeToken();
            removeUser();
        }
    } else {
        console.log('initState - No valid token or user found');
    }
};

// Gọi initState khi module được load
initState();

const mutations = {
    setUser(state, user) {
        console.log('Setting user in state:', user);
        state.user = user;
        state.isLogin = !!user;
        console.log('State after setUser - user:', state.user, 'isLogin:', state.isLogin);
        
        // Lưu user data vào localStorage
        if (user) {
            saveUser(user);
            console.log('User saved to localStorage');
        } else {
            removeUser();
            console.log('User removed from localStorage');
        }
    },
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin;
    },
};

const getters = {
    isAuthenticated: (state) => state.isLogin,
    currentUser: (state) => state.user,
};

const actions = {
    async login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data, (response) => {
                console.log('Login response:', response);
                if (response.token) {
                    saveToken(response.token);
                }
                if (response.user) {
                    commit('setUser', response.user);
                }
                resolve(response);
            }).catch(reject);
        });
    },
    async register({ commit }, data) {
        return new Promise((resolve, reject) => {
            register(data, (response) => {
                console.log('Register response:', response);
                if (response.token) {
                    saveToken(response.token);
                }
                if (response.user) {
                    commit('setUser', response.user);
                }
                resolve(response);
            }).catch(reject);
        });
    },
    async logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout(() => {
                removeToken();
                removeUser();
                commit('setUser', null);
                resolve();
            }).catch(reject);
        });
    },
    async getUser({ commit }) {
        return new Promise((resolve, reject) => {
            getUserAPI((response) => {
                commit('setUser', response.user);
                resolve(response);
            }).catch(reject);
        });
    },
    async forgotPassword({ commit }, data) {
        return new Promise((resolve, reject) => {
            forgotPassword(data, (response) => {
                resolve(response);
            }).catch(reject);
        });
    },
    async resetPassword({ commit }, data) {
        return new Promise((resolve, reject) => {
            resetPassword(data, (response) => {
                resolve(response);
            }).catch(reject);
        });
    },
    
    // Action để kiểm tra và khôi phục trạng thái đăng nhập
    async checkAuth({ commit }) {
        const token = getToken();
        const user = getUser();
        console.log('Token:', token);
        console.log('User from localStorage:', user);
        
        if (!token || !user) {
            console.log('No token or user found, user not authenticated');
            return false;
        }

        // Khôi phục user data vào state
        commit('setUser', user);
        console.log('User authenticated and restored from localStorage');
        return true;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};