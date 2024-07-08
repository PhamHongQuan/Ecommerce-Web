import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import {Link, useParams} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { delCart, decreasement,increaseCart} from "../../store/Action";
import Navbar from '../Navigation/navbar';
import Footers from "../Footer/Footers";
import "../Styles/CartInfo.css";

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

    if(currentUser == null){
        return (

            <div className="page-wrapper">
                <Navbar/>
                <MDBContainer className="my-5">
            <p>Bạn phải   <Link to="/login">Đăng nhập </Link>
            </p>
            <Footers></Footers>
        </MDBContainer>
            </div>
                );
    }
    const userCart = cart.find(item => item.username === currentUser.username);
    const productsOfCart = userCart.products;
    const handleRemoveFromCart = (product) => {
        dispatch(delCart(product));
    };

    const handleDecreasement = (product) => {
        dispatch(decreasement(product));
    };
    const handleIncreasement = (product) => {
        dispatch(increaseCart(product));
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
                                            <MDBCardTitle className="truncate-name">{product.name}</MDBCardTitle>
                                            <MDBCardText className="truncate-description">{product.des}</MDBCardText>


                                            <div className="detail-product">
                                                <p>Màu sắc: {product.color}</p>
                                                <p>{formattedPrice}</p>
                                                <p>Kích thước: {product.size}</p>

                                            </div>
                                            <div className="container-quantity">

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

