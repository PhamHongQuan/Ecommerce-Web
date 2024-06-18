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
    const { username } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserString = localStorage.getItem('currentUser');
        if (!currentUserString) {
            navigate('/not-found');
            return;
        }

    }, [username, navigate]);

    const updatePassword = (newPassword) => {
        const currentUserString = localStorage.getItem('currentUser');
        let currentUser = JSON.parse(currentUserString);

        const usersString = localStorage.getItem('users');
        let users = JSON.parse(usersString);

        if (typeof currentUser !== 'object' || Array.isArray(currentUser)) {
            return false;
        }
        if (!Array.isArray(users)) {
            return false;
        }

        currentUser.password = newPassword;

        users = users.map(user => {
            if (user.username === currentUser.username || user.email === currentUser.email) {
                return { ...user, password: newPassword };
            }
            return user;
        });

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu không khớp.');
            return;
        }

        const updated = updatePassword(password);

        if (updated) {
            setMessage('Đặt lại mật khẩu thành công.');
            setErrorMessage('');
        } else {
            setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
        }
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
