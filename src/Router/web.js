import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from '../component/ListProduct/ProductList';
import ProductDetail from '../component/ListProduct/ProductDetail';
import Error from '../component/Error';
import ProductListDefaultPage from '../component/ListProduct/index';
import Nike from '../component/ListProduct/Sidebar/Nike';
import Adidas from '../component/ListProduct/Sidebar/Adidas';
import Lacoste from '../component/ListProduct/Sidebar/Lacoste';
import Puma from '../component/ListProduct/Sidebar/Puma';
import HomeLayout from "../component/Home/HomeLayout";
import Homes from "../component/Home/Homes";
import Cart from "../component/cart/Cart";
import ProductDetails from "../component/ProductDetail/ProductDetails";
import Register  from "../component/account/Register";
import Login from "../component/account/Login";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Homes />} />
            </Route>
            <Route path="list-product" element={<ProductListDefaultPage />}>
                <Route index element={<ProductList />} />
                <Route path="nike" element={<Nike />} />
                <Route path="adidas" element={<Adidas />} />
                <Route path="lacoste" element={<Lacoste />} />
                <Route path="puma" element={<Puma />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route index element={<ProductDetail />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="productdetails" element={<ProductDetails/>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route index element={<Error />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
