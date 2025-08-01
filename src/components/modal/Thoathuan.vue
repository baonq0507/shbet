<script setup>
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
</script>

<template>
    <a-modal v-model:visible="props.visible" centered :footer="false" @cancel="handleClose" width="800px">
        <div class="agreement-content">
            <h1>Thỏa thuận đăng ký người dùng</h1>
            <ol>
                <li>
                    <strong> Xác nhận độ tuổi:</strong> Người dùng cam kết đã đủ 18 tuổi trở lên khi đăng ký tài khoản tại trang web này.
                </li>
                <li>
                    <strong>Bảo mật thông tin:</strong> Người dùng chịu trách nhiệm bảo mật thông tin tài khoản, mật khẩu và các thông tin cá nhân đã đăng ký. Trang web không chịu trách nhiệm nếu người dùng để lộ thông tin cá nhân cho bên thứ ba.
                </li>
                <li>
                    <strong>Thông tin đăng ký:</strong> Người dùng cam kết cung cấp thông tin chính xác, trung thực và chịu trách nhiệm về các thông tin đã cung cấp. Nếu phát hiện thông tin sai lệch, trang web có quyền khóa hoặc hủy tài khoản mà không cần báo trước.
                </li>
                <li>
                    <strong>Quyền sử dụng:</strong> Người dùng không được sử dụng tài khoản để thực hiện các hành vi vi phạm pháp luật, gian lận, lừa đảo hoặc gây ảnh hưởng xấu đến cộng đồng.
                </li>
                <li>
                    <strong>Thay đổi thỏa thuận:</strong> Trang web có quyền thay đổi, bổ sung nội dung thỏa thuận này bất cứ lúc nào. Người dùng có trách nhiệm theo dõi và cập nhật các thay đổi.
                </li>
                <li>
                    <strong>Chấm dứt tài khoản:</strong> Nếu phát hiện vi phạm, trang web có quyền tạm ngưng hoặc chấm dứt tài khoản của người dùng mà không cần báo trước.
                </li>
                <li>
                    <strong>Đồng ý thỏa thuận:</strong> Khi nhấn nút đăng ký, người dùng xác nhận đã đọc, hiểu và đồng ý với tất cả các điều khoản trên.
                </li>
            </ol>
            <div class="agreement-note">
                <em>Lưu ý: Nếu có thắc mắc về thỏa thuận, vui lòng liên hệ bộ phận hỗ trợ khách hàng để được giải đáp.</em>
            </div>
        </div>
    </a-modal>
</template>

<style scoped>
.agreement-content {
    padding: 20px 10px;
    color: #2c5aa0;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #101929;
}
.agreement-content h1 {
    color: #2c5aa0;
    font-size: 22px;
    margin-bottom: 18px;
    text-align: center;
    font-weight: bold;
}
.agreement-content ol {
    margin-left: 18px;
    margin-bottom: 18px;
}
.agreement-content li {
    margin-bottom: 12px;
    font-size: 15px;
    line-height: 1.6;
}
.agreement-content strong {
    color: #4a90e2;
}
.agreement-note {
    margin-top: 18px;
    font-size: 14px;
    color: #5a6c7d;
    text-align: center;
}
</style>