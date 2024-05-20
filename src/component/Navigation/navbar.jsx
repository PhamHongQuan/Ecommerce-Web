// import React from "react";
// import {MDBIcon} from "mdb-react-ui-kit";
// const Navbar = () =>{
//     return(
//         <div>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">Sneaker</a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                             data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                             aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
//                                    aria-expanded="false">
//                                     Danh mục
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li><a className="dropdown-item" href="#">Nike</a></li>
//                                     <li><a className="dropdown-item" href="#">Another action</a></li>
//                                     <li>
//                                         <hr className="dropdown-divider"/>
//                                     </li>
//                                     <li><a className="dropdown-item" href="#">Something else here</a></li>
//                                 </ul>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link disabled" aria-disabled="true">Giỏ hàng</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link disabled" aria-disabled="true">Thông tin</a>
//                             </li>
//
//                         </ul>
//                         <form className="d-flex" role="search">
//                             <input className="form-control me-2" type="search" placeholder="Search"
//                                    aria-label="Search"/>
//                             <button className="btn btn-outline-success" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//
//     );
// }
// export default Navbar ;

import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse,
    MDBBtn, MDBDropdownMenu, MDBDropdownItem, MDBDropdown, MDBDropdownToggle
} from 'mdb-react-ui-kit';

export default function App() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <header>
            <MDBNavbar expand='lg' light bgColor='white'>
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        onClick={() => setShowBasic(!showBasic)}
                        aria-controls='navbarExample01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <MDBIcon fas icon='bars' />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav right className='mb-2 mb-lg-0'>
                            <MDBNavbarItem active>
                                <MDBNavbarLink aria-current='page' href='#'>
                                    SHOP SNEAKER
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem active>
                                <MDBNavbarLink aria-current='page' href='#'>
                                    Trang chủ
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                        Danh Mục
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>Nike</MDBDropdownItem>
                                        <MDBDropdownItem link>Adidas</MDBDropdownItem>
                                        <MDBDropdownItem link>Puma</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'> Giỏ hàng</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                                        Thông Tin
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>Thông tin cá nhân</MDBDropdownItem>
                                        <MDBDropdownItem link>Lịch sử đơn hàng</MDBDropdownItem>
                                        <MDBDropdownItem link>Đăng nhập</MDBDropdownItem>
                                        <MDBDropdownItem link>Đăng ký</MDBDropdownItem>
                                        <MDBDropdownItem link>Đăng xuất</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <div
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>Heading</h1>
                            <h4 className='mb-3'>Subheading</h4>
                            <MDBBtn tag="a" outline size="lg">
                                Call to action
                            </MDBBtn>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}





