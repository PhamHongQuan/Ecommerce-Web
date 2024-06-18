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

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
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

        if (currentUser.email !== email) {
            setErrorMessage('Email không khớp.');
            return;
        } else {
            setErrorMessage('');
        }

        const resetLink = `${window.location.origin}/reset-password/${encodeURIComponent(email)}`;
        const emailData = {
            to_name: email,
            reset_link: resetLink,
            subject: 'Quên mật khẩu từ Shop Shoes'
        };

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (response.ok) {
                alert('Gửi mail thành công!');
                setEmailSent(true);
                setErrorMessage('');
            } else {
                alert('Gửi mail thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Gửi mail thất bại. Vui lòng thử lại!');
        }
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
                            label="Email của bạn"
                            icon="envelope"
                            type="email"
                            validate="true"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
