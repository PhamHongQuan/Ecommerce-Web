import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from "./component/Hello";
import {useDispatch} from "react-redux";
import {products} from "./data/ProductData";
import ProductList from "./component/ProductList";
import {loadProduct} from "./store/Action";
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Navbar from "./component/Navigation/navbar";
import Slideshow from "./component/Slideshow/slideshow";
import Footers from "./component/Footer/Footers";
import 'mdb-react-ui-kit'


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProduct(products));
        // dispatch(loadProduct(products));
    })
    return (
        <div className="App">
            <Navbar></Navbar>
            <Slideshow></Slideshow>

            <Footers></Footers>


            {/* eslint-disable-next-line react/jsx-no-undef */}
            {/*<ProductList/>*/}
        </div>
    );
}

export default App;
