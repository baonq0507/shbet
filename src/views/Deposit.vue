<script setup>
import { ref } from 'vue';
import Header from '@components/Header.vue';
import Navigation from '@components/Navigation.vue';
import DepositModal from '@components/modal/Deposit.vue';
import DepositHistory from '@components/DepositHistory.vue';

const depositModal = ref(false);
const withdrawModal = ref(false);

const handleOpenDepositPopup = () => {
    depositModal.value = true;
};

const handleOpenWithdrawPopup = () => {
    withdrawModal.value = true;
};

const handleOpenLoginPopup = () => {
    // Redirect to login or show login modal
    console.log('Open login popup');
};

const handleOpenRegisterPopup = () => {
    // Redirect to register or show register modal
    console.log('Open register popup');
};
</script>

<template>
    <div class="deposit-page">
        <Header 
            @open-login-popup="handleOpenLoginPopup" 
            @open-register-popup="handleOpenRegisterPopup"
            @open-deposit-popup="handleOpenDepositPopup"
            @open-withdraw-popup="handleOpenWithdrawPopup"
        />
        <Navigation @open-login-popup="handleOpenLoginPopup" />
        
        <div class="container-fluid">
            <div class="deposit-content">
                <!-- Header Section -->
                <div class="page-header">
                    <h1>Quản Lý Nạp Tiền</h1>
                    <p>Nạp tiền nhanh chóng và an toàn với nhiều phương thức thanh toán</p>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <div class="action-card deposit-card">
                                <div class="action-icon">
                                    <i class="fas fa-plus-circle"></i>
                                </div>
                                <div class="action-content">
                                    <h3>Nạp Tiền</h3>
                                    <p>Nạp tiền vào tài khoản để tham gia các trò chơi</p>
                                    <a-button 
                                        type="primary" 
                                        size="large" 
                                        @click="handleOpenDepositPopup"
                                        class="action-button"
                                    >
                                        <i class="fas fa-plus"></i>
                                        Nạp Tiền Ngay
                                    </a-button>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="action-card withdraw-card">
                                <div class="action-icon">
                                    <i class="fas fa-minus-circle"></i>
                                </div>
                                <div class="action-content">
                                    <h3>Rút Tiền</h3>
                                    <p>Rút tiền từ tài khoản về ngân hàng của bạn</p>
                                    <a-button 
                                        type="primary" 
                                        size="large" 
                                        @click="handleOpenWithdrawPopup"
                                        class="action-button"
                                    >
                                        <i class="fas fa-minus"></i>
                                        Rút Tiền Ngay
                                    </a-button>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>

                <!-- Features Section -->
                <div class="features-section">
                    <h2>Tại sao chọn SHBET?</h2>
                    <a-row :gutter="24">
                        <a-col :span="8">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <h4>Bảo Mật Cao</h4>
                                <p>Giao dịch được mã hóa SSL 256-bit, đảm bảo an toàn tuyệt đối</p>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-bolt"></i>
                                </div>
                                <h4>Nhanh Chóng</h4>
                                <p>Xử lý giao dịch trong vòng 1-3 phút, rút tiền 5-15 phút</p>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <h4>Hỗ Trợ 24/7</h4>
                                <p>Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng phục vụ mọi lúc</p>
                            </div>
                        </a-col>
                    </a-row>
                </div>

                <!-- Deposit History -->
                <DepositHistory />
            </div>
        </div>

        <!-- Modals -->
        <DepositModal v-model:visible="depositModal" />
    </div>
</template>

<style scoped>
.deposit-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #101929 0%, #0f1827 100%);
}

.deposit-content {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
}

.page-header h1 {
    color: #2c5aa0;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header p {
    color: #5a6c7d;
    font-size: 18px;
    margin: 0;
}

.quick-actions {
    margin-bottom: 50px;
}

.action-card {
    background: linear-gradient(135deg, #ffffff 0%, #101929 100%);
    border: 2px solid #4a90e2;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    height: 100%;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.action-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(74, 144, 226, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.action-card:hover::before {
    transform: translateX(100%);
}

.action-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
}

.deposit-card {
    border-color: #52c41a;
}

.withdraw-card {
    border-color: #1890ff;
}

.action-icon {
    margin-bottom: 20px;
}

.action-icon i {
    font-size: 48px;
    color: #4a90e2;
    filter: drop-shadow(0 0 10px rgba(74, 144, 226, 0.5));
}

.deposit-card .action-icon i {
    color: #52c41a;
    filter: drop-shadow(0 0 10px rgba(82, 196, 26, 0.5));
}

.withdraw-card .action-icon i {
    color: #1890ff;
    filter: drop-shadow(0 0 10px rgba(24, 144, 255, 0.5));
}

.action-content h3 {
    color: #2c5aa0;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
}

.action-content p {
    color: #5a6c7d;
    margin-bottom: 20px;
    line-height: 1.6;
}

.action-button {
    background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.action-button:hover {
    background: linear-gradient(90deg, #357abd 0%, #4a90e2 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.deposit-card .action-button {
    background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%);
    box-shadow: 0 4px 15px rgba(82, 196, 26, 0.3);
}

.deposit-card .action-button:hover {
    background: linear-gradient(90deg, #73d13d 0%, #52c41a 100%);
    box-shadow: 0 6px 20px rgba(82, 196, 26, 0.4);
}

.withdraw-card .action-button {
    background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%);
    box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
}

.withdraw-card .action-button:hover {
    background: linear-gradient(90deg, #40a9ff 0%, #1890ff 100%);
    box-shadow: 0 6px 20px rgba(24, 144, 255, 0.4);
}

.features-section {
    margin-bottom: 50px;
    text-align: center;
}

.features-section h2 {
    color: #2c5aa0;
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: bold;
}

.feature-item {
    background: #ffffff;
    border-radius: 10px;
    padding: 30px 20px;
    text-align: center;
    border: 1px solid #101929;
    transition: all 0.3s ease;
}

.feature-item:hover {
    transform: translateY(-5px);
    border-color: #4a90e2;
    box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
}

.feature-item .feature-icon {
    margin-bottom: 20px;
}

.feature-item .feature-icon i {
    font-size: 36px;
    color: #4a90e2;
    filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.5));
}

.feature-item h4 {
    color: #2c5aa0;
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: bold;
}

.feature-item p {
    color: #5a6c7d;
    line-height: 1.6;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .deposit-content {
        padding: 20px 10px;
    }
    
    .page-header h1 {
        font-size: 28px;
    }
    
    .page-header p {
        font-size: 16px;
    }
    
    .action-card {
        padding: 20px;
        margin-bottom: 20px;
    }
    
    .action-content h3 {
        font-size: 20px;
    }
    
    .features-section h2 {
        font-size: 24px;
    }
    
    .feature-item {
        padding: 20px 15px;
        margin-bottom: 20px;
    }
}
</style> 