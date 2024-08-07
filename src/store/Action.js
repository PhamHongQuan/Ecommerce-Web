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

export const delCart=(product)=>{
    return {
        type:'cart/del',
        payload:product
    }
}
export const increaseCart=(product)=>{
    return {
        type:'cart/increasement',
        payload:product
    }
}
export const decreasement = (product) =>{
    return{

        type:'cart/decreasement',
        payload: product
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
export  const  loginSuccess =(user,cart) => {
    return {
        type:'user/loginSuccess',
        payload:  {user, cart}
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
export  const  selectedProduct=(product)=>{
    return{
        type: 'cart/selectedProduct',
        payload:product
    }
}
export const checkUserByEmail = (email) =>{
    return{
        type: 'user/getEmail',
        payload:email
    }
}
export  const selectOrder = (order)=>{
    return{
        type: 'pay/setOrder',
        payload:order
    }
}