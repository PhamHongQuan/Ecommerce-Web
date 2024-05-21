import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { loadProduct } from './store/Action';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/Navigation/navbar';
import {BrowserRouter, Outlet, Route, RouterProvider, Routes} from 'react-router-dom';
import Router from "./Router/web";
import ProductList from "./component/ListProduct/ProductList";
import ProductDetail from "./component/ListProduct/ProductDetail";
import Error from "./component/Error";

function App() {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // Giả sử 'products' là dữ liệu bạn muốn load từ một nguồn nào đó
    //     // dispatch(loadProduct(products));
    // }, [dispatch]);

    return (
        <div className="App">
            <Navbar />
            <Outlet />
        </div>
    );

}

export default App;
