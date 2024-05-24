export const loadProduct=(data)=>{
    return {
        type:'product/load',
        payload:data
    }
}
export const addCart=(product)=>{
    return {
        type:'cart/add',
        payload: product
    }
}

export const delCart=(productid)=>{
    return {
        type:'cart/del',
        payload:productid
    }
}
export const increaseCart=(productid)=>{
    return {
        type:'cart/increasement',
        payload:productid
    }
}
export const decreasement = (productid) =>{
    return{

        type:'cart/decreasement',
        payload: productid
    }
}