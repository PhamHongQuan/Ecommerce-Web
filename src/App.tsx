import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from "./component/Hello";
import {useDispatch} from "react-redux";
import {products} from "./data/ProductData";
import ProductList from "./component/ProductList";
import {loadProduct} from "./store/Action";
import 'bootstrap/dist/css/bootstrap.css';




// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
import Navbar from "./component/Navigation/navbar";


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProduct(products));
        // dispatch(loadProduct(products));
    })
    return (
        <div className="App">

            <Navbar></Navbar>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <ProductList/>
        </div>
    );
}

export default App;
