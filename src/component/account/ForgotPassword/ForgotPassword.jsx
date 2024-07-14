import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {checkUserByEmail} from "../../../store/Action";
import {useDispatch} from "react-redux";


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    let emailExact = '';
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailSent) {
            toast.warning('Email đã được gửi.', { autoClose: 3000 });
            return;
        }

        const currentUserString = sessionStorage.getItem('currentUser');


        const currentUser = JSON.parse(currentUserString);




        try {
            const response = await axios.post('http://localhost:5000/api/getEmail', {
                email: email
            });
            if (response.status === 200) {
                const { email } = response.data;

                emailExact = email;
            } else {
                setMessage('Fail.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Fail');
            }
        }

        if (!emailExact) {
            setErrorMessage('Không tìm thấy người dùng.');
            return;
        }
        console.log(emailExact);
        // if (currentUser.email !== email) {
        //     setErrorMessage('Email không khớp.');
        //     return;
        // } else {
        //     setErrorMessage('');
        // }

        const resetLink = `${window.location.origin}/reset-password/${encodeURIComponent(email)}`;
        const emailData = {
            to_name: emailExact,
            reset_link: resetLink,
            subject: 'Quên mật khẩu từ Shop Shoes'
        };

        try {
            const response = await fetch('http://localhost:7000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (response.ok) {
                toast.success('Gửi mail thành công!', { autoClose: 3000 });
                setEmailSent(true);
               dispatch(checkUserByEmail(emailExact));
               console.log(emailExact)
                setErrorMessage('');
            } else {
                toast.error('Gửi mail thất bại. Vui lòng thử lại!', { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Gửi mail thất bại. Vui lòng thử lại!', { autoClose: 3000 });
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
            <ToastContainer />
        </MDBContainer>
    );
}

export default ForgotPassword;
