import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import {Link, useParams} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { delCart, decreasement,increaseCart} from "../../store/Action";
import Navbar from '../../component/Navigation/navbar';
import Footers from "../Footer/Footers";
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
        return (<MDBContainer className="my-5">
            <Navbar></Navbar>
            <p>Bạn phải   <Link to="/login">Đăng nhập </Link>
            </p>
            <Footers></Footers>
        </MDBContainer>);
    }


    const userCart = cart.find(item => item.username === currentUser.username);



    const productsOfCart = userCart.products;




    const handleRemoveFromCart = (productId) => {
        dispatch(delCart(productId));
    };

    const handleDecreasement = (productId) => {
        dispatch(decreasement(productId));
    };
    const handleIncreasement = (productId) => {
        dispatch(increaseCart(productId));
    };

    return (

        <MDBContainer className="my-5">
            <Navbar></Navbar>
            <MDBRow>
                {productsOfCart.length === 0 ? (
                    <p>Giỏ hàng của bạn trống</p>
                ) : (
                    productsOfCart.map(product => (


                        <MDBCol md="4" lg="3" key={product.id}>
                            <MDBCard className="product-card">
                                <MDBCardImage src={product.img} alt={product.name} position="top"/>
                                <MDBCardBody>
                                    <MDBCardTitle className="truncate-name">{product.name}</MDBCardTitle>
                                    <MDBCardText className="truncate-description">{product.des}</MDBCardText>
                                    <span className="text-danger">{product.price}</span>
                                    <p>Quantity: {product.quantity}</p>

                                    <button
                                        className="custom-button"
                                        onClick={() => handleIncreasement(product.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="custom-button"
                                        onClick={() => handleDecreasement(product.id)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="custom-button"
                                        onClick={() => handleRemoveFromCart(product.id)}
                                    >
                                        Remove
                                    </button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))
                )}
            </MDBRow>
            <Footers></Footers>
        </MDBContainer>
    );
};

export default Cart;

