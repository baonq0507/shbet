<script setup>
import { ref, reactive, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { getBankAccounts, getPaymentMethods } from '@/services/deposit';
import { useDeposit } from '@/composables/useDeposit';

const { createDeposit, isLoading } = useDeposit();

const form = reactive({
    amount: '',
    paymentMethod: 'bank_transfer',
    bankAccount: '',
    note: ''
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
    // Reset form
    form.amount = '';
    form.paymentMethod = 'bank_transfer';
    form.bankAccount = '';
    form.note = '';
};

const paymentMethods = ref([
    { value: 'bank_transfer', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
    // { value: 'momo', label: 'Ví MoMo', icon: '💜' },
    // { value: 'zalo', label: 'Ví ZaloPay', icon: '💙' },
    // { value: 'vnpay', label: 'VNPay', icon: '💚' }
]);

const bankAccounts = ref([
    { name: 'Ngân hàng Vietcombank', account: '1234567890', holder: 'NGUYEN VAN A' },
]);

const quickAmounts = [100000, 200000, 500000, 1000000, 2000000, 5000000];

const handleQuickAmount = (amount) => {
    form.amount = amount.toString();
    // Format the amount for display
    const formattedAmount = formatVND(amount.toString());
    // Update the input display
    const inputElement = document.querySelector('.custom-input input');
    if (inputElement) {
        inputElement.value = formattedAmount;
    }
};

const handleFinish = async (values) => {
    if (!form.amount || parseFloat(form.amount) < 50000) {
        toast.error('Số tiền nạp tối thiểu là 50,000 VNĐ', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
        return;
    }

    try {
        const depositData = {
            amount: parseFloat(form.amount),
            paymentMethod: form.paymentMethod,
            note: form.note
        };
        
        const result = await createDeposit(depositData);
        
        toast.success('Yêu cầu nạp tiền đã được gửi! Vui lòng chuyển khoản theo thông tin bên dưới.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
        });
        
        console.log('Deposit request result:', result);
        handleClose();
        
    } catch (error) {
        console.error('Deposit error:', error);
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu nạp tiền', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
        });
    }
};

// Load data when component mounts
onMounted(async () => {
    try {
        // Load bank accounts and payment methods from API
        const [bankAccountsData, paymentMethodsData] = await Promise.all([
            getBankAccounts(),
            getPaymentMethods()
        ]);
        
        if (bankAccountsData) {
            bankAccounts.value = bankAccountsData;
        }
        
        if (paymentMethodsData) {
            paymentMethods.value = paymentMethodsData;
        }
    } catch (error) {
        console.error('Error loading deposit data:', error);
        // Keep default data if API fails
    }
});

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        toast.success('Đã sao chép vào clipboard!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    });
};

// Format VND currency functions
const formatVND = (value) => {
    if (!value) return '';
    // Remove all non-numeric characters
    const numericValue = value.toString().replace(/[^\d]/g, '');
    if (!numericValue) return '';
    
    // Format with thousand separators
    return new Intl.NumberFormat('vi-VN').format(numericValue);
};

const parseVND = (value) => {
    if (!value) return '';
    // Remove all non-numeric characters and return as number
    return value.toString().replace(/[^\d]/g, '');
};

const handleAmountChange = (value) => {
    // Ensure the value is properly formatted
    if (value) {
        form.amount = parseVND(value);
    }
};

const handleAmountKeyup = (event) => {
    // Format the value on keyup
    const value = event.target.value;
    if (value) {
        const formattedValue = formatVND(value);
        // Update the display value without changing the actual form value
        event.target.value = formattedValue;
    }
};
</script>

<template>
    <a-modal v-model:visible="props.visible" centered :maskClosable="false" :footer="false" @cancel="handleClose" width="700px" class="deposit-modal">
        <div class="deposit-container">
            <!-- Header Section -->
            <div class="header-section">
                <div class="brand-ambassador">
                    <h2>Nạp Tiền Nhanh Chóng</h2>
                </div>
               
            </div>

            <!-- Form Section -->
            <a-form :model="form" autocomplete="off" @finish="handleFinish" layout="vertical" class="deposit-form">
                <!-- Amount Section -->
                <a-form-item 
                    label="Số tiền nạp" 
                    name="amount" 
                    :rules="[
                        { required: true, message: 'Vui lòng nhập số tiền' },
                        { pattern: /^[0-9,]+$/, message: 'Chỉ được nhập số' }
                    ]"
                >
                    <div class="field-container">
                        <a-input-number 
                            v-model:value="form.amount" 
                            placeholder="Nhập số tiền (VNĐ)"
                            class="custom-input"
                            :min="50000"
                            :step="10000"

                            style="width: 100%;"
                            @change="handleAmountChange"
                            @keyup="handleAmountKeyup"
                            :formatter="formatVND"
                            :parser="parseVND"
                        />
                    </div>
                    
                    <!-- Quick Amount Buttons -->
                    <div class="quick-amounts">
                        <div class="quick-amounts-label">Chọn nhanh:</div>
                        <div class="quick-amount-buttons">
                            <a-button 
                                v-for="amount in quickAmounts" 
                                :key="amount"
                                @click="handleQuickAmount(amount)"
                                class="quick-amount-btn"
                            >
                                {{ (amount / 1000).toFixed(0) }}K
                            </a-button>
                        </div>
                    </div>
                </a-form-item>

                <!-- Payment Method Section -->
                <a-form-item 
                    label="Phương thức thanh toán" 
                    name="paymentMethod"
                >
                    <div class="payment-methods">
                        <a-radio-group v-model:value="form.paymentMethod" class="payment-method-group">
                            <div class="payment-method-grid">
                                <a-radio-button 
                                    v-for="method in paymentMethods" 
                                    :key="method.value" 
                                    :value="method.value"
                                    class="payment-method-btn"
                                >
                                    <span class="method-icon">{{ method.icon }}</span>
                                    <span class="method-label">{{ method.label }}</span>
                                </a-radio-button>
                            </div>
                        </a-radio-group>
                    </div>
                </a-form-item>

                <!-- Bank Account Info (if bank transfer selected) -->
                <div v-if="form.paymentMethod === 'bank_transfer'" class="bank-info-section">
                    <h3>Thông tin tài khoản ngân hàng:</h3>
                    <div class="bank-accounts">
                        <div 
                            v-for="(account, index) in bankAccounts" 
                            :key="index"
                            class="bank-account-card"
                        >
                            <div class="bank-account-header">
                                <h4>{{ account.name }}</h4>
                            </div>
                            <div class="bank-account-details">
                                <div class="account-row">
                                    <span class="label">Số tài khoản:</span>
                                    <span class="value">{{ account.account }}</span>
                                    <a-button 
                                        type="link" 
                                        size="small" 
                                        @click="copyToClipboard(account.account)"
                                        class="copy-btn"
                                    >
                                        <i class="fas fa-copy"></i>
                                    </a-button>
                                </div>
                                <div class="account-row">
                                    <span class="label">Chủ tài khoản:</span>
                                    <span class="value">{{ account.holder }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Submit Section -->
                <div class="submit-section">
                    <a-button 
                        type="primary" 
                        html-type="submit" 
                        :loading="isLoading"
                        class="deposit-button"
                        size="large"
                    >
                        <i class="fas fa-credit-card"></i>
                        {{ isLoading ? 'Đang xử lý...' : 'Gửi yêu cầu nạp tiền' }}
                    </a-button>
                </div>

                <!-- Notice Section -->
                <div class="notice-section">
                    <div class="notice-item">
                        <i class="fas fa-info-circle"></i>
                        <span>Số tiền nạp tối thiểu: 50,000 VNĐ</span>
                    </div>
                    <div class="notice-item">
                        <i class="fas fa-clock"></i>
                        <span>Xử lý trong vòng 5-15 phút sau khi chuyển khoản</span>
                    </div>
                    <div class="notice-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Giao dịch được bảo mật 100%</span>
                    </div>
                </div>
            </a-form>
        </div>
    </a-modal>
</template>

<style scoped>
.deposit-modal :deep(.ant-modal-content) {
    background: linear-gradient(135deg, #ffffff 0%, #101929 100%);
    border: 2px solid #4a90e2;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
}

.deposit-modal :deep(.ant-modal-header) {
    background: transparent;
    border-bottom: none;
}

.deposit-modal :deep(.ant-modal-body) {
    padding: 30px;
    background: transparent;
}

.deposit-container {
    /* background: #111; */
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

.deposit-form {
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
}

.custom-textarea {
    border-radius: 8px;
    padding: 12px 15px;
    font-size: 14px;
    background: #ffffff;
    color: #2c5aa0;
    border: 1px solid #101929;
    transition: all 0.3s ease;
}

.custom-textarea:focus {
    border-color: #4a90e2 !important;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    background: #ffffff;
    color: #2c5aa0;
}

.quick-amounts {
    margin-top: 15px;
}

.quick-amounts-label {
    color: #2c5aa0;
    font-size: 14px;
    margin-bottom: 10px;
}

.quick-amount-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-amount-btn {
    background: #ffffff;
    border: 1px solid #4a90e2;
    color: #4a90e2;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    transition: all 0.3s ease;
}

.quick-amount-btn:hover {
    background: #4a90e2;
    color: #ffffff;
    transform: translateY(-1px);
}

.payment-methods {
    margin-top: 10px;
}

.payment-method-group {
    width: 100%;
}

.payment-method-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
}

.payment-method-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #ffffff;
    border: 1px solid #4a90e2;
    color: #4a90e2;
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
    /* height: auto; */
}

.payment-method-btn:hover {
    background: #4a90e2;
    color: #ffffff;
    transform: translateY(-2px);
}

.payment-method-btn.ant-radio-button-wrapper-checked {
    background: #4a90e2;
    color: #ffffff;
    border-color: #4a90e2;
}

.method-icon {
    font-size: 18px;
}

.method-label {
    font-size: 14px;
    font-weight: 500;
}

.bank-info-section {
    margin-top: 20px;
    padding: 20px;
    background: #f8fbff;
    border-radius: 10px;
    border: 1px solid #4a90e2;
}

.bank-info-section h3 {
    color: #2c5aa0;
    margin-bottom: 15px;
    font-size: 16px;
}

.bank-accounts {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.bank-account-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #101929;
}

.bank-account-header h4 {
    color: #2c5aa0;
    margin: 0 0 10px 0;
    font-size: 14px;
}

.bank-account-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.account-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.label {
    color: #5a6c7d;
    font-size: 12px;
    min-width: 100px;
}

.value {
    color: #2c5aa0;
    font-weight: bold;
    font-size: 14px;
    flex: 1;
}

.copy-btn {
    color: #4a90e2;
    padding: 4px 8px;
    min-width: auto;
}

.copy-btn:hover {
    color: #fff;
    background: #4a90e2;
}

.submit-section {
    text-align: center;
    margin-top: 30px;
}

.deposit-button {
    background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
    color: #fff;
    border: none;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
    transition: background 0.3s, color 0.3s, transform 0.2s;
    width: 100%;
    height: 50px;
    font-size: 16px;
}

.deposit-button:hover {
    background: linear-gradient(90deg, #357abd 0%, #4a90e2 100%);
    color: #fff;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.notice-section {
    margin-top: 20px;
    padding: 15px;
    background: rgba(74, 144, 226, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(74, 144, 226, 0.3);
}

.notice-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: #2c5aa0;
    font-size: 12px;
}

.notice-item:last-child {
    margin-bottom: 0;
}

.notice-item i {
    font-size: 14px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-section {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .payment-method-grid {
        grid-template-columns: 1fr;
    }
    
    .bank-account-card {
        padding: 10px;
    }
    
    .account-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .label {
        min-width: auto;
    }
}
</style> 