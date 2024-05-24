import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { useParams } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { delCart, decreasement,increaseCart} from "../../store/Action";
import Navbar from '../../component/Navigation/navbar';
import Footers from "../Footer/Footers";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map((product) => (
                        <MDBCol md="4" lg="3" key={product.id}>
                            <MDBCard className="product-card">
                                <MDBCardImage src={product.img} alt={product.name} position="top" />
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

