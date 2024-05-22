import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import * as mdb from 'mdb-ui-kit'; // lib

// import {Dropdown, Ripple, initMDB} from "mdb-ui-kit";
import {Dropdown, Collapse, initMDB, Ripple} from "mdb-ui-kit";
initMDB({Dropdown, Ripple});
initMDB({ Dropdown, Collapse });
window.mdb = mdb;
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import {MDBIcon} from "mdb-react-ui-kit";
// import button from "bootstrap/js/src/button";
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="#">Shop Shoes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    data-mdb-dropdown-init
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    aria-expanded="false"
                                > Danh sách
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">Bitis</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Adidas</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Puma</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Nike</a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <div className="buttons">
                                    <a href="" className="nav-link">
                                        <i className="fa fa-cart-plus me-1"></i>Giỏ hàng(0)</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
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
                                        <a className="dropdown-item" href="#">Lịch sử đơn hàng</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Đăng nhập</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Đăng ký</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Đăng xuất</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>


            {/*<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">*/}
            {/*    <div className="container-fluid">*/}
            {/*        <button*/}
            {/*            data-mdb-collapse-init*/}
            {/*            className="navbar-toggler"*/}
            {/*            type="button"*/}
            {/*            data-mdb-target="#navbarCenteredExample"*/}
            {/*            aria-controls="navbarCenteredExample"*/}
            {/*            aria-expanded="false"*/}
            {/*            aria-label="Toggle navigation"*/}
            {/*        >*/}
            {/*            <i className="fas fa-bars"></i>*/}
            {/*        </button>*/}

            {/*        <div*/}
            {/*            className="collapse navbar-collapse justify-content-center"*/}
            {/*            id="navbarCenteredExample"*/}
            {/*        >*/}
            {/*            <ul className="navbar-nav mb-2 mb-lg-0">*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link active" aria-current="page" href="#">Home</a>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link" href="#">Link</a>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item dropdown">*/}
            {/*                    <a*/}
            {/*                        data-mdb-dropdown-init*/}
            {/*                        className="nav-link dropdown-toggle"*/}
            {/*                        href="#"*/}
            {/*                        id="navbarDropdown"*/}
            {/*                        role="button"*/}
            {/*                        aria-expanded="false"*/}
            {/*                    >*/}
            {/*                        Dropdown*/}
            {/*                    </a>*/}
            {/*                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
            {/*                        <li>*/}
            {/*                            <a className="dropdown-item" href="#">Action</a>*/}
            {/*                        </li>*/}
            {/*                        <li>*/}
            {/*                            <a className="dropdown-item" href="#">Another action</a>*/}
            {/*                        </li>*/}
            {/*                        <li>*/}
            {/*                            <hr className="dropdown-divider"/>*/}
            {/*                        </li>*/}
            {/*                        <li>*/}
            {/*                            <a className="dropdown-item" href="#">Something else here</a>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link disabled"*/}
            {/*                    >Disabled</a*/}
            {/*                    >*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}
        </div>
    );
}
export default Navbar;

// import React, { useState } from 'react';
// import {
//     MDBNavbar,
//     MDBNavbarNav,
//     MDBNavbarItem,
//     MDBNavbarLink,
//     MDBNavbarToggler,
//     MDBContainer,
//     MDBIcon,
//     MDBCollapse,
//     MDBBtn, MDBDropdownMenu, MDBDropdownItem, MDBDropdown, MDBDropdownToggle
// } from 'mdb-react-ui-kit';
//
// export default function App() {
//     const [showBasic, setShowBasic] = useState(false);
//
//     return (
//         <header>
//             <MDBNavbar expand='lg' light bgColor='white'>
//                 <MDBContainer fluid>
//                     <MDBNavbarToggler
//                         onClick={() => setShowBasic(!showBasic)}
//                         aria-controls='navbarExample01'
//                         aria-expanded='false'
//                         aria-label='Toggle navigation'
//                     >
//                         <MDBIcon fas icon='bars' />
//                     </MDBNavbarToggler>
//                     <MDBCollapse navbar show={showBasic}>
//                         <MDBNavbarNav right className='mb-2 mb-lg-0'>
//                             <MDBNavbarItem active>
//                                 <MDBNavbarLink aria-current='page' href='#'>
//                                     SHOP SNEAKER
//                                 </MDBNavbarLink>
//                             </MDBNavbarItem>
//                             <MDBNavbarItem active>
//                                 <MDBNavbarLink aria-current='page' href='#'>
//                                     Trang chủ
//                                 </MDBNavbarLink>
//                             </MDBNavbarItem>
//                             <MDBNavbarItem>
//                                 <MDBDropdown>
//                                     <MDBDropdownToggle tag='a' className='nav-link' role='button'>
//                                         Danh Mục
//                                     </MDBDropdownToggle>
//                                     <MDBDropdownMenu>
//                                         <MDBDropdownItem link>Nike</MDBDropdownItem>
//                                         <MDBDropdownItem link>Adidas</MDBDropdownItem>
//                                         <MDBDropdownItem link>Puma</MDBDropdownItem>
//                                     </MDBDropdownMenu>
//                                 </MDBDropdown>
//                             </MDBNavbarItem>
//                             <MDBNavbarItem>
//                                 <MDBNavbarLink href='#'> Giỏ hàng</MDBNavbarLink>
//                             </MDBNavbarItem>
//                             <MDBNavbarItem>
//                                 <MDBDropdown>
//                                     <MDBDropdownToggle tag='a' className='nav-link' role='button'>
//                                         Thông Tin
//                                     </MDBDropdownToggle>
//                                     <MDBDropdownMenu>
//                                         <MDBDropdownItem link>Thông tin cá nhân</MDBDropdownItem>
//                                         <MDBDropdownItem link>Lịch sử đơn hàng</MDBDropdownItem>
//                                         <MDBDropdownItem link>Đăng nhập</MDBDropdownItem>
//                                         <MDBDropdownItem link>Đăng ký</MDBDropdownItem>
//                                         <MDBDropdownItem link>Đăng xuất</MDBDropdownItem>
//                                     </MDBDropdownMenu>
//                                 </MDBDropdown>
//                             </MDBNavbarItem>
//
//                         </MDBNavbarNav>
//                     </MDBCollapse>
//                 </MDBContainer>
//             </MDBNavbar>
//
//             <div
//                 className='p-5 text-center bg-image'
//                 style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
//             >
//                 <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
//                     <div className='d-flex justify-content-center align-items-center h-100'>
//                         <div className='text-white'>
//                             <h1 className='mb-3'>Heading</h1>
//                             <h4 className='mb-3'>Subheading</h4>
//                             <MDBBtn tag="a" outline size="lg">
//                                 Call to action
//                             </MDBBtn>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

// import React, { useState } from 'react';
// import {
//     MDBContainer,
//     MDBNavbar,
//     MDBNavbarBrand,
//     MDBNavbarToggler,
//     MDBIcon,
//     MDBNavbarNav,
//     MDBNavbarItem,
//     MDBNavbarLink,
//     MDBBtn,
//     MDBDropdown,
//     MDBDropdownToggle,
//     MDBDropdownMenu,
//     MDBDropdownItem,
//     MDBCollapse,
// } from 'mdb-react-ui-kit';
//
// export default function App() {
//     const [openBasic, setOpenBasic] = useState(false);
//
//     return (
//         <MDBNavbar expand='lg' light bgColor='light'>
//             <MDBContainer fluid>
//                 <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>
//
//                 <MDBNavbarToggler
//                     aria-controls='navbarSupportedContent'
//                     aria-expanded='false'
//                     aria-label='Toggle navigation'
//                     onClick={() => setOpenBasic(!openBasic)}
//                 >
//                     <MDBIcon icon='bars' fas />
//                 </MDBNavbarToggler>
//
//                 <MDBCollapse navbar open={openBasic}>
//                     <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
//                         <MDBNavbarItem>
//                             <MDBNavbarLink active aria-current='page' href='#'>
//                                 Home
//                             </MDBNavbarLink>
//                         </MDBNavbarItem>
//                         <MDBNavbarItem>
//                             <MDBNavbarLink href='#'>Link</MDBNavbarLink>
//                         </MDBNavbarItem>
//
//                         <MDBNavbarItem>
//                             <MDBDropdown>
//                                 <MDBDropdownToggle tag='a' className='nav-link' role='button'>
//                                     Dropdown
//                                 </MDBDropdownToggle>
//                                 <MDBDropdownMenu>
//                                     <MDBDropdownItem link>Action</MDBDropdownItem>
//                                     <MDBDropdownItem link>Another action</MDBDropdownItem>
//                                     <MDBDropdownItem link>Something else here</MDBDropdownItem>
//                                 </MDBDropdownMenu>
//                             </MDBDropdown>
//                         </MDBNavbarItem>
//
//                         <MDBNavbarItem>
//                             <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
//                                 Disabled
//                             </MDBNavbarLink>
//                         </MDBNavbarItem>
//                     </MDBNavbarNav>
//
//                     <form className='d-flex input-group w-auto'>
//                         <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
//                         <MDBBtn color='primary'>Search</MDBBtn>
//                     </form>
//                 </MDBCollapse>
//             </MDBContainer>
//         </MDBNavbar>
//     );
// }
