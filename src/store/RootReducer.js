
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
            //
            lop1:for (const p of products) {
                for (const c of cart) {
                    if(p.id===c.id){
                        out.push({...p,isBuying:true});
                        continue lop1;
                    }
                }
                    out.push({...p,isBuying:false});
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
            const existProductIndex = productsUser.findIndex(item => item.id === product.id);

            if (existProductIndex >= 0) {
                cart[userCartIndex].prs[existProductIndex].quantity += 1;
            } else {
                cart[userCartIndex].prs.push({ ...product, quantity: 1 });
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
            const productId = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);


            const productsUser = cart[userCartIndex].prs;
            const existProductIndex = productsUser.findIndex(item => item.id === productId);


            if (existProductIndex >= 0) {
                cart[userCartIndex].prs[existProductIndex].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));

            }
            return {
                ...state,
                cart: cart
            };
        }
        case 'cart/decreasement':{
            const productId = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);


            const productsUser = cart[userCartIndex].prs;
            const existProductIndex = productsUser.findIndex(item => item.id === productId);
            if (existProductIndex >= 0 &&  cart[userCartIndex].prs[existProductIndex].quantity>= 1) {
                cart[userCartIndex].prs[existProductIndex].quantity -= 1;

                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return {
                ...state,
                cart
            };
        }
        case "cart/del":{
            const productId = action.payload;
            const cart = loadCart();
            const currentUser = loadCurrentUser();
            const userCartIndex = cart.findIndex(item=>item.username===currentUser.username);


            const productsUser = cart[userCartIndex].prs;
            const updatedProducts = productsUser.filter(item => item.id !== productId);
            cart[userCartIndex].prs = updatedProducts;
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
