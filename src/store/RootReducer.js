import {useLocalStorage} from "../Hook/useLocalStorega";
const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
const  loadUsers =()=>{
    return JSON.parse(localStorage.getItem('users'))??[];
}
const loadCurrentUser = ()=>{
    return JSON.parse(localStorage.getItem('currentUser'));
}
const initState={
    products:[],
     cart:loadCart(),
    registering: false,
    logging: false,
    user:null,
    currentUser: loadCurrentUser(),
    users: loadUsers(),
    error: null,
}
export const root=(state= initState,action)=>{
    switch (action.type){
        case "product/load":{
            let cart=loadCart();
            let products=action.payload;
            let out=[];

            lop1:for (const p of products) {
                for (const c of cart) {
                    if(p.id===c.id){
                        out.push({...p,isBuying:true, color:'red' });
                        continue lop1;
                    }
                }
                    out.push({...p,isBuying:false, color: 'blue'});
            }
            return {
                ...state,
                products: out
            }
        }
        case 'cart/add': {
            const product = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);


            const productsUser = cart[userCartIndex].products;
            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);

            if (existProductIndex >= 0) {
                cart[userCartIndex].products[existProductIndex].quantity += product.quantity ;
            } else {
                cart[userCartIndex].products.push({ ...product, quantity: product.quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            return {
                ...state,
                cart,
                currentUser
            };
        }
        case 'cart/increasement':{
            const product = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);
            const productsUser = cart[userCartIndex].products;

            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);


            if (existProductIndex >= 0) {
                cart[userCartIndex].products[existProductIndex].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));

            }
            return {
                ...state,
                cart: cart
            };
        }
        case 'cart/decreasement':{
            const product = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);
            const productsUser = cart[userCartIndex].products;

            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);
            if (existProductIndex >= 0 &&  cart[userCartIndex].products[existProductIndex].quantity>= 1) {
                cart[userCartIndex].products[existProductIndex].quantity -= 1;

                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return {
                ...state,
                cart
            };
        }
        case "cart/del":{
            const product = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);

            const productsUser = cart[userCartIndex].products;
            const updatedProducts = productsUser.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size));
            cart[userCartIndex].products = updatedProducts;
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                ...state,
                cart
            }
        }
        case "user/register":{
            return {
                ...state,
                registering: true,
                user: action.payload,
                error: null,
            };
        }
        case "user/registerSuccess":{
            const user = action.payload;
            const users = [...state.users];
            const cart = [...state.cart];
            users.push({ ...user});
            cart.push({username: user.username, products: []});
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                ...state,
                registering: false,
               user,
                users,
                cart
            };
        }
        case "user/registerFail":{

            return {
                ...state,
                registering: false,
                error: action.payload,
            };
        }
        case "user/login":{
            return {
                ...state,
                logging: true,
                currentUser: action.payload,
                error: null,
            };
        }
        case "user/loginSuccess":{
            const currentUser = action.payload;


            localStorage.setItem("currentUser",JSON.stringify(currentUser))
            return {
                ...state,
                logging: false,
                currentUser: action.payload,
                users: action.payload,
                error: null
            };
        }
        case "user/loginFail":{
            return {
                ...state,
               logging: false,
                error: action.payload,
                users: action.payload

            };
        }
        case "user/logout":{
            localStorage.removeItem("currentUser")
            return {
                ...state,
                logging: true,
                error: action.payload,
                users: action.payload,
                currentUser: action.payload

            };
        }
        default: return state;
    }
}
