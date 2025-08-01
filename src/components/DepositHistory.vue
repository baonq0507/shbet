<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDeposit } from '@/composables/useDeposit';
import { toast } from 'vue3-toastify';

const { 
    depositHistory, 
    loadDepositHistory, 
    formatAmount, 
    getStatusColor, 
    getStatusText,
    isLoading 
} = useDeposit();

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const filters = ref({
    status: '',
    dateRange: [],
    paymentMethod: ''
});

const statusOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Đang xử lý', value: 'pending' },
    { label: 'Hoàn thành', value: 'completed' },
    { label: 'Thất bại', value: 'failed' },
    { label: 'Đã hủy', value: 'cancelled' }
];

const paymentMethodOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Chuyển khoản ngân hàng', value: 'bank' },
    { label: 'Ví MoMo', value: 'momo' },
    { label: 'Ví ZaloPay', value: 'zalo' },
    { label: 'VNPay', value: 'vnpay' }
];

const filteredHistory = computed(() => {
    let filtered = depositHistory.value;

    if (filters.value.status) {
        filtered = filtered.filter(item => item.status === filters.value.status);
    }

    if (filters.value.paymentMethod) {
        filtered = filtered.filter(item => item.paymentMethod === filters.value.paymentMethod);
    }

    if (filters.value.dateRange && filters.value.dateRange.length === 2) {
        const startDate = new Date(filters.value.dateRange[0]);
        const endDate = new Date(filters.value.dateRange[1]);
        filtered = filtered.filter(item => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });
    }

    return filtered;
});

const paginatedHistory = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredHistory.value.slice(start, end);
});

const handlePageChange = (page) => {
    currentPage.value = page;
};

const handleFilterChange = () => {
    currentPage.value = 1;
    loadHistory();
};

const loadHistory = async () => {
    try {
        const params = {
            page: currentPage.value,
            limit: pageSize.value,
            ...filters.value
        };
        
        const result = await loadDepositHistory(params);
        if (result) {
            total.value = result.total || depositHistory.value.length;
        }
    } catch (error) {
        console.error('Error loading deposit history:', error);
        toast.error('Không thể tải lịch sử nạp tiền', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
};

const resetFilters = () => {
    filters.value = {
        status: '',
        dateRange: [],
        paymentMethod: ''
    };
    currentPage.value = 1;
    loadHistory();
};

onMounted(() => {
    loadHistory();
});
</script>

<template>
    <div class="deposit-history">
        <div class="history-header">
            <h3>Lịch Sử Nạp Tiền</h3>
        </div>

        <!-- Filters -->
        <div class="filters-section">
            <a-row :gutter="16">
                <a-col :span="6">
                    <a-select
                        v-model:value="filters.status"
                        placeholder="Trạng thái"
                        @change="handleFilterChange"
                        style="width: 100%"
                    >
                        <a-select-option 
                            v-for="option in statusOptions" 
                            :key="option.value" 
                            :value="option.value"
                        >
                            {{ option.label }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="6">
                    <a-select
                        v-model:value="filters.paymentMethod"
                        placeholder="Phương thức"
                        @change="handleFilterChange"
                        style="width: 100%"
                    >
                        <a-select-option 
                            v-for="option in paymentMethodOptions" 
                            :key="option.value" 
                            :value="option.value"
                        >
                            {{ option.label }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8">
                    <a-range-picker
                        v-model:value="filters.dateRange"
                        @change="handleFilterChange"
                        style="width: 100%"
                        placeholder="['Từ ngày', 'Đến ngày']"
                    />
                </a-col>
                <a-col :span="4">
                    <a-button @click="resetFilters" style="width: 100%">
                        <i class="fas fa-refresh"></i>
                        Làm mới
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <!-- History Table -->
        <div class="history-table">
            <a-table
                :dataSource="paginatedHistory"
                :loading="isLoading"
                :pagination="false"
                :scroll="{ x: 800 }"
                class="custom-table"
            >
                <a-table-column key="id" title="Mã GD" dataIndex="id" width="100">
                    <template #default="{ text }">
                        <span class="transaction-id">#{{ text }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="amount" title="Số tiền" dataIndex="amount" width="150">
                    <template #default="{ text }">
                        <span class="amount">{{ formatAmount(text) }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="paymentMethod" title="Phương thức" dataIndex="paymentMethod" width="150">
                    <template #default="{ text }">
                        <span class="payment-method">
                            <i v-if="text === 'bank'" class="fas fa-university"></i>
                            <i v-else-if="text === 'momo'" class="fas fa-mobile-alt"></i>
                            <i v-else-if="text === 'zalo'" class="fab fa-google-pay"></i>
                            <i v-else-if="text === 'vnpay'" class="fas fa-credit-card"></i>
                            {{ text === 'bank' ? 'Chuyển khoản' : text.toUpperCase() }}
                        </span>
                    </template>
                </a-table-column>

                <a-table-column key="status" title="Trạng thái" dataIndex="status" width="120">
                    <template #default="{ text }">
                        <a-tag :color="getStatusColor(text)">
                            {{ getStatusText(text) }}
                        </a-tag>
                    </template>
                </a-table-column>

                <a-table-column key="note" title="Ghi chú" dataIndex="note" width="200">
                    <template #default="{ text }">
                        <span class="note">{{ text || '-' }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="createdAt" title="Ngày tạo" dataIndex="createdAt" width="150">
                    <template #default="{ text }">
                        <span class="date">{{ new Date(text).toLocaleString('vi-VN') }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="updatedAt" title="Cập nhật" dataIndex="updatedAt" width="150">
                    <template #default="{ text }">
                        <span class="date">{{ new Date(text).toLocaleString('vi-VN') }}</span>
                    </template>
                </a-table-column>
            </a-table>

            <!-- Pagination -->
            <div class="pagination-section">
                <a-pagination
                    v-model:current="currentPage"
                    :total="filteredHistory.length"
                    :pageSize="pageSize"
                    :showSizeChanger="false"
                    @change="handlePageChange"
                    show-quick-jumper
                    show-total="(total, range) => `${range[0]}-${range[1]} của ${total} giao dịch`"
                />
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && filteredHistory.length === 0" class="empty-state">
            <i class="fas fa-history"></i>
            <p>Chưa có lịch sử nạp tiền</p>
        </div>
    </div>
</template>

<style scoped>
.deposit-history {
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #101929;
}

.history-header {
    margin-bottom: 20px;
}

.history-header h3 {
    color: #2c5aa0;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}

.filters-section {
    margin-bottom: 20px;
    padding: 15px;
    background: #101929;
    border-radius: 8px;
    border: 1px solid #101929;
}

.history-table {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #101929;
}

.custom-table :deep(.ant-table) {
    background: #ffffff;
    color: #2c5aa0;
}

.custom-table :deep(.ant-table-thead > tr > th) {
    background: #101929;
    color: #2c5aa0;
    border-bottom: 1px solid #101929;
    font-weight: bold;
}

.custom-table :deep(.ant-table-tbody > tr > td) {
    background: #ffffff;
    color: #2c5aa0;
    border-bottom: 1px solid #101929;
}

.custom-table :deep(.ant-table-tbody > tr:hover > td) {
    background: #101929;
}

.transaction-id {
    color: #4a90e2;
    font-weight: bold;
    font-family: monospace;
}

.amount {
    color: #52c41a;
    font-weight: bold;
}

.payment-method {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #1890ff;
}

.payment-method i {
    font-size: 14px;
}

.note {
    color: #5a6c7d;
    font-style: italic;
}

.date {
    color: #7a8b9c;
    font-size: 12px;
}

.pagination-section {
    padding: 15px;
    text-align: center;
    background: #101929;
    border-top: 1px solid #101929;
}

.pagination-section :deep(.ant-pagination-item) {
    background: #ffffff;
    border-color: #101929;
}

.pagination-section :deep(.ant-pagination-item a) {
    color: #2c5aa0;
}

.pagination-section :deep(.ant-pagination-item-active) {
    background: #4a90e2;
    border-color: #4a90e2;
}

.pagination-section :deep(.ant-pagination-item-active a) {
    color: #ffffff;
}

.pagination-section :deep(.ant-pagination-prev),
.pagination-section :deep(.ant-pagination-next) {
    background: #ffffff;
    border-color: #b8d4f0;
}

.pagination-section :deep(.ant-pagination-prev a),
.pagination-section :deep(.ant-pagination-next a) {
    color: #2c5aa0;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
}

.empty-state i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #444;
}

.empty-state p {
    margin: 0;
    font-size: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .filters-section .ant-row {
        margin: 0;
    }
    
    .filters-section .ant-col {
        margin-bottom: 10px;
    }
    
    .custom-table {
        font-size: 12px;
    }
    
    .custom-table :deep(.ant-table-thead > tr > th),
    .custom-table :deep(.ant-table-tbody > tr > td) {
        padding: 8px 4px;
    }
}
</style> 