import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';

function ResetPasswordPage() {
    const { username } = useParams(); // Lấy username từ URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserString = localStorage.getItem('currentUser');
        if (!currentUserString) {
            // Xử lý khi không có currentUser trong localStorage
            navigate('/not-found'); // Điều hướng đến trang 404
            return;
        }
        const currentUser = JSON.parse(currentUserString);

        const user = currentUser.find(user => user.username === username);
        if (!user) {
            navigate('/not-found'); // Điều hướng đến trang 404 nếu không tìm thấy user
        }

    }, [username, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu không khớp.');
            return;
        }


        const currentUserString = localStorage.getItem('currentUser');
        const usersString = localStorage.getItem('users');
        let currentUser = JSON.parse(currentUserString);
        let users = JSON.parse(usersString);
        let userExists = false;

        currentUser = currentUser.map(user => {
            if (user.username === username) {
                userExists = true;
                return { ...user, password };
            }
            return user;
        });

        users = users.map(user => {
            if (user.username === username) {
                userExists = true;
                return { ...user, password };
            }
            return user;
        });

        if (!userExists) {
            setErrorMessage('Tên đăng nhập không khớp.');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        setMessage('Đặt lại mật khẩu thành công.');
        setErrorMessage(''); // Xóa mọi thông báo lỗi trước đó

    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4 title">
                            <MDBIcon fas icon="lock" className="me-2"/>
                            Đặt lại mật khẩu
                        </p>
                        <p className="text-center">Đặt lại mật khẩu cho: {username}</p>
                        <MDBInput
                            label="Mật khẩu mới"
                            icon="lock"
                            type="password"
                            validate={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/>
                        <MDBInput
                            label="Xác nhận mật khẩu"
                            icon="lock"
                            type="password"
                            validate={true}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="text-center">
                            {message && <p className="text-success">{message}</p>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        </div>

                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit">Đặt lại mật khẩu</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ResetPasswordPage;
