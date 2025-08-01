<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
             <div class="modal-header">
         <h3>Đổi Tiền Thành Điểm</h3>
         <button class="close-btn" @click="closeModal">
           <i class="fas fa-times"></i>
         </button>
       </div>
      
      <div class="modal-body">
        <div class="balance-info">
          <div class="balance-item">
            <span class="label">Điểm hiện tại:</span>
            <span class="value">{{ userPoints }}</span>
          </div>
          <div class="balance-item">
            <span class="label">Số dư khả dụng:</span>
            <span class="value">{{ userBalance }}</span>
          </div>
        </div>
        
                 <div class="exchange-form">
           <div class="form-group">
             <label>Số tiền muốn đổi (VND):</label>
             <input 
               type="number" 
               v-model="exchangeAmount" 
               :max="userBalance"
               :min="1000"
               placeholder="Nhập số tiền (tối thiểu 1,000 VND)"
               class="form-input"
               :class="{ 'error': exchangeAmount > userBalance }"
             />
             <div class="quick-actions">
               <button 
                 type="button" 
                 class="quick-btn"
                 @click="exchangeAmount = Math.floor(userBalance / 2)"
                 :disabled="userBalance < 2000"
               >
                 Đổi 1/2
               </button>
               <button 
                 type="button" 
                 class="quick-btn"
                 @click="exchangeAmount = userBalance"
                 :disabled="userBalance < 1000"
               >
                 Đổi tất cả
               </button>
             </div>
             <div v-if="exchangeAmount > userBalance" class="error-message">
               Số tiền không được vượt quá số dư hiện có
             </div>
             <div v-if="exchangeAmount < 1000 && exchangeAmount > 0" class="error-message">
               Số tiền tối thiểu là 1,000 VND
             </div>
             <div v-if="exchangeAmount > 1000000" class="error-message">
               Số tiền không được vượt quá 1,000,000 VND
             </div>
           </div>
          
                     <div class="exchange-rate">
             <span>Tỷ lệ đổi: 1.000 VND = 1 điểm</span>
           </div>
           
           <div class="exchange-result" v-if="exchangeAmount > 0">
             <span>Số điểm nhận được: {{ formatCurrency(exchangeAmount) }} điểm</span>
           </div>
        </div>
      </div>
      
             <div class="modal-footer">
         <button class="btn btn-secondary" @click="closeModal">Hủy</button>
         <button 
           class="btn btn-game" 
           @click="goToGame"
         >
           Vào Game
         </button>
         <button 
           class="btn btn-primary" 
           @click="confirmExchange"
           :disabled="!canExchange"
         >
           <span v-if="isLoading">Đang xử lý...</span>
           <span v-else>Xác nhận đổi tiền</span>
         </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { exchangeMoneyToPoints } from '../../services/exchange';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  gameInfo: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'exchange-success', 'go-to-game']);

const store = useStore();
const exchangeAmount = ref(0);
const isLoading = ref(false);

// Lấy thông tin user từ store
const userPoints = computed(() => store.state.auth.user?.points || 0);
const userBalance = computed(() => store.state.auth.user?.balance || 0);

const canExchange = computed(() => {
  return exchangeAmount.value >= 1000 && 
         exchangeAmount.value <= userBalance.value &&
         exchangeAmount.value <= 1000000 && // Giới hạn 1 triệu VND
         !isLoading.value;
});

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

function closeModal() {
  exchangeAmount.value = 0;
  emit('close');
}

function goToGame() {
  emit('go-to-game', {
    gameInfo: props.gameInfo
  });
  closeModal();
}

async function confirmExchange() {
  if (!canExchange.value) return;
  
  isLoading.value = true;
  
  try {
    // Gọi API đổi tiền thành điểm
    const response = await exchangeMoneyToPoints(exchangeAmount.value);
    
    // Cập nhật store với dữ liệu từ server
    if (response.user) {
      store.commit('auth/updateUser', response.user);
    } else {
      // Fallback nếu server không trả về user data
      store.commit('auth/updateUserBalance', userBalance.value - exchangeAmount.value);
      store.commit('auth/updateUserPoints', userPoints.value + exchangeAmount.value);
    }
    
    // Thông báo thành công
    alert('Đổi tiền thành điểm thành công!');
    
    // Đóng modal và mở game
    emit('exchange-success', {
      amount: exchangeAmount.value,
      gameInfo: props.gameInfo
    });
    
    closeModal();
  } catch (error) {
    console.error('Lỗi đổi tiền:', error);
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi đổi tiền. Vui lòng thử lại!';
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.modal-content {
      background: linear-gradient(135deg, #ffffff 0%, #101929 100%);
  border: 2px solid #4a90e2;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(74, 144, 226, 0.2);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid rgba(74, 144, 226, 0.2);
}

.modal-header h3 {
  color: #2c5aa0;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  transform: scale(1.1);
}

.modal-body {
  padding: 25px;
}

.balance-info {
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.balance-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #5a6c7d;
  font-size: 14px;
}

.value {
  color: #2c5aa0;
  font-weight: 700;
  font-size: 16px;
}

.exchange-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #5a6c7d;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #2c5aa0;
  font-size: 16px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
}

.form-input::placeholder {
  color: #999;
}

.form-input.error {
  border-color: #ff4444;
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
}

.error-message {
  color: #ff4444;
  font-size: 12px;
  margin-top: 5px;
  padding: 5px 10px;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
  border-left: 3px solid #ff4444;
}

.quick-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.quick-btn {
  flex: 1;
  padding: 8px 12px;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 6px;
  color: #4a90e2;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-btn:hover:not(:disabled) {
  background: rgba(74, 144, 226, 0.2);
  border-color: #4a90e2;
  transform: translateY(-1px);
}

.quick-btn:disabled {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #666;
  cursor: not-allowed;
}

.exchange-rate {
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  color: #2c5aa0;
  font-size: 14px;
  margin-bottom: 15px;
}

.exchange-result {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  color: #00ff00;
  font-weight: 700;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 25px;
  border-top: 1px solid rgba(74, 144, 226, 0.2);
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #5a6c7d;
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.btn-secondary:hover {
  background: rgba(74, 144, 226, 0.1);
  color: #2c5aa0;
}

.btn-game {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: #fff;
  border: 1px solid #4CAF50;
}

.btn-game:hover {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.btn-primary {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: #fff;
  border: 1px solid #4a90e2;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
}

.btn-primary:disabled {
  background: rgba(74, 144, 226, 0.3);
  color: #999;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 10px;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 15px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 13px;
    min-width: 100px;
  }
}
</style> 