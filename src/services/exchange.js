import axios from '../modules/axios';

export const exchangeMoneyToPoints = (amount, callback) => {
    return axios.post('/api/exchange/money-to-points', { amount })
        .then(response => {
            if (callback) callback(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error exchanging money to points:', error);
            throw error;
        });
};

export const getExchangeHistory = (callback) => {
    return axios.get('/api/exchange/history')
        .then(response => {
            if (callback) callback(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error getting exchange history:', error);
            throw error;
        });
}; 