<template>
    <div class="user-status">
        <div v-if="isAuthenticated" class="authenticated">
            <span class="welcome">Xin chào, {{ currentUser?.fullname || currentUser?.username || 'User' }}!</span>
            <span style="padding-left: 10px;">Ví: {{ formatBalance(currentUser?.balance || 0) }} </span>
            <a-button type="primary" @click="handleDeposit" class="edit-profile-btn" size="small">
                <i class="fas fa-money-bill-wave"></i>
                <span style="font-size: 12px; padding-left: 5px;">Nạp tiền</span>
            </a-button>
            <a-button type="primary" @click="handleWithdraw" class="edit-profile-btn" size="small">
                <i class="fas fa-money-bill-wave"></i>
                <span style="font-size: 12px; padding-left: 5px;">Rút tiền</span>
            </a-button>
            <a-button type="link" @click="handleLogout" class="logout-btn">
                Đăng xuất
            </a-button>
        </div>
        <div v-else class="not-authenticated">
            <span>Bạn chưa đăng nhập</span>1
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
import { formatBalance } from '@/utils';

const emit = defineEmits(['open-deposit-popup', 'open-withdraw-popup']);

const isAuthenticated = computed(() => {
    console.log('UserStatus computed isAuthenticated:', store.state.auth.isLogin);
    return store.state.auth.isLogin;
});
const currentUser = computed(() => {
    console.log('UserStatus computed currentUser:', store.state.auth.user);
    return store.state.auth.user;
});

const handleDeposit = () => {
    emit('open-deposit-popup');
};

const handleWithdraw = () => {
    emit('open-withdraw-popup');
};

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
    color: #2c5aa0;
}

.authenticated {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.welcome {
    font-weight: bold;
    color: #ffffff;
}

.logout-btn {
    color: #ff4d4f;
}

.not-authenticated {
    text-align: center;
    color: #666;
}

.english-text {
    color: #ffffff;
}
</style> 