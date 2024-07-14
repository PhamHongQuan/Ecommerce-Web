import React, { useState } from 'react';
import Navbar from "../Navigation/navbar";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addCart, delCart } from "../../store/Action";
import { MDBContainer } from "mdb-react-ui-kit";
import Footers from "../Footer/Footers";

const Pay = () => {
    const cities = [
        'Hà Nội',
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Hải Phòng',
        'Cần Thơ',
        // Thêm các tỉnh/thành phố khác ở đây
    ];

    const [selectedCity, setSelectedCity] = useState('');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <div><Navbar /></div>
            <div className="d-flex justify-content-center mt-5">
                <form action="" method="" className="col-12 col-md-8 col-lg-4">
                    <div className="border border-dark w-100 text-center pb-4">
                        <div>
                            <p className="fs-5">Liên hệ</p>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Họ và tên</label>
                                <input type="text" maxLength="30" className="form-control w-75 mx-auto" />
                            </div>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Số điện thoại</label>
                                <input type="tel" maxLength="10" className="form-control w-75 mx-auto" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <p className="fs-5">Địa chỉ</p>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Tỉnh/Thành phố</label>
                                <select className="form-control w-75 mx-auto" value={selectedCity} onChange={handleCityChange}>
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Địa chỉ cụ thể</label>
                                <input type="text" className="form-control w-75 mx-auto" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            <div><Footers /></div>
        </div>
    );
};

export default Pay;
