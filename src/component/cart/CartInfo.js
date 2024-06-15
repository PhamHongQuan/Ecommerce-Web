import {useSelector} from "react-redux";
import React from "react";
const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
export function CartInfo() {
    const cart = useSelector(state => state.cart);
    const currentUser = useSelector(state => state.currentUser);
    if(currentUser != null) {
        const userCart = cart.find(item=>item.username===currentUser.username);
        if(userCart != null){
            const  countItem = userCart.products.length
            return ( <p className="ms-2">Giỏ hàng({countItem})</p>);
        }else {
            return ( <p className="ms-2">Giỏ hàng(0)</p>);
        }
    }else {
        return ( <p className="ms-2">Giỏ hàng</p>);
    }




}