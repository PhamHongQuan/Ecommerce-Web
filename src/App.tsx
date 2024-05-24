import React from 'react';
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
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Slideshow from "./component/Slideshow/slideshow";
import Footers from "./component/Footer/Footers";
import 'mdb-react-ui-kit'
import Homes from "./component/Home/Homes";

function App() {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // Giả sử 'products' là dữ liệu bạn muốn load từ một nguồn nào đó
    //     // dispatch(loadProduct(products));
    // }, [dispatch]);

    return (
        <div className="App">
            <Outlet/>
            <Navbar></Navbar>
            <Slideshow></Slideshow>
            <Footers></Footers>

            {/* eslint-disable-next-line react/jsx-no-undef */}
            {/*<ProductList/>*/}
        </div>
    );

}

export default App;
