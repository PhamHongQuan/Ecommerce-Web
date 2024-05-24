
const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
const initState={
    products:[],
     cart:loadCart()
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
        default: return state;
    }
}
