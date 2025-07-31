import { computed } from 'vue';
import { useStore } from 'vuex';

export function useAuth() {
    const store = useStore();

    const isAuthenticated = computed(() => store.state.auth.isLogin);
    const currentUser = computed(() => store.state.auth.user);

    const login = (data) => store.dispatch('auth/login', data);
    const register = (data) => store.dispatch('auth/register', data);
    const logout = () => store.dispatch('auth/logout');
    const checkAuth = () => store.dispatch('auth/checkAuth');

    return {
        isAuthenticated,
        currentUser,
        login,
        register,
        logout,
        checkAuth,
    };
} 