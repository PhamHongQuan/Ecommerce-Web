import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from '../component/ListProduct/ProductList';
import ProductDetail from '../component/ListProduct/ProductDetail';
import Error from '../component/Error';
import ProductListDefaultPage from '../component/ListProduct';
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
import Search from "../component/search/search";
import ForgotPassword from "../component/account/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "../component/account/ForgotPassword/ResetPassword";
import Usage from "../component/Usage/Usage";
import Warranty from "../component/ Policy/Warranty";
import Security from "../component/ Policy/Security";
import Rules from "../component/ Policy/Rules";
import Introduce from "../component/ Policy/Introduce";


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Homes />} />
            </Route>
            <Route path="/list-product" element={<ProductListDefaultPage />}>
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
            <Route path="search" element={<Search/>}/>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="warranty" element={<Warranty />} />
            <Route path="security" element={<Security/>} />
            <Route path="rules" element={<Rules/>} />
            <Route path="introduce" element={<Introduce/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:username" element={<ResetPasswordPage />} />
            <Route path="/usage" element={<Usage />} />
            <Route index element={<Error />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
