<script setup>
import { ref, reactive } from 'vue';
import { toast } from 'vue3-toastify';
import { useAuth } from '@/composables/useAuth';

const { login } = useAuth();
const isLoading = ref(false);

const form = reactive({
    username: '',
    password: ''
});

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:visible']);

const handleClose = () => {
    emit('update:visible', false);
};

const handleFinish = async (values) => {
    isLoading.value = true;
    try {
        const result = await login(values);
        toast.success('Đăng nhập thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
        handleClose();
    } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đăng nhập', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <a-modal v-model:visible="props.visible" centered :maskClosable="false" :footer="false" @cancel="handleClose" width="600px" class="login-modal">
        <div class="login-container">
            <!-- Header Section -->
            <div class="header-section">
                <div class="logo-section">
                    <div class="logo">
                        <img src="/src/assets/logo.jpg" alt="logo" class="logo-img" />
                    </div>
                    <div class="signature">
                        <img src="/src/assets/chuky.png" alt="Chữ ký" class="signature-img" />
                    </div>
                </div>
                <div class="brand-ambassador">
                    <h2>Đại Sứ Thương Hiệu Iniesta 2024 - 2025</h2>
                </div>
            </div>

            <!-- Form Section -->
            <a-form :model="form" autocomplete="off" @finish="handleFinish" layout="vertical" class="login-form">
                <a-form-item 
                    label="Tên tài khoản" 
                    name="username" 
                    :rules="[
                        { required: true, message: 'Vui lòng nhập tên tài khoản' }
                    ]"
                >
                    <div class="field-container">
                        <a-input 
                            v-model:value="form.username" 
                            placeholder="Vui lòng nhập tên tài khoản"
                            class="custom-input"
                        />
                    </div>
                </a-form-item>

                <a-form-item 
                    label="Mật khẩu" 
                    name="password" 
                    :rules="[
                        { required: true, message: 'Vui lòng nhập mật khẩu' }
                    ]"
                >
                    <div class="field-container">
                        <a-input-password 
                            v-model:value="form.password" 
                            placeholder="Vui lòng nhập mật khẩu"
                            class="custom-input"
                        />
                    </div>
                </a-form-item>

                <!-- Submit Button -->
                <div class="submit-section">
                    <a-button type="primary" html-type="submit" size="large" class="login-button" :loading="isLoading">
                        ĐĂNG NHẬP
                    </a-button>
                </div>
            </a-form>
        </div>
    </a-modal>
</template>

<style scoped>
.login-modal {
    background: linear-gradient(135deg, #ffffff 0%, #4a90e2 100%);
}

.login-container {
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
    background: #ffffff;
}

.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #4a90e2;
    background: transparent;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-img {
    filter: drop-shadow(0 0 2px #4a90e2);
}

.signature-img {
    height: 40px;
    width: auto;
    filter: drop-shadow(0 0 2px #4a90e2);
}

.brand-ambassador h2 {
    color: #2c5aa0;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.login-form {
    margin-top: 20px;
}

.field-container {
    position: relative;
}

.custom-input {
    border-radius: 8px;
    padding: 12px 15px;
    font-size: 14px;
    background: #ffffff;
    color: #2c5aa0;
    transition: all 0.3s ease;
}

.custom-input:focus {
    border-color: #4a90e2 !important;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    background: #ffffff;
    color: #2c5aa0;
    outline: #4a90e2;
}

.custom-input::placeholder {
    color: #999;
    opacity: 1;
}

.submit-section {
    text-align: center;
    margin-top: 20px;
}

.login-button {
    background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
    color: #fff;
    border: none;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
    transition: background 0.3s, color 0.3s, transform 0.2s;
    width: 100%;
}

.login-button:hover {
    background: linear-gradient(90deg, #357abd 0%, #4a90e2 100%);
    color: #fff;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 5px 15px rgba(255, 214, 0, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-section {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
}
</style>
