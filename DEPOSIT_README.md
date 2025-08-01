# Modal Nạp Tiền - Hướng Dẫn Sử Dụng

## Tổng Quan
Modal nạp tiền đã được thêm vào dự án SHBET với đầy đủ tính năng và giao diện đẹp mắt.

## Các File Đã Tạo/Cập Nhật

### 1. Components
- `src/components/modal/Deposit.vue` - Modal nạp tiền chính
- `src/components/DepositHistory.vue` - Component hiển thị lịch sử nạp tiền
- `src/components/UserStatus.vue` - Cập nhật để thêm nút nạp tiền
- `src/components/Header.vue` - Cập nhật để xử lý sự kiện nạp tiền

### 2. Views
- `src/views/Deposit.vue` - Trang quản lý nạp tiền

### 3. Services
- `src/services/deposit.js` - API calls cho việc nạp tiền

### 4. Composables
- `src/composables/useDeposit.js` - Logic xử lý nạp tiền

### 5. Store
- `src/store/modules/auth.js` - Thêm mutation updateUser

### 6. Router
- `src/router.js` - Thêm route cho trang nạp tiền

### 7. Constants
- `src/utils/const.js` - Thêm menu item nạp tiền

## Tính Năng

### Modal Nạp Tiền
- ✅ Giao diện đẹp mắt với theme tối
- ✅ Chọn số tiền nhanh (100K, 200K, 500K, 1M, 2M, 5M)
- ✅ Nhập số tiền tùy chỉnh
- ✅ Chọn phương thức thanh toán (Ngân hàng, MoMo, ZaloPay, VNPay)
- ✅ Hiển thị thông tin tài khoản ngân hàng
- ✅ Nút copy số tài khoản
- ✅ Ghi chú tùy chọn
- ✅ Validation số tiền tối thiểu (50,000 VNĐ)
- ✅ Loading state khi submit
- ✅ Toast notifications
- ✅ Responsive design

### Lịch Sử Nạp Tiền
- ✅ Bảng hiển thị lịch sử với pagination
- ✅ Lọc theo trạng thái, phương thức, ngày
- ✅ Hiển thị trạng thái với màu sắc
- ✅ Format số tiền theo định dạng VNĐ
- ✅ Responsive design

### Trang Quản Lý Nạp Tiền
- ✅ Header với thông tin tổng quan
- ✅ Nút nạp tiền và rút tiền nhanh
- ✅ Section giới thiệu tính năng
- ✅ Tích hợp lịch sử nạp tiền

## Cách Sử Dụng

### 1. Mở Modal Nạp Tiền
```javascript
// Từ component Header hoặc UserStatus
const handleOpenDepositPopup = () => {
    depositModal.value = true;
};
```

### 2. Sử Dụng Composable
```javascript
import { useDeposit } from '@/composables/useDeposit';

const { createDeposit, loadDepositHistory, formatAmount } = useDeposit();

// Tạo yêu cầu nạp tiền
const result = await createDeposit({
    amount: 100000,
    paymentMethod: 'bank',
    note: 'Ghi chú'
});

// Load lịch sử
await loadDepositHistory();

// Format số tiền
const formattedAmount = formatAmount(100000); // "100.000 ₫"
```

### 3. Sử Dụng Service
```javascript
import { createDepositRequest, getBankAccounts } from '@/services/deposit';

// Tạo yêu cầu nạp tiền
const result = await createDepositRequest(depositData);

// Lấy danh sách tài khoản ngân hàng
const bankAccounts = await getBankAccounts();
```

## API Endpoints

### Tạo yêu cầu nạp tiền
```
POST /api/deposits
Body: {
    amount: number,
    paymentMethod: string,
    note?: string
}
```

### Lấy lịch sử nạp tiền
```
GET /api/deposits?page=1&limit=10&status=pending&paymentMethod=bank
```

### Lấy trạng thái nạp tiền
```
GET /api/deposits/{id}/status
```

### Hủy yêu cầu nạp tiền
```
POST /api/deposits/{id}/cancel
```

### Lấy danh sách tài khoản ngân hàng
```
GET /api/bank-accounts
```

### Lấy danh sách phương thức thanh toán
```
GET /api/payment-methods
```

## Cấu Trúc Dữ Liệu

### Deposit Request
```javascript
{
    amount: 100000,           // Số tiền (VNĐ)
    paymentMethod: 'bank',    // Phương thức thanh toán
    note: 'Ghi chú'          // Ghi chú (tùy chọn)
}
```

### Deposit Response
```javascript
{
    id: 'DEP001',
    amount: 100000,
    paymentMethod: 'bank',
    status: 'pending',
    note: 'Ghi chú',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    user: {
        id: 1,
        username: 'user123',
        wallet: {
            balance: 1000000
        }
    }
}
```

### Bank Account
```javascript
{
    name: 'Ngân hàng Vietcombank',
    account: '1234567890',
    holder: 'NGUYEN VAN A'
}
```

## Styling

### Theme Colors
- Primary: `#FFD600` (Gold)
- Success: `#52c41a` (Green)
- Info: `#1890ff` (Blue)
- Warning: `#faad14` (Orange)
- Error: `#ff4d4f` (Red)

### CSS Classes
- `.deposit-modal` - Modal container
- `.deposit-container` - Content container
- `.quick-amount-btn` - Nút chọn số tiền nhanh
- `.payment-method-btn` - Nút chọn phương thức
- `.bank-account-card` - Card thông tin ngân hàng
- `.deposit-button` - Nút submit

## Responsive Design

Modal và các component đã được thiết kế responsive:
- Desktop: Full width modal với grid layout
- Tablet: Adjusted spacing và font sizes
- Mobile: Stacked layout, smaller buttons

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Lưu Ý

1. **Authentication**: Modal chỉ hoạt động khi user đã đăng nhập
2. **Validation**: Số tiền tối thiểu là 50,000 VNĐ
3. **API Integration**: Cần implement các API endpoints trên backend
4. **Error Handling**: Đã có xử lý lỗi với toast notifications
5. **Loading States**: Có loading indicators cho các actions

## Tương Lai

- [ ] Thêm modal rút tiền
- [ ] Thêm QR code cho các ví điện tử
- [ ] Thêm tính năng upload ảnh chứng từ
- [ ] Thêm thông báo real-time
- [ ] Thêm export lịch sử ra Excel/PDF 