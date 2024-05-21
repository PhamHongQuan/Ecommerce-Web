import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "../App";
import ProductList from "../component/ListProduct/ProductList";
import ProductDetail from "../component/ListProduct/ProductDetail";
import Error from "../component/Error";
import React from "react";
import ProductListDefaultPage from "../component/ListProduct/index";
import Nike from "../component/ListProduct/Sidebar/Nike"

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="list-product" element={<ProductListDefaultPage />}>
                    <Route index element={<ProductList />} />  {/* Đây là route mặc định */}
                    <Route path="nike" element={<Nike />} />
                </Route>
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
