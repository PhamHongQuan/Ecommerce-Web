import {useSelector} from "react-redux";
import React from "react";

export function CartInfo() {
    const cart = useSelector(state => state.cart);
    return ( <p>Giỏ hàng({cart.length})</p>);

}