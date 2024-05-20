import {useSelector} from "react-redux";

export function CartInfo(){
    const cart = useSelector(state => state.cart);
    return (<p>Số Sản phẩm trong giở hàng: {cart.length}</p>);
}