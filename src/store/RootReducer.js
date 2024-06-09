import {useLocalStorage} from "../Hook/useLocalStorega";
const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
const  loadUsers =()=>{
    return JSON.parse(localStorage.getItem('users'))??[];
}
const initState={
    products:[],
     cart:loadCart(),
    registering: false,
    logging: false,
    user:null,
    currentUser: null,
    users: loadUsers(),
    error: null,
}
export const root=(state= initState,action)=>{
    switch (action.type){
        case "product/load":{
            let cart=loadCart();
            let products=action.payload;
            let out=[];
            //
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
            const cart = [...state.cart];
            const existProduct = cart.findIndex(item => item.id === product.id);

            if (existProduct >= 0) {
                cart[existProduct] = {
                    ...cart[existProduct],
                    quantity: cart[existProduct].quantity + 1
                };
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                ...state,
                cart
            };
        }
        case 'cart/increasement':{
            const productId = action.payload;
            const cart = [...state.cart];
            const existProductIndex = cart.findIndex(item => item.id === productId);

            if (existProductIndex >= 0 && cart[existProductIndex].quantity >= 0) {
                cart[existProductIndex] = {
                    ...cart[existProductIndex],
                    quantity: cart[existProductIndex].quantity + 1
                };

                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return {
                ...state,
                cart
            };
        }
        case 'cart/decreasement':{
            const productId = action.payload;
            const cart = [...state.cart];
            const existProductIndex = cart.findIndex(item => item.id === productId);

            if (existProductIndex >= 0 && cart[existProductIndex].quantity >= 1) {
                cart[existProductIndex] = {
                    ...cart[existProductIndex],
                    quantity: cart[existProductIndex].quantity - 1
                };

                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return {
                ...state,
                cart
            };
        }
        case "cart/del":{
            const cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(cart));
            return {
                ...state,
                cart: [ ...cart ]
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
            users.push({ ...user});
            localStorage.setItem('users', JSON.stringify(users));
            return {
                ...state,
                registering: false,
               user,
                users
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
                currentUser,
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
                users: action.payload

            };
        }
        default: return state;
    }
}
