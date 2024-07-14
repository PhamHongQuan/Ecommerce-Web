const loadCart=()=>{
    return JSON.parse(sessionStorage.getItem('cart'))??[];
}
const  loadUsers =()=>{
    return JSON.parse(localStorage.getItem('users'))??[];
}
const loadCurrentUser = ()=>{
    return JSON.parse(sessionStorage.getItem('currentUser'));
}
const loadSelectedProduct =()=>{
    return JSON.parse(sessionStorage.getItem('selectedProduct'));
}
const initState={
    products:[],
    cart:loadCart(),
    registering: false,
    logging: false,
    user:null,
    currentUser: loadCurrentUser(),
    selectedProduct: loadSelectedProduct(),
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
            const productsUser = cart.products;
            const currentUser = loadCurrentUser();

            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);

            if (existProductIndex >= 0) {
                cart.products[existProductIndex].quantity += product.quantity ;
            } else {
                cart.products.push({ ...product, quantity: product.quantity });
            }

            sessionStorage.setItem('cart', JSON.stringify(cart));
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

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
            const productsUser = cart.products;

            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);


            if (existProductIndex >= 0) {
                cart.products[existProductIndex].quantity += 1;
               sessionStorage.setItem('cart', JSON.stringify(cart));

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

            const productsUser = cart.products;

            const existProductIndex = productsUser.findIndex(
                item => item.id === product.id && item.size === product.size && item.color === product.color);
            if (existProductIndex >= 0 &&  cart.products[existProductIndex].quantity>= 1) {
                cart.products[existProductIndex].quantity -= 1;

                sessionStorage.setItem('cart', JSON.stringify(cart));
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

            const productsUser = cart.products;
            const updatedProducts = productsUser.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size));
            cart.products = updatedProducts;
            sessionStorage.setItem('cart', JSON.stringify(cart));
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
            const { user, cart } = action.payload;
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("cart",JSON.stringify(cart));
            return {
                ...state,
                logging: false,
                currentUser: user,
                users: action.payload,
                cart: cart,
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
            sessionStorage.removeItem("currentUser");
            sessionStorage.removeItem("cart");
            return {
                ...state,
                logging: true,
                error: action.payload,
                users: action.payload,
                currentUser: action.payload,
                cart: action.payload

            };
        }
        case "cart/selectedProduct":{
            const product = action.payload;

            sessionStorage.setItem('selectedProduct', JSON.stringify(product));

            return {
                ...state,
                selectedProduct:    product

            };
        }
        case "user/getEmail":{

            const email = action.payload;
           localStorage.setItem('email', JSON.stringify(email));
            return {
                ...state,
                email
            };
        }
        case "pay/setOrder":{
            const order = action.payload;

            sessionStorage.setItem('setOrder', JSON.stringify(order));

            return {
                ...state,
                order
            };
        }
        default: return state;
    }
}
