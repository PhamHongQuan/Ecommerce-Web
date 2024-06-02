import {useSelector} from "react-redux";
import React from "react";

export function CartInfo() {
    const cart = useSelector(state => state.cart);
    return ( <p className="ms-2">Giỏ hàng({cart.length})</p>);

}