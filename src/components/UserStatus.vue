<template>
    <div class="user-status">
        <div v-if="isAuthenticated" class="authenticated">
            <span class="welcome">Xin chào, {{ currentUser?.fullname || currentUser?.username || 'User' }}!</span>
            <a-button type="link" @click="handleLogout" class="logout-btn">
                Đăng xuất
            </a-button>
        </div>
        <div v-else class="not-authenticated">
            <span>Bạn chưa đăng nhập</span>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();

const isAuthenticated = computed(() => {
    console.log('UserStatus computed isAuthenticated:', store.state.auth.isLogin);
    return store.state.auth.isLogin;
});
const currentUser = computed(() => {
    console.log('UserStatus computed currentUser:', store.state.auth.user);
    return store.state.auth.user;
});

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout');
        toast.success('Đăng xuất thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    } catch (error) {
        toast.error('Có lỗi xảy ra khi đăng xuất', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
};
</script>

<style scoped>
.user-status {
    padding: 10px;
    border-radius: 8px;
    margin: 10px 0;
    color: #FFD700;
}

.authenticated {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.welcome {
    font-weight: bold;
    color: #FFD700;
}

.logout-btn {
    color: #ff4d4f;
}

.not-authenticated {
    text-align: center;
    color: #666;
}
</style> 