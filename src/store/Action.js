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
export const register = (user) => {
    return{
        type: 'user/register',
        payload: user
    }
}
export  const  registerSuccess =(user) => {
    return {
        type:'user/registerSuccess',
        payload: user
    }
}
export  const  registerFail =(error) => {
    return {
        type:'user/registerFail',
        payload: error
    }
}
export const login =(user) =>{
    return{
        type: 'user/login',
        payload: user
    }
}
export  const  loginSuccess =(user) => {
    return {
        type:'user/loginSuccess',
        payload: user
    }
}
export  const  loginFail =(error) => {
    return {
        type:'user/loginFail',
        payload: error
    }
}
export  const logout =() =>{
    return{
        type: 'user/logout'
    }
}