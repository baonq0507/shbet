<script setup>
import { ref, reactive, computed } from 'vue';
import Thoathuan from './Thoathuan.vue';
import { toast } from 'vue3-toastify';
import { useAuth } from '@/composables/useAuth';

const { register } = useAuth();
const isLoading = ref(false);



const form = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    agreement: true
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

// Các thông báo lỗi tiếng Việt
const errors = ref({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    agreement: ''
});


const handleFinish = async (values) => {
    isLoading.value = true;
    try {
        const result = await register(values);
        toast.success('Đăng ký thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
        handleClose();
    } catch (error) {
        console.error('Register error:', error);
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
    } finally {
        isLoading.value = false;
    }
};

const isThoathuan = ref(false);
const handleThoathuan = () => {
    isThoathuan.value = true;
};

// Sửa lỗi _ctx.Promise is not a constructor bằng cách sử dụng Promise toàn cục
function confirmPasswordValidator(rule, value) {
    return new Promise((resolve, reject) => {
        if (!value || value === form.password) {
            resolve();
        } else {
            reject('Mật khẩu xác nhận không khớp');
        }
    });
}

function agreementValidator(rule, value) {
    return new Promise((resolve, reject) => {
        if (form.agreement) {
            resolve();
        } else {
            reject('Bạn phải đồng ý với điều khoản sử dụng');
        }
    });
}
</script>

<template>
    <a-modal v-model:visible="props.visible" centered :maskClosable="false" :footer="false" @cancel="handleClose" width="800px" class="register-modal">
        <div class="register-container">
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
            <a-form :model="form" autocomplete="off" @finish="handleFinish" layout="vertical" class="register-form">
                <div class="form-columns">
                    <!-- Left Column -->
                    <div class="form-column">
                        <a-form-item 
                            label="Tên tài khoản" 
                            name="username" 
                            :rules="[
                                { required: true, message: 'Vui lòng nhập tên tài khoản' },
                                { min: 6, max: 15, message: 'Tên tài khoản phải từ 6 đến 15 ký tự' },
                                { pattern: /^[a-zA-Z][a-zA-Z0-9]*$/, message: 'Tên tài khoản phải bắt đầu bằng chữ cái' }
                            ]"
                        >
                            <div class="field-container">
                                <a-input 
                                    v-model:value="form.username" 
                                    placeholder="Vui lòng nhập tên tài khoản"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Tối thiểu 6 ký tự, tối đa 15 ký tự, phải bắt đầu bằng chữ cái.
                            </div>
                        </a-form-item>

                        <a-form-item
                            label="Xác nhận mật khẩu" 
                            name="confirmPassword" 
                            :rules="[
                                { required: true, message: 'Vui lòng xác nhận lại mật khẩu', trigger: 'change' },
                                { validator: confirmPasswordValidator }
                            ]"
                        >
                            <div class="field-container">
                                <a-input-password 
                                    v-model:value="form.confirmPassword" 
                                    placeholder="Vui lòng xác nhận lại mật khẩu của bạn"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Vui lòng nhập lại đúng mật khẩu đã tạo ở ô bên phải.
                            </div>
                        </a-form-item>

                        <a-form-item label="Số điện thoại" name="phone" :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại' }]">
                            <div class="field-container">
                                <a-input 
                                    v-model:value="form.phone" 
                                    placeholder="Vui lòng nhập số điện thoại"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Vui Lòng Nhập Số Điện Thoại
                            </div>
                        </a-form-item>
                    </div>

                    <!-- Right Column -->
                    <div class="form-column">
                        <a-form-item 
                            label="Mật khẩu" 
                            name="password" 
                            :rules="[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
                                { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: 'Mật khẩu phải bao gồm chữ cái và số' }
                            ]"
                        >
                            <div class="field-container">
                                <a-input-password 
                                    v-model:value="form.password" 
                                    placeholder="Vui lòng nhập mật khẩu"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Mật khẩu tối thiểu 6 ký tự, bao gồm cả chữ cái và số.
                            </div>
                        </a-form-item>

                        <a-form-item label="Họ tên thật" name="fullName" :rules="[{ required: true, message: 'Vui lòng nhập họ tên thật' }]">
                            <div class="field-container">
                                <a-input 
                                    v-model:value="form.fullName" 
                                    placeholder="Vui lòng nhập họ tên thật"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Cần Giống Với Họ Tên Thẻ Ngân Hàng, Viết Hoa Không Dấu.
                            </div>
                        </a-form-item>

                        <a-form-item label="Địa chỉ email" name="email" :rules="[{ required: true, message: 'Vui lòng nhập email' }]">
                            <div class="field-container">
                                <a-input 
                                    v-model:value="form.email" 
                                    placeholder="Vui lòng nhập email"
                                    class="custom-input"
                                />
                            </div>
                            <div class="field-instruction">
                                Nhập Chính Xác Email (Quên Mật Khẩu Sẽ Được Gửi Về Email)
                            </div>
                        </a-form-item>
                    </div>
                </div>

                <!-- Agreement Section -->
                <a-form-item
                    name="agreement"
                    :rules="[{ 
                        required: true, 
                        validator: agreementValidator, 
                    }]"
                    class="agreement-section"
                >
                    <a-checkbox v-model:checked="form.agreement" class="agreement-checkbox">
                        Đã đủ 18 tuổi và đồng ý với trang web này
                    </a-checkbox>
                    <a href="#" class="agreement-link" type="button" @click="handleThoathuan">Thỏa thuận đăng ký người dùng</a>
                </a-form-item>

                <!-- Submit Button -->
                <div class="submit-section">
                    <a-button type="primary" html-type="submit" size="large" class="register-button" :loading="isLoading">
                        ĐĂNG KÝ NGAY
                    </a-button>
                </div>
            </a-form>
            <Thoathuan v-model:visible="isThoathuan" />
        </div>
    </a-modal>
</template>

<style scoped>
.register-modal {
    background: linear-gradient(135deg, #ffffff 0%, #4a90e2 100%);
}

.register-container {
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

.register-form {
    margin-top: 20px;
}

.form-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 10px;
}

.form-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.field-container {
    position: relative;
}

.custom-input {
    border-radius: 8px;
    /* border: 2px solid #4a90e2; */
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

.error-box {
    position: absolute;
    right: -120px;
    top: 50%;
    transform: translateY(-50%);
    background: #4a90e2;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    border: 1px solid #4a90e2;
    z-index: 10;
}

.field-instruction {
    font-size: 12px;
    color: #4a90e2;
    margin-top: 5px;
    line-height: 1.4;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.agreement-section {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 8px;
    background: #101929;
    border: 1px solid #4a90e2;
    position: relative;
}

.agreement-checkbox {
    font-size: 14px;
    color: #4a90e2 !important;
    /* Thêm hiệu ứng màu xanh khi checked */
    transition: color 0.2s;
}

/* Khi checkbox được checked, đổi màu chữ và viền sang xanh */
.agreement-checkbox.checked-yellow .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #4a90e2 !important;
    border-color: #4a90e2 !important;
}
.agreement-checkbox.checked-yellow .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #ffffff !important;
}
.agreement-checkbox.checked-yellow .ant-checkbox-checked .ant-checkbox-input:focus + .ant-checkbox-inner {
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
.agreement-checkbox.checked-yellow .ant-checkbox-checked .ant-checkbox-inner,
.agreement-checkbox.checked-yellow .ant-checkbox-inner {
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
.agreement-checkbox.checked-yellow .ant-checkbox-checked .ant-checkbox-inner {
    color: #4a90e2 !important;
}

.agreement-link {
    color: #4a90e2;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
}

.agreement-link:hover {
    text-decoration: underline;
    color: #357abd;
}

.submit-section {
    text-align: center;
}

.register-button {
    background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
    color: #fff;
    border: none;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
    transition: background 0.3s, color 0.3s, transform 0.2s;
}

.register-button:hover {
    background: linear-gradient(90deg, #357abd 0%, #4a90e2 100%);
    color: #fff;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
    .form-columns {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .header-section {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .error-box {
        position: static;
        transform: none;
        margin-top: 5px;
        width: 100%;
    }
}
</style>