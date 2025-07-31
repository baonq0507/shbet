import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import './style.css';

import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

function resolveGLobalComponents(instance) {
    instance.use(Antd);
    instance.use(Vue3Toastify);
}

const app = createApp(App)
app.use(store)
app.use(router)
resolveGLobalComponents(app)

app.use(Vue3Toastify, {
    useHandler: resolveGLobalComponents
})

// Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
console.log('Starting auth check...');
store.dispatch('auth/checkAuth').then((isAuthenticated) => {
    console.log('Auth check result:', isAuthenticated);
    if (isAuthenticated) {
        console.log('User is authenticated, restoring session...');
    } else {
        console.log('User is not authenticated');
    }
    // Mount app sau khi đã kiểm tra auth
    console.log('Mounting app...');
    app.mount('#app');
}).catch((error) => {
    console.error('Auth check error:', error);
    // Mount app ngay cả khi có lỗi
    console.log('Mounting app after auth error...');
    app.mount('#app');
});
