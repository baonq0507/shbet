import axios from '@/modules/axios';

export const createDepositRequest = async (depositData) => {
    try {
        const response = await axios.post('/payment/deposit', depositData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getDepositHistory = async (params = {}) => {
    try {
        const response = await axios.get('/api/deposits', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDepositStatus = async (depositId) => {
    try {
        const response = await axios.get(`/api/deposits/${depositId}/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelDepositRequest = async (depositId) => {
    try {
        const response = await axios.post(`/api/deposits/${depositId}/cancel`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBankAccounts = async () => {
    try {
        const response = await axios.get('/api/bank-accounts');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPaymentMethods = async () => {
    try {
        const response = await axios.get('/api/payment-methods');
        return response.data;
    } catch (error) {
        throw error;
    }
}; 