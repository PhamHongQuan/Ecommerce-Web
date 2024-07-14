import React, { useEffect, useState } from 'react';
import Navbar from "../Navigation/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart, selectOrder } from "../../store/Action";
import { MDBContainer } from "mdb-react-ui-kit";
import Footers from "../Footer/Footers";
import axios from 'axios';

const Pay = () => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({ name: '', phone: '', selectedCity: '', detailcity: '' });
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(state => state.currentUser);

    const selectedProduct = useSelector(state => state.selectedProduct);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
    };

    const cities = [
        'Hà Nội',
        'TP. Hồ Chí Minh',
        'Đà Nẵng',
        'Hải Phòng',
        'Cần Thơ',
        // Thêm các tỉnh/thành phố khác ở đây
    ];

    useEffect(() => {
        localStorage.setItem("selectedCity", order.selectedCity);
    }, [order.selectedCity]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        dispatch(selectOrder(order));
        try {
            setLoading(true);

            // Thực hiện yêu cầu POST tới server Express.js
            const res = await axios.post('http://localhost:4000/payment', {
                amount: selectedProduct.price
            });

            // Lấy URL từ server để chuyển hướng người dùng
            const payUrl = res.data.payUrl;

            // Chuyển hướng đến payUrl
            window.location.href = payUrl;
            if (res.status === 200) {
                console.log('Thanh toán thành công');
                    handleRemoveFromCart(selectedProduct);

            } else {
                console.error('Lỗi thanh toán:', res.data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thực hiện thanh toán:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleRemoveFromCart = async (product) => {
        dispatch(delCart(product));

        try {
            const response = await axios.post('http://localhost:5000/api/cart/delete', {
                username: currentUser.username,
                product
            });

            if (response.status === 200) {
                console.log('Xóa sản phẩm thành công');
                // Các xử lý khác nếu cần
            } else {
                console.error('Xóa sản phẩm thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm vào giỏ hàng:', error);
        }

    };




    return (
        <div>
            <div><Navbar /></div>
            <div className="d-flex justify-content-center mt-5">
                <form className="col-12 col-md-8 col-lg-4" onSubmit={handleSubmit}>
                    <div className="border border-dark w-100 text-center pb-4">
                        <div>
                            <p className="fs-5">Liên hệ</p>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Họ và tên</label>
                                <input
                                    type="text"
                                    maxLength="30"
                                    className="form-control w-75 mx-auto"
                                    name="name"
                                    value={order.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Số điện thoại</label>
                                <input
                                    type="tel"
                                    maxLength="10"
                                    className="form-control w-75 mx-auto"
                                    name="phone"
                                    value={order.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="pt-2">
                            <p className="fs-5">Địa chỉ</p>
                            <div>
                                <label className="d-flex ms-3 ms-md-5">Tỉnh/Thành phố</label>
                                <select
                                    className="form-control w-75 mx-auto"
                                    name="selectedCity"
                                    value={order.selectedCity}
                                    onChange={handleChange}
                                >
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
                                <input
                                    type="text"
                                    className="form-control w-75 mx-auto"
                                    name="detailcity"
                                    value={order.detailcity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className="button-submit" style={{ marginLeft: '-10px' }} type="submit">
                            Đặt hàng
                        </button>
                    </div>
                </form>
            </div>
            <hr />
            <div><Footers /></div>
        </div>
    );
};

export default Pay;
