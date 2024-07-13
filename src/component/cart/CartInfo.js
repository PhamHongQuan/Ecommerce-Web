import {useSelector} from "react-redux";
import React from "react";
import "../Styles/CartInfo.css";

const loadCart=()=>{
    return JSON.parse(sessionStorage.getItem('cart'))??[];
}

export function CartInfo() {
    const cart = useSelector(state => state.cart);
    const currentUser = useSelector(state => state.currentUser);
    if(currentUser != null) {
        if(cart != null){
            const countItem = cart.products.length;
            return ( <p className="ms-2 ">Giỏ hàng({countItem})</p>);
        }else {
            return ( <p className="ms-2">Giỏ hàng(0)</p>);
        }
    }else {
        return ( <p className="ms-2">Giỏ hàng</p>);
    }
}