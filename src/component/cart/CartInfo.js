import {useSelector} from "react-redux";
import React from "react";
import "../Styles/CartInfo.css";

export function CartInfo() {
    const cart = useSelector(state => state.cart);
    return ( <p className="ms-2 cart-info">Giỏ hàng({cart.length})</p>);
}