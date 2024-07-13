// src/Register.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login,loginSuccess,loginFail} from "../../store/Action";
import {Link, useNavigate} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import "../Styles/Register.css"
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({ username: '', email: '',password: '' });
    const dispatch = useDispatch();
    const logging = useSelector((state) => state.logging);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      //  dispatch(login(user));
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: user.username,
                password: user.password,
            });
            if (response.status === 200) {
                const { user, cart } = response.data; // Destructure user and cart from response.data
                console.log('User:', user);
                console.log('Cart:', cart); // Log cart to verify its content

                dispatch(loginSuccess(user, cart)); // Dispatch login success action with user and cart
                setMessage('Đăng nhập thành công!');

                // Redirect or navigate to home page
                navigate('/');
            } else {
                setMessage('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        }
    };



    return (
        <div className="page-wrapper">
            <Navbar/>
        <MDBContainer className="my-5 text-center align-items-center ">
            <div className="container-register">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input className="ms-1"
                            minLength={5}
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            className="ms-1"
                            minLength={8}
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}/>
                    </div>
                    <button className="button-submit" style={{marginLeft:'-10px'}} type="submit" >
                       Đ
                    </button>
                    {message && <p className="error-mess">{message}</p>}
                    <br/>
                    <p>
                        <Link to="/forgot-password" className="register-link">Quên mật khẩu</Link>
                    </p>
                    <p>
                        Bạn mới biết đến Shop Shoes ? <Link to="/register" className="register-link">Đăng ký </Link>
                    </p>
                </form>
            </div>
        </MDBContainer>
            <hr/>
            <Footers></Footers>
        </div>

    );
};

export default Login;
