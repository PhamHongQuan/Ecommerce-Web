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
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // const resetLink = `${window.location.origin}/reset-password/${encodeURIComponent(email)}`;
        const resetLink = `${window.location.origin}/reset-password`;
        const templateParams = {
            to_name: email,
            from_name: 'Shop Shoes Support',
            reset_link: resetLink,
            subject: 'Quên mật khẩu từ Shop Shoes'
        };

        emailjs.send('service_ou5eq8o', 'template_6o4tzwy', templateParams, 'TvQoV-mgIwtuBK0l5')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Gửi mail thành công!');
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
                            Forgot password
                        </p>
                        <MDBInput
                            label="Your email"
                            icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default ForgotPassword;
