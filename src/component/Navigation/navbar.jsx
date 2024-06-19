import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import * as mdb from 'mdb-ui-kit'; // lib
import { Dropdown, Collapse, initMDB, Ripple } from "mdb-ui-kit";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {CartInfo} from "../cart/CartInfo";
import {AccountInfo} from "../account/AccountInfo";
import "../Styles/Register.css";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, logout} from "../../store/Action";
import dark from "../Styles/dark.css"
import Search from "../search/search";


initMDB({ Dropdown, Ripple });
initMDB({ Dropdown, Collapse });
window.mdb = mdb;

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.currentUser);
    const logoutFunction  = ()=>{
        dispatch(logout());
        navigate('/');
        window.location.reload();
    }
    // eslint-disable-next-line no-undef
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    document.body.className = isChecked ? 'dark-mode' : '';


    const [query, setQuery] = useState('');
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // Xử lý khi thay đổi nội dung ô tìm kiếm
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // Xử lý khi người dùng gửi biểu mẫu

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container ">
                    <a className="navbar-brand fw-bold fs-4" href="#">Shop Shoes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Trang chủ</Link>
                            </li>

                            <li className="nav-item dropdown">
                                {location.pathname.includes("list-product") ? (
                                    <span
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        aria-expanded="false"
                                        style={{cursor: "default"}}
                                    >
                                        Danh sách
                                    </span>
                                ) : (
                                    <Link
                                        data-mdb-dropdown-init
                                        className="nav-link d-flex align-items-center"
                                        to="list-product"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        Danh sách
                                    </Link>
                                )}
                            </li>

                            <li className="nav-item">
                                <div className="buttons">
                                    <Link to="/cart"><i
                                        className="fa fa-cart-plus d-flex mt-2 fs-5"><CartInfo></CartInfo></i></Link>
                                    {/*<a href="" className="nav-link bg-dark d-flex align-items-center">*/}
                                    {/*    <Link to="/cart"> <i className="fa fa-cart-plus"></i><CartInfo></CartInfo></Link></a>*/}
                                </div>
                            </li>


                            <li className="nav-item dropdown">
                                {/*<Link to="/register"><i className="fa fa-cart-plus d-flex mt-2 fs-5"></i></Link>*/}

                                <a
                                    data-mdb-dropdown-init
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://cdn-icons-png.freepik.com/256/1144/1144760.png?ga=GA1.1.2079026882.1697034920&semt=ais_hybrid"
                                        className="rounded-circle"
                                        height="22"
                                        alt="Portrait of a Woman"
                                        loading="lazy"
                                    />
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">Tài khoản</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Hướng dẫn</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Lịch sử đơn hàng</a>
                                    </li>
                                    {currentUser ? (
                                        <a className="dropdown-item" onClick={logoutFunction}>
                                            Đăng xuất
                                        </a>
                                    ) : (
                                        <>
                                            <a className="dropdown-item">
                                                <Link to="/login">Đăng nhập </Link>
                                            </a>
                                            <a className="dropdown-item">
                                                <Link to="/register">Đăng ký </Link>
                                            </a>
                                        </>
                                    )}

                                </ul>
                            </li>
                        </ul>
                        {/*<Search></Search>*/}
                        <form className="d-flex position-relative" role="search" onSubmit={handleSubmit}>
                            <input className="form-control" type="search" placeholder="Search"
                                   aria-label="Search" value={query}
                                   onChange={handleInputChange}/>
                            <button className="" type="submit" style={{width: '30px'}}>
                                <i className="fa fa-search fa-lg justify-content-center"></i>
                            </button>
                        </form>

                        <div className="wrapper">
                            <div className="toggle">
                                <input className="toggle-input" type="checkbox" checked={isChecked}
                                       onChange={handleToggle}/>
                                <div className="toggle-bg"></div>
                                <div className="toggle-switch"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </div>

    );
}
export default Navbar;
