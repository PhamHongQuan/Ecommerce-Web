
const loadCart=()=>{
    return JSON.parse(localStorage.getItem('cart'))??[];
}
const initState={
    products:[],
    // cart:loadCart()
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
        // case "cart/add":{
        //     let cart = [...state.cart,action.payload];
        //     localStorage.setItem('cart',JSON.stringify(cart));
        //
        //     return {
        //         ...state,
        //         cart: [  ...cart  ]
        //     }
        // }
        // case "cart/del":{
        //     let cart=state.cart.filter(p=>p.id!==action.payload.id);
        //     localStorage.setItem('cart',JSON.stringify(cart));
        //     return {
        //         ...state,
        //         cart: [ ...cart ]
        //     }
        // }
        default: return state;
    }
}
