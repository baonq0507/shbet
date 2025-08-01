import { createRouter, createWebHistory } from 'vue-router';
import Login from '@views/Login.vue';
import Home from '@views/Home.vue';
import Deposit from '@views/Deposit.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/deposit',
        name: 'deposit',
        component: Deposit
    }
]})

router.beforeEach((to, from, next) => {
    // Thêm logic authentication nếu cần
    // Ví dụ: kiểm tra token trong localStorage
    // const token = localStorage.getItem('token');
    
    // if (to.path === '/login') {
    //     next();
    // } else if (!token && to.path !== '/login') {
    //     next('/login');
    // } else {
    //     next();
    // }
    next();
});

export default router;