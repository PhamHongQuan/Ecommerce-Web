import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "../App";
import ProductList from "../component/ListProduct/ProductList";
import ProductDetail from "../component/ListProduct/ProductDetail";
import Error from "../component/Error";
import React from "react";
import ProductListDefaultPage from "../component/ListProduct/index";
import Nike from "../component/ListProduct/Sidebar/Nike"
import Adidas from "../component/ListProduct/Sidebar/Adidas";
import Lacoste from "../component/ListProduct/Sidebar/Lacoste";
import Puma from "../component/ListProduct/Sidebar/Puma";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="list-product" element={<ProductListDefaultPage />}>
                    <Route index element={<ProductList />} />
                    <Route path="nike" element={<Nike />} />
                    <Route path="adidas" element={<Adidas />} />
                    <Route path="lacoste" element={<Lacoste />} />
                    <Route path="puma" element={<Puma />} />
                </Route>
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
