import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {loginSuccess} from "../../../store/Action";
import Navbar from "../../Navigation/navbar";
import Footers from "../../Footer/Footers";

function ResetPasswordPage() {
    const { username } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const currentUserString = sessionStorage.getItem('currentUser');
    let currentUser = JSON.parse(currentUserString);


        const updatePassword = async (newPassword) => {
        const currentUserString = sessionStorage.getItem('currentUser');
        const  emailReceive = localStorage.getItem('email');

        if(currentUserString != null){
            let currentUser = JSON.parse(currentUserString);
            if (typeof currentUser !== 'object' || Array.isArray(currentUser)) {
                return false;
            }

            currentUser.password = newPassword;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            try {
                const response = await axios.post('http://localhost:5000/api/user/resetpassword', {
                    username: currentUser.username,
                    newPassword: newPassword
                });
                if (response.status === 200) {
                    toast.success('Đặt lại mật khẩu thành công.', { autoClose: 3000 });
                    setErrorMessage('');
                } else {
                    setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message, { autoClose: 3000 });

                    setMessage(error.response.data.message);
                } else {
                    toast.error(error.response.data.message, { autoClose: 3000 });

                    setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');

                }
            }
        }else if(emailReceive != null){
            let emailString =JSON.parse(localStorage.getItem('email'));
            try {
                const response = await axios.post('http://localhost:5000/api/user/resetpasswordEmail', {
                   email: emailString,
                    newPassword: newPassword
                });
                if (response.status === 200) {
                    toast.success('Đặt lại mật khẩu thành công.', { autoClose: 3000 });
                } else {
                    setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message, { autoClose: 3000 });

                    setMessage(error.response.data.message);
                } else {
                    toast.error(error.response.data.message, { autoClose: 3000 });

                    setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');

                }
            }
        }


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
            //toast.success('Đặt lại mật khẩu thành công.', { autoClose: 3000 });
            setErrorMessage('');
        } else {
            toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại.', { autoClose: 3000 });
            setErrorMessage('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="page-wrapper">
            <Navbar/>
            <MDBContainer>

                <MDBRow className="justify-content-center mt-lg-5">
                    <MDBCol md="6">
                        <form onSubmit={handleSubmit}>
                            <p className="h4 text-center mb-4 title">
                                <MDBIcon fas icon="lock" className="me-2"/>
                                Đặt lại mật khẩu
                            </p>

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
                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            </div>

                            <div className="text-center mt-4">
                                <MDBBtn color="primary" type="submit">Đặt lại mật khẩu</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                <ToastContainer/>
            </MDBContainer>
            <hr/>
            <Footers></Footers>
        </div>
    );

}

export default ResetPasswordPage;
