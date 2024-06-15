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

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        // Mock API
        setTimeout(() => {
            setMessage('Password reset successfully.');
        }, 1000);
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4 title">
                            <MDBIcon fas icon="lock" className="me-2"/>
                            Reset Password
                        </p>
                        <MDBInput
                            label="New Password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/>
                        <MDBInput
                            label="Confirm Password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="text-center">
                            {message && <p className="text-success">{message}</p>}
                        </div>

                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit">Reset Password</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ResetPasswordPage;
