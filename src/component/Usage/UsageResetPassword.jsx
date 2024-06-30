import React from 'react';

function UsageResetPassword() {
    return (
        <div>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 1: Vào Terminal nhập: "cd/src/EmailService" để chuyển đến thư mục EmailService.</p>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 2: Tại thư mục EmailService, nhập câu lệnh: "node EmailServer" để khởi chạy một máy chủ sử dụng Node.js để gửi email thông qua giao thức SMTP.</p>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 3: Sau khi thành công, truy cập đến trang reset-password trên giao diện web và tiến hành nhập email (được dùng để đăng nhập).</p>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 4: Sau khi nhận được email, truy cập vào link mà Email gửi vào nhập lại mật khẩu mới.</p>
        </div>
    );
}

export default UsageResetPassword;