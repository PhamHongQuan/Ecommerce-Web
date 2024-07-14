//
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {registerSuccess,registerFail,register} from "../../store/Action";
 import { useNavigate } from 'react-router-dom';
 import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
 import Navbar from "../Navigation/navbar";
 import Footers from "../Footer/Footers";
 import "../Styles/Register.css"
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                email,
                password,
            });
            setMessage('Đăng ký thành công!');
            navigate('/login');

            alert("Đăng ký thành công!");
        }  catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Đăng ký thất bại. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="page-wrapper">
                        <Navbar/>
            <MDBContainer className="my-5">
                <div className="container-register">
                    <h2 className="text-center">Register</h2>
                     <div className="ms-5 me-5">

                         <form onSubmit={handleRegister}>
                             <div>
                                 <label>Username:</label>
                                 <input minLength={5}
                                     type="text"
                                     value={username}
                                     onChange={(e) => setUsername(e.target.value)}
                                 />
                             </div>
                             <div>
                                 <label>Email:</label>
                                 <input className="email"
                                     type="email"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                 />
                             </div>
                             <div>
                                 <label>Password:</label>
                                 <input className="ms-1"      minLength={8}
                                     type="password"
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                                 />
                             </div>
                             <button className="button-submit mb-3" type="submit">Đăng ký</button>
                                 {message && <p>{message}</p>}
                         </form>
                     </div>

                </div>
            </MDBContainer>
            <hr/>
            <Footers></Footers>
        </div>
);
};

export default Register;

