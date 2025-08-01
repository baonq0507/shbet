import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { createDepositRequest, getDepositHistory, getDepositStatus } from '@/services/deposit';
import { toast } from 'vue3-toastify';

export const useDeposit = () => {
    const store = useStore();
    const isLoading = ref(false);
    const depositHistory = ref([]);
    const currentDeposit = ref(null);

    const isAuthenticated = computed(() => store.state.auth.isLogin);
    const currentUser = computed(() => store.state.auth.user);

    const createDeposit = async (depositData) => {
        if (!isAuthenticated.value) {
            toast.error('Vui lòng đăng nhập để thực hiện nạp tiền', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            throw new Error('User not authenticated');
        }

        isLoading.value = true;
        try {
            const result = await createDepositRequest(depositData);
            console.log(result);
            
            // Update user wallet balance if needed
            if (result.user && result.user.balance) {
                store.commit('auth/updateUser', result.user);
            }
            
            return result;
        } catch (error) {
            console.error('Create deposit error:', error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const loadDepositHistory = async (params = {}) => {
        if (!isAuthenticated.value) {
            return;
        }

        try {
            const result = await getDepositHistory(params);
            depositHistory.value = result.deposits || [];
            return result;
        } catch (error) {
            console.error('Load deposit history error:', error);
            throw error;
        }
    };

    const checkDepositStatus = async (depositId) => {
        try {
            const result = await getDepositStatus(depositId);
            return result;
        } catch (error) {
            console.error('Check deposit status error:', error);
            throw error;
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#faad14';
            case 'completed':
                return '#52c41a';
            case 'failed':
                return '#ff4d4f';
            case 'cancelled':
                return '#8c8c8c';
            default:
                return '#8c8c8c';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Đang xử lý';
            case 'completed':
                return 'Hoàn thành';
            case 'failed':
                return 'Thất bại';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    return {
        isLoading,
        depositHistory,
        currentDeposit,
        isAuthenticated,
        currentUser,
        createDeposit,
        loadDepositHistory,
        checkDepositStatus,
        formatAmount,
        getStatusColor,
        getStatusText
    };
}; 