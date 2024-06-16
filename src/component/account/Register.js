// src/Register.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {registerSuccess,registerFail,register} from "../../store/Action";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import "../Styles/Register.css"

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const registering = useSelector((state) => state.registering);
    const error = useSelector((state) => state.error);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(user));
        try {
            const response = await fakeApiRegister(user);
            dispatch(registerSuccess(response));
            navigate('/login');
        } catch (err) {
            dispatch(registerFail(err.message));
        }
    };

    const fakeApiRegister = (user) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existUser = users.findIndex(item => item.username === user.username);
        let usernameString = user.username.toString();
        let passwordString = user.password.toString();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (existUser>=0) {
                    reject(new Error('Username đã tồn tại. Hãy đặt username khác'));
                }else if(usernameString.length <5){
                    reject(new Error('Username phải lớn hơn 5 kí tu'));
                }else if(passwordString.length <8){
                    reject(new Error('Password phải lớn hơn 8 kí tu'));
                }
                else {
                    resolve(user);
                }
            }, 1000);
        });
    };

    return (
        <MDBContainer className="my-5">

        <Navbar></Navbar>
            <div className="container-register">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div >
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
                    <button className="button-submit" type="submit" disabled={registering}>
                        {registering ? 'Registering...' : 'Register'}
                    </button>
                    {error && <p className="error-mess">{error}</p>}
                </form>
            </div>
            <Footers></Footers>

        </MDBContainer>

    );
};

export default Register;
