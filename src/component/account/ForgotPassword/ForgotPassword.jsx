import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import emailjs from 'emailjs-com';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (emailSent) {
            alert('Email đã được gửi.');
            return;
        }

        const currentUserString = localStorage.getItem('currentUser');
        if (!currentUserString) {
            setErrorMessage('Không tìm thấy người dùng.');
            return;
        }

        const currentUser = JSON.parse(currentUserString);
        if (!Array.isArray(currentUser) || currentUser.length === 0) {
            setErrorMessage('Dữ liệu người dùng không hợp lệ.');
            return;
        }

        const user = currentUser.find(user => user.username === username);
        if (!user) {
            setErrorMessage('Tên đăng nhập không khớp.');
            return;
        }else {
            setErrorMessage('');
        }

        const resetLink = `${window.location.origin}/reset-password/${encodeURIComponent(username)}`;
        const templateParams = {
            to_name: username,
            from_name: 'Shop Shoes Support',
            reset_link: resetLink,
            subject: 'Quên mật khẩu từ Shop Shoes'
        };

        emailjs.send('service_ou5eq8o', 'template_6o4tzwy', templateParams, 'TvQoV-mgIwtuBK0l5')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Gửi mail thành công!');
                setEmailSent(true); // Đánh dấu mail đã được gửi
                setErrorMessage(''); // Xóa mọi thông báo lỗi trước đó
            }, (err) => {
                console.log('FAILED...', err);
                alert('Gửi mail thất bại. Vui lòng thử lại!');
            });
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4 title">
                            <MDBIcon fas icon="lock" className="me-2" />
                            Quên mật khẩu
                        </p>
                        <MDBInput
                            label="Tên đăng nhập của bạn"
                            icon="user"
                            type="text"
                            validate="true"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit">Gửi</MDBBtn>
                        </div>
                        {errorMessage && (
                            <div className="text-center text-danger mt-2">
                                {errorMessage}
                            </div>
                        )}
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ForgotPassword;
