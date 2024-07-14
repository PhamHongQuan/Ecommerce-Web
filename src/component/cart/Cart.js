import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {Link, useParams} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { delCart, decreasement,increaseCart,selectedProduct} from "../../store/Action";
import Navbar from '../Navigation/navbar';
import Footers from "../Footer/Footers";
import "../Styles/CartInfo.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
const  loadCurrentUser=() => {
    return JSON.parse(localStorage.getItem('currentUser'));
}

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const currentUser = useSelector(state => state.currentUser);
    const navigate = useNavigate();
    if(currentUser == null){
        return (
        <div className="page-wrapper">
            <Navbar/>
            <MDBContainer className="" style={{marginBottom: '78px'}} >
                <MDBRow className="mt-5">
                    <p>Bạn phải <Link to="/login">Đăng nhập </Link></p>
                </MDBRow>
            </MDBContainer>
            <hr/>
            <Footers></Footers>
        </div>


        );
    }
    const productsOfCart = cart.products;
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

    const handleDecreasement = async (product) => {
        if (product.quantity > 1) {
            dispatch(decreasement(product));
            try {
                const response = await axios.post('http://localhost:5000/api/cart/decrease', {
                    username: currentUser.username,
                    product
                });

                if (response.status === 200) {
                    console.log('Decrease success');
                    // Các xử lý khác nếu cần
                } else {
                    console.error('Decrease fail');
                }
            } catch (error) {
                console.error('Lỗi:', error);
            }
        }

    };
    const handleIncreasement = async (product) => {
        dispatch(increaseCart(product));
        try {
            const response = await axios.post('http://localhost:5000/api/cart/increase', {
                username: currentUser.username,
                product
            });

            if (response.status === 200) {
                console.log('Increase success');
                // Các xử lý khác nếu cần
            } else {
                console.error('Increase fail');
            }
        } catch (error) {
            console.error('Lỗi :', error);
        }
    };
    const handleOrder = async (product) => {
        dispatch(selectedProduct(product));
        navigate('/pay');
    };


    return (
        <div className="page-wrapper">
            <Navbar/>
            <MDBContainer className="my-5">
                <MDBRow className="mt-5">
                    {productsOfCart.length === 0 ? (
                        <p>Giỏ hàng của bạn trống</p>
                    ) : (
                        productsOfCart.map(product => {
                                const totalPrice = product.price * product.quantity;
                                const formattedPrice = new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(totalPrice);

                                return (<MDBCol md="4" lg="3" key={product.id}>
                                    <MDBCard className="product-card">
                                        <MDBCardImage src={product.img} alt={product.name} position="top"/>
                                        <MDBCardBody>
                                            {/*<MDBCardTitle className="truncate-name">{product.name}</MDBCardTitle>*/}
                                            <MDBCardTitle className="fs-6 fw-bold pe-2">{product.name}</MDBCardTitle>
                                            {/*<MDBCardText className="truncate-description">{product.des}</MDBCardText>*/}
                                            <div className="detail-product">
                                                <p>Màu sắc: {product.color}</p>
                                                <p>Giá: {formattedPrice}</p>
                                                <p>Kích thước: {product.size}</p>

                                            </div>
                                            <div className="container-quantity mt-lg-1">

                                                <button
                                                    className="custom-button-quantity"
                                                    onClick={() => handleDecreasement(product)}>
                                                    -
                                                </button>
                                                <p>{product.quantity}</p>

                                                <button
                                                    className="custom-button-quantity"
                                                    onClick={() => handleIncreasement(product)}
                                                >
                                                    +
                                                </button>

                                                <button
                                                    className="custom-button-remove"
                                                    onClick={() => handleRemoveFromCart(product)}
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    className="custom-button-order"
                                                    onClick={() => handleOrder(product)}
                                                >
                                                    Đặt hàng
                                                </button>
                                            </div>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>);
                            }
                        )
                    )}
                </MDBRow>
            </MDBContainer>
            <hr/>
            <Footers></Footers>
        </div>


    );

};

export default Cart;

