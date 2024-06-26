// src/Register.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login,loginSuccess,loginFail} from "../../store/Action";
import {Link, useNavigate} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import "../Styles/Register.css"

const Login = () => {
    const [user, setUser] = useState({ username: '', email: '',password: '' });
    const dispatch = useDispatch();
    const logging = useSelector((state) => state.logging);
    const error = useSelector((state) => state.error);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(user));
        try {
            const response = await fakeApiLogin(user);
            dispatch(loginSuccess(response));
            navigate('/');
        } catch (err) {
            dispatch(loginFail(err.message));
        }
    };

    const fakeApiLogin = (user) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existUser = users.findIndex(item => item.username === user.username && item.password === user.password);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (existUser>=0) {
                    const indexUser = users[existUser];
                    resolve(indexUser);
                } else {
                    reject(new Error('Username sai or password sai'));
                }
            }, 1000);
        });
    };

    return (
        <MDBContainer className="my-5">

            <Navbar></Navbar>
            <div className="container-register">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}/>
                    </div>
                    <button className="button-submit" type="submit" disabled={logging}>
                        {logging ? 'Logging...' : 'Login'}
                    </button>
                    {error && <p className="error-mess">{error}</p>}
                    <br/>
                    <p>
                        Bạn mới biết đến Shop Shoes ? <Link to="/register" className="register-link">Đăng ký </Link>

                    </p>
                </form>
            </div>
            <Footers></Footers>

        </MDBContainer>

    );
};

export default Login;
